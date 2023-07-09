const Footer = () => {
  return (
    <footer className='p-4 border-t-2 border-slate-300 bg-slate-100 text-center'>
      <p className='text-sm'>
        Made with{' '}
        <span role='img' aria-label='heart'>
          ❤️
        </span>{' '}
        by{' '}
        <a
          className='text-blue-500 hover:underline'
          href=''
          target='_blank'
          rel='noopener noreferrer'
        >
          @mahendra
        </a>
      </p>
    </footer>
  );
};

export default Footer;
