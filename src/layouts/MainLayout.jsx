import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import TopNavbar from '@/components/layout/TopNavbar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { BounceLoader } from 'react-spinners';

const MainLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // AOS init once
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, [location]);

  if (loading) {
    return (
      <div className="h-screen flex gap-4 items-center justify-center bg-[#0B2C3D]">
        <BounceLoader color="#FF503C" size={60}></BounceLoader>
      </div>
    );
  }

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
