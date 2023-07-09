import { useEffect, useState } from 'react';
import useCart from '../hooks/useCart';

import OptionsModal from './OptionsModal';
import { Option } from './OptionGroup';
import { AddButton } from './AddButton';
import { Product } from '../data';
import Modal from './Modal';
import CartItemCard from './CartItem';
import { getCartItems, getTotalQuantity } from '../utils/cartUtils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, description, price, isEggless, image, options } = product;
  const [open, setOpen] = useState(false);

  const [removeProductOpen, setRemoveProductOpen] = useState(false);

  const { addToCart, items, removeFromCart } = useCart();

  const handleAddToCart = (quantity = 1, options?: Record<string, Option[]>) => {
    setOpen(false);
    addToCart({ product, quantity, selectedOptions: options });
  };

  const handleRemoveFromCart = () => {
    const item = getCartItems(items, id);
    if (item?.length === 1) {
      removeFromCart(item[0].id);
    } else {
      setRemoveProductOpen(true);
    }
  };

  const quantity = getTotalQuantity(items, id);

  useEffect(() => {
    if (quantity === 0) {
      setRemoveProductOpen(false);
    }
  }, [quantity]);

  return (
    <>
      <div className='flex flex-row items-center md:items-stretch p-2 md:p-0 md:flex-col border shadow-md font-serif rounded-lg relative sm:hover:scale-105 transition-transform sm:hover:shadow-lg'>
        <img
          className='object-cover h-32 md:h-auto aspect-square rounded-t-lg'
          src={image}
          alt='img'
        />
        <div className='text-left md:text-center flex-1 ml-2 md:ml-0 md:pb-8 rounded-b-lg'>
          {isEggless && (
            <p className='text-sm text-gray-500 mb-2'>
              <span className='text-red-500'>Eggless</span> |{' '}
              <span className='text-gray-500'>Contains Dairy</span>
            </p>
          )}
          <h2 className='text-sm md:text-lg font-semibold mb-2'>{name}</h2>
          <p className='text-sm md:text-base mb-2'>{description}</p>
          <p className='hidden md:block text-red-500'>₹ {price.toFixed(2)}</p>
          <div className='md:absolute flex items-center justify-between bg-white bottom-0 md:translate-y-1/2 md:left-1/2 md:-translate-x-1/2'>
            <p className='text-sm text-red-500 md:hidden'>₹ {price.toFixed(2)}</p>
            <AddButton
              quantity={quantity}
              onAdd={() => {
                if (options) {
                  setOpen(true);
                } else {
                  handleAddToCart();
                }
              }}
              onRemove={handleRemoveFromCart}
            />
          </div>
        </div>
      </div>
      {options && (
        <OptionsModal
          title={name}
          basePrice={price}
          open={open}
          options={options}
          onClose={() => setOpen(false)}
          onAddToCart={(options, quantity) => handleAddToCart(quantity, options)}
        />
      )}
      <Modal
        open={removeProductOpen}
        title='Remove Product'
        onClose={() => setRemoveProductOpen(false)}
      >
        <div className='space-y-2'>
          {getCartItems(items, id)?.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
