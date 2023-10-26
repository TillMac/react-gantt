import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx'
import './index.css'
import LoginPage from './pages/LoginPage.tsx';
import { AuthContext, AuthProvider } from './context/AuthContext.tsx';

// eslint-disable-next-line react-refresh/only-export-components
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
      <GoogleOAuthProvider clientId='331146682770-6n6ta98dsqhnq0o43jhmaa4cou9tj92d.apps.googleusercontent.com'>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>,
);
