import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '@/pages/Home';
import { Component } from 'react';
import AllProperties from '@/pages/AllProperties';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import Login from '@/pages/authentication/Login';
import Register from '@/pages/authentication/Register';
import PrivateRoute from '@/routes/PrivateRoute';
import NotFound from '@/pages/NotFound';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import AddProperty from '@/pages/dashboard/AddProperty';
import ManageUsers from '@/pages/dashboard/ManageUsers';

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
        path: '*',
        Component: NotFound,
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
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: 'add-property',
        Component: AddProperty,
      },
      {
        path: 'manage-users',
        Component: ManageUsers,
      },
    ],
  },
]);

export default router;
