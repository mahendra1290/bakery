import { Link } from 'react-router-dom';

const AboutUsRoute = () => {
  return (
    <div className='h-full p-4 text-center space-y-10'>
      <h1>About Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam</p>
      <div>
        <Link to={'/'} className='btn-outline'>
          Home
        </Link>
      </div>
    </div>
  );
};

export default AboutUsRoute;
