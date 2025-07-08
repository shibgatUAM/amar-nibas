import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import TopNavbar from '@/components/layout/TopNavbar';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div>
      <TopNavbar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
