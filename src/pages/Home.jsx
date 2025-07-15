import HeroSlider from '@/components/HeroSlider';
import Advertisements from '@/components/Home/Advertisements';
import UserReviews from '@/components/Home/UserReviews';

import React from 'react';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <Advertisements />
      <UserReviews />
    </div>
  );
};

export default Home;
