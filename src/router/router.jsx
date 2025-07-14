import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '@/pages/Home';
import { Component } from 'react';
import AllProperties from '@/pages/AllProperties';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import Login from '@/pages/authentication/Login';
import Register from '@/pages/authentication/Register';
import PrivateRoute from '@/routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'all-properties',
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
]);

export default router;
