import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import CartProvider from './context/CartProvider.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductRoute from './routes/ProductRoute.tsx';
import CartRoute from './routes/CartRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductRoute />,
      },
      {
        path: 'cart',
        element: <CartRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);
