import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '@/pages/Home';
import { Component } from 'react';
import AllProperties from '@/pages/AllProperties';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import Login from '@/pages/authentication/Login';

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
        Component: AllProperties,
      },
      {
        path: 'dashboard',
        Component: DashboardLayout,
      },
      {
        path: 'login',
        Component: Login,
      },
    ],
  },
]);

export default router;
