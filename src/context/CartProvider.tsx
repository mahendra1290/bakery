/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useCallback, useState } from 'react';
import { Product } from '../data';
import { Option } from '../components/OptionGroup';
import { addItemToCart, removeItemFromCart } from '../utils/cartUtils';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, Option[]>;
  totalPrice: number;
}

export interface CartProduct {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, Option[]>;
}

interface CartContext {
  items: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (itemId: string) => void;
  getTotalQuantity: (productId: number) => number;
}

export const CartContext = createContext<CartContext>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalQuantity: () => 0,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((cartProduct: CartProduct) => {
    setItems((prevItems) => addItemToCart(prevItems, cartProduct));
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prevItems) => removeItemFromCart(prevItems, itemId));
  }, []);

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
    <CartContext.Provider value={{ items, addToCart, getTotalQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
