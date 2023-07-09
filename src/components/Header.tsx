import clsx from 'clsx';
import { SVGProps, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className='w-6 h-6 inline-block sm:hidden'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 6h16M4 12h16M4 18h16'
    />
  </svg>
);

const CrossIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6 cursor-pointer'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
  </svg>
);

const Header = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <header className='flex gap-2 justify-between flex-wrap items-center mb-4 p-2 md:p-4 border-2 bg-slate-100 border-slate-300 sticky top-0 w-full z-10'>
        <div className='flex items-center gap-4'>
          <div className='text-2xl md:text-3xl font-bold whitespace-nowrap flex items-center gap-2'>
            <HamburgerIcon onClick={() => setOpen(true)} /> <Link to={'/'}>Bakery</Link>
          </div>
          {location.pathname === '/' && (
            <input
              className='ml-4  border-2 border-slate-300 rounded-md p-2 px-4'
              placeholder='Search'
              type='search'
              name='q'
              value={searchParams.get('q') || ''}
              onChange={(e) => setSearchParams({ q: e.target.value })}
            />
          )}
        </div>
        <div className='hidden sm:flex items-center gap-2 text-sm sm:text-base'>
          <Link to={'/about-us'} className='btn-outline'>
            About Us
          </Link>
          <Link to={'/contact-us'} className='btn-outline'>
            Contact Us
          </Link>
          <Link to={'/cart'} className='btn-outline'>
            Cart
          </Link>
        </div>
      </header>
      <div
        className={clsx(
          'fixed inset-0 z-30 bg-black transition-colors duration-200 ease-in-out',
          open ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none',
        )}
      />
      <div
        className={clsx(
          'z-40 w-64 space-y-4 transition-transform duration-200 ease-in-out bg-white shadow-lg p-4 fixed top-0 bottom-0 left-0 flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        onClick={() => setOpen(false)}
      >
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold'>Bakery</p>
          <CrossIcon onClick={() => setOpen(false)} />
        </div>
        <hr />
        <Link to='/about-us' className='text-red-500'>
          About Us
        </Link>
        <Link to='/contact-us' className='text-red-500'>
          Contact Us
        </Link>
        <Link className='text-red-500' to='/cart'>
          Cart
        </Link>
      </div>
    </>
  );
};

export default Header;
