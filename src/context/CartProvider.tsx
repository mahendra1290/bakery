/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useCallback, useState } from 'react';
import { Product } from '../data';
import { Option } from '../components/OptionGroup';

export interface CartItem {
  itemId: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, Option[]>;
  totalPrice: number;
}

interface CartContext {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedOptions?: Record<string, Option[]>,
  ) => void;
  removeFromCart: (itemId: string) => void;
  getCartTotal: () => number;
  getCartItem: (productId: number) => CartItem[] | undefined;
  getTotalQuantity: (productId: number) => number;
}

export const CartContext = createContext<CartContext>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getCartTotal: () => 0,
  getCartItem: () => undefined,
  getTotalQuantity: () => 0,
});

const generateItemId = (product: Product) => {
  return `${product.id}-${Date.now()}`;
};

const getCartItemTotalPrice = (item: CartItem) => {
  return (
    (item.product.price +
      Object.values(item.selectedOptions ?? {}).reduce((acc, options) => {
        return acc + options.reduce((accInt, option) => accInt + option.price, 0);
      }, 0)) *
    item.quantity
  );
};

const createCartItem = (
  product: Product,
  quantity: number,
  selectedOptions?: Record<string, Option[]>,
) => {
  const newCartItem: CartItem = {
    itemId: generateItemId(product),
    product,
    quantity,
    selectedOptions,
    totalPrice: 0,
  };
  newCartItem.totalPrice = getCartItemTotalPrice(newCartItem);
  return newCartItem;
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedOptions?: Record<string, Option[]>) => {
      const item = items.find(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions),
      );

      if (item) {
        const newCartItem = {
          ...item,
          quantity: item.quantity + quantity,
        };
        newCartItem.totalPrice = getCartItemTotalPrice(newCartItem);
        setItems((prevItems) =>
          prevItems.map((item) => (item.itemId === newCartItem.itemId ? newCartItem : item)),
        );
      } else {
        const newCartItem = createCartItem(product, quantity, selectedOptions);
        setItems((prevItems) => [...prevItems, newCartItem]);
      }
    },
    [items],
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      const item = items.find((item) => item.itemId === itemId);
      if (item) {
        if (item.quantity === 1) {
          setItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
        } else {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item,
            ),
          );
        }
      }
    },
    [items],
  );

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
  }, [items]);

  const getCartItem = useCallback(
    (productId: number) => {
      return items.filter((item) => item.product.id === productId);
    },
    [items],
  );

  const getTotalQuantity = useCallback(
    (productId: number) => {
      let quantity = 0;
      items.forEach((item) => {
        if (item.product.id === productId) {
          quantity += item.quantity;
        }
      });
      return quantity;
    },
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, getTotalQuantity, removeFromCart, getCartTotal, getCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
