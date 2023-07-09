import { CartItem } from '../context/CartProvider';
import useCart from '../hooks/useCart';
import { AddRemoveButton } from './AddButton';
import { Option } from './OptionGroup';
import Price from './Price';

interface CartItemProps {
  item: CartItem;
}

const renderOptions = (options: Record<string, Option[]>) => {
  return Object.entries(options).map(([name, options]) => {
    return (
      <div className='text-xs' key={name}>
        {options.map((option) => option.name).join(', ')}
      </div>
    );
  });
};

const CartItemCard = ({ item }: CartItemProps) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className='flex gap-4 items-center justify-between border rounded-md p-2'>
      <div className='flex gap-2'>
        <img className='max-h-20 aspect-square object-cover' src={item.product.image} alt='img' />
        <div>
          <p className='text-sm'>{item.product.name}</p>
          <Price>{(item.totalPrice || 0) / item.quantity}</Price>
          {item.selectedOptions && renderOptions(item.selectedOptions)}
        </div>
      </div>
      <div>
        <AddRemoveButton
          quantity={item.quantity}
          onAdd={() => addToCart(item.product, 1, item.selectedOptions)}
          onRemove={() => removeFromCart(item.itemId)}
        />
        <Price className='text-right mt-1'>{item.totalPrice}</Price>
      </div>
    </div>
  );
};

export default CartItemCard;
