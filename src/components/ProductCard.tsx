import { useState } from 'react';
import useCart from '../hooks/useCart';

import OptionsModal from './OptionsModal';
import { Option } from './OptionGroup';
import { AddButton, AddRemoveButton } from './AddButton';
import { Product } from '../data';
import Modal from './Modal';
import CartItemCard from './CartItem';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, description, price, isEggless, image, options } = product;
  const [open, setOpen] = useState(false);

  const [removeProductOpen, setRemoveProductOpen] = useState(false);

  const { addToCart, items, getTotalQuantity, getCartItem, removeFromCart } = useCart();

  const handleAddToCart = (quantity = 1, options?: Record<string, Option[]>) => {
    setOpen(false);
    addToCart(product, quantity, options);
  };

  const handleRemoveFromCart = () => {
    const item = getCartItem(id);
    if (item?.length === 1) {
      removeFromCart(item[0].itemId);
    } else {
      setRemoveProductOpen(true);
    }
  };

  const quantity = getTotalQuantity(id);

  console.log(items);

  return (
    <div className='flex flex-col border shadow-md font-serif rounded-lg mb-10 relative sm:hover:scale-105 transition-transform sm:hover:shadow-lg'>
      <img className='object-cover aspect-square rounded-t-lg' src={image} alt='img' />
      <div className='text-center flex-1 pt-4 rounded-b-lg border-t-0 px-4 pb-8 border-2'>
        {isEggless && (
          <p className='text-sm text-gray-500 mb-2'>
            <span className='text-red-500'>Eggless</span> |{' '}
            <span className='text-gray-500'>Contains Dairy</span>
          </p>
        )}
        <h2 className='text-lg font-semibold mb-2'>{name}</h2>
        <p className='mb-2'>{description}</p>
        <p className='text-red-500'>₹ {price.toFixed(2)}</p>
      </div>
      <div className='absolute bg-white bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2'>
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
          {getCartItem(id)?.map((item) => (
            <CartItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
