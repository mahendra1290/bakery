import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex gap-2 justify-between flex-wrap items-center mb-4 p-4 border-2 bg-slate-100 border-slate-300 sticky top-0 w-full z-10'>
      <div className='flex items-center gap-4'>
        <Link to={'/'} className='text-3xl font-bold'>
          Bakery
        </Link>
        <input
          className='ml-4 border-2 border-slate-300 rounded-md p-2 px-4'
          type='text'
          placeholder='Search'
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='hidden sm:flex items-center gap-2 text-sm sm:text-base'>
        <button className='btn-outline'>About Us</button>
        <button className='btn-outline'>Contact Us</button>
        <Link to={'/cart'} className='btn-outline'>
          Cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
