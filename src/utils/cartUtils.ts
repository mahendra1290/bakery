import isEqual from 'lodash/isEqual';
import { CartItem, CartProduct } from '../context/CartProvider';
import { Product } from '../data';
import { Option } from '../components/OptionGroup';

const generateItemId = () => {
  return `${Date.now()}`;
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
    id: generateItemId(),
    product,
    quantity,
    selectedOptions,
    totalPrice: 0,
  };
  newCartItem.totalPrice = getCartItemTotalPrice(newCartItem);
  return newCartItem;
};

const addItemToCart = (cartItems: CartItem[], cartItemToAdd: CartProduct): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem: CartItem) =>
      cartItem.product.id === cartItemToAdd.product.id &&
      isEqual(cartItem.selectedOptions, cartItemToAdd.selectedOptions),
  );

  if (existingCartItem) {
    const itemCopy = { ...existingCartItem };
    itemCopy.quantity += cartItemToAdd.quantity;
    itemCopy.totalPrice = getCartItemTotalPrice(itemCopy);
    return cartItems.map((cartItem: CartItem) =>
      cartItem.id === existingCartItem.id ? itemCopy : cartItem,
    );
  } else {
    return [
      ...cartItems,
      createCartItem(cartItemToAdd.product, cartItemToAdd.quantity, cartItemToAdd.selectedOptions),
    ];
  }
};

const removeItemFromCart = (cartItems: CartItem[], id: string): CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === id);
  if (existingCartItem) {
    const itemCopy = { ...existingCartItem };
    if (itemCopy.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== id);
    }
    itemCopy.quantity -= 1;
    itemCopy.totalPrice = getCartItemTotalPrice(itemCopy);
    return cartItems.map((cartItem: CartItem) => (cartItem.id === id ? itemCopy : cartItem));
  }
  return cartItems;
};

const getCartTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0);
};

const getCartItems = (cartItems: CartItem[], productId: number): CartItem[] => {
  return cartItems.filter((cartItem: CartItem) => cartItem.product.id === productId);
};

const getTotalQuantity = (cartItems: CartItem[], productId: number) => {
  let quantity = 0;
  cartItems.forEach((item) => {
    if (item.product.id === productId) {
      quantity += item.quantity;
    }
  });
  return quantity;
};

export { addItemToCart, removeItemFromCart, getCartTotalPrice, getCartItems, getTotalQuantity };
