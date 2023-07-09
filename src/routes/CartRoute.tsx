import CartItemCard from '../components/CartItem';
import useCart from '../hooks/useCart';

const CartRoute = () => {
  const { items, getCartTotal } = useCart();

  const total = getCartTotal();

  if (!items.length) {
    return (
      <div className='p-2 min-h-screen flex flex-col justify-center items-center'>
        <p className='text-2xl'>No items in cart</p>
      </div>
    );
  }

  return (
    <div className='p-2 min-h-screen '>
      <h1 className='max-w-4xl mx-auto w-full text-2xl'>Your Cart</h1>
      <div className='flex mt-2 items-start flex-col md:flex-row gap-2 max-w-4xl w-full mx-auto'>
        <div className='flex-1 w-full space-y-2 rounded-md'>
          {items.map((item) => (
            <CartItemCard key={item.itemId} item={item} />
          ))}
        </div>
        <div className='flex-1 w-full border p-2 rounded-md'>
          <h2 className='text-xl mb-2'>Order Summary</h2>
          <hr className='my-1' />
          <div className='flex justify-between items-center'>
            <p className='text-sm'>Subtotal</p>
            <p className='text-sm'>₹{total}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>Delivery</p>
            <p className='text-sm'>₹0</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>Discount</p>
            <p className='text-sm'>₹0</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>Taxes</p>
            <p className='text-sm'>₹0</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>Total</p>
            <p className='text-sm'>₹{total}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm'>Total Savings</p>
            <p className='text-sm'>₹0</p>
          </div>
          <div className='flex justify-stretch'>
            <button className='flex-1 btn-outline mt-2'>Total Payble ₹{total}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRoute;
