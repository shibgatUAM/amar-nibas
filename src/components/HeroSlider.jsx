import React from 'react';
import SlideImage from '../assets/images/slide.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'motion/react';
import Button from './Button';

const slides = [
  {
    title: 'Find Your Dream Home',
    description: 'Explore premium listings in your city and beyond.',
    image: SlideImage,
  },
  {
    title: 'Live Where You Love',
    description: 'Browse hundreds of handpicked properties.',
    image: SlideImage,
  },
  {
    title: 'Start a New Chapter',
    description: 'Your perfect home is just a click away.',
    image: SlideImage,
  },
];

const HeroSlider = () => {
  return (
    <div className="bg-[#F2F6F7]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 text-center md:text-left space-y-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#0B2C3D]">
                  {slide.title}
                </h2>
                <p className="text-lg text-gray-700">{slide.description}</p>
                <Button label="Explore Now" />
              </motion.div>
              <div
                className="mt-10 md:mt-0 md:w-1/2"
                data-aos="fade-in"
                data-aos-delay="200"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
