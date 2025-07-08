import { Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import React from 'react';

const TopNavbar = () => {
  return (
    <div>
      <div className="bg-[#0B2C3D] text-white p-2 flex flex-col lg:flex-row gap-4 lg:justify-between items-center">
        <div className="flex gap-4 items-center ml-8">
          <div className="flex gap-2 items-center text-sm lg:text-lg">
            <Mail color="#FF503C" size={18} />
            info@amarnibas.com
          </div>
          <div className="flex gap-2 items-center text-sm lg:text-lg">
            <MapPin color="#FF503C" size={18} />
            Dhaka, Bangladesh
          </div>
        </div>
        <div className="flex gap-4 items-center mr-8">
          <FaFacebookF />
          <FaXTwitter />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
