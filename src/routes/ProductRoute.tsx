import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data';
import Price from '../components/Price';
import useCart from '../hooks/useCart';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import throttle from 'lodash/throttle';
import { getCartTotalPrice } from '../utils/cartUtils';

const ProductRoute = () => {
  const [searchParams] = useSearchParams();
  const [hide, setHide] = useState(false);

  const search: string = searchParams.get('q') || '';

  const filteredProducts = products.filter(
    (product) =>
      search == '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()),
  );

  const { items } = useCart();

  useEffect(() => {
    let timer: number | undefined;
    const handleScroll = () => {
      setHide(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setHide(false);
      }, 300);
    };
    const throttled = throttle(handleScroll, 200, { trailing: true });
    document.addEventListener('scroll', throttled);
    return () => {
      document.removeEventListener('scroll', throttled);
    };
  }, []);

  return (
    <div>
      <div className='hidden md:flex text-center justify-center items-stretch max-w-xl mx-auto mb-10 border border-slate-300 rounded-md shadow-md z-20 bg-white divide-x-2'>
        <div className='py-6 px-4 hover:bg-blue-50'>
          <p className='text-xl'>Products</p>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='py-6 px-4 hover:bg-blue-50'>
          <p className='text-xl'>Cooking Guides</p>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='py-6 px-4 hover:bg-blue-50'>
          <p className='text-xl'>Recipes</p>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto'>
        <p className='text-xl md:text-3xl text-center mb-0 md:mb-6 uppercase'>New products</p>
      </div>
      <div className='p-4 md:px-0 max-w-7xl items-stretch mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 md:gap-y-12'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className='text-xl text-gray-400 text-center'>No products found</p>
        )}
      </div>
      {items.length > 0 && (
        <div
          className={clsx(
            'sm:hidden border h-16 border-black flex items-center justify-between p-2 shadow-md bg-white fixed transition-all duration-300 ease-in-out left-5 right-5 rounded-md',
            hide ? '-bottom-20 opacity-0' : 'bottom-10 opacity-100',
          )}
        >
          <Price className='font-bold'>{getCartTotalPrice(items)}</Price>
          <Link to={'/cart'} className='btn-outline'>
            Go to cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductRoute;
