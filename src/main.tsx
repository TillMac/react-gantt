import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import LoginPage from './pages/LoginPage.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import AppLayout from './layouts/AppLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProjectArea from './pages/ProjectArea.tsx';
import HeroPage from './pages/HeroPage.tsx';

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to='/login' replace />

  return <AppLayout />
}

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: ':projectId',
        element: <ProjectArea />
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <HeroPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
