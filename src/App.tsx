import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div className='min-h-full'>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
    </>
  );
}

export default App;
