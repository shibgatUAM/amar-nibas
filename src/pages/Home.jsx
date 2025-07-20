import HeroSlider from '@/components/HeroSlider';
import Advertisements from '@/components/Home/Advertisements';
import UserReviews from '@/components/Home/UserReviews';

import React from 'react';
import AboutUs from '@/components/Home/AboutUs';
import ContactUs from '@/components/Home/ContactUs';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <Advertisements />
      <UserReviews />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Home;
