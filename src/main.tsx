import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import LoginPage from './pages/LoginPage.tsx';
import { AuthContext, AuthProvider } from './context/AuthContext.tsx';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  if (!authenticated.isAuthenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <App />
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
