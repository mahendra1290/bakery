import { Link } from 'react-router-dom';

const ContactUsRoute = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam</p>
      <div>
        <Link to={'/'} className='btn-outline'>
          Home
        </Link>
      </div>
    </div>
  );
};

export default ContactUsRoute;
