import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import TopNavbar from '@/components/layout/TopNavbar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

const MainLayout = () => {
  const location = useLocation();

  // AOS init once
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, [location]);

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
