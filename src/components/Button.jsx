import React from 'react';
import { motion } from 'motion/react';

const Button = ({ label, className = '', ...props }) => {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`relative overflow-hidden text-white font-medium z-10 cursor-pointer ${className}`}
      {...props}
    >
      <span className="relative z-20">{label}</span>

      {/* Animated background */}
      <motion.span
        variants={{
          rest: { width: '0%' },
          hover: { width: '100%' },
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute top-0 left-0 h-full bg-[#0B2C3D] z-10 origin-left"
      />

      {/* Initial static background */}
      <span className="absolute top-0 left-0 w-full h-full bg-[#FF503C] z-0"></span>
    </motion.button>
  );
};

export default Button;
