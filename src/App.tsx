import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className='min-h-full'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
