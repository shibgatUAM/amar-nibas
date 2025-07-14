import { Button } from '@/components/ui/button';
import { Ghost } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F6F7] px-4 text-center">
      <Ghost className="w-20 h-20 text-[#FF503C] mb-4" />
      <h1 className="text-6xl font-bold text-[#FF503C] mb-4">404</h1>
      <p className="text-2xl font-semibold text-[#0B2C3D] mb-2">
        Page Not Found
      </p>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-[#FF503C] hover:bg-[#0B2C3D] text-white rounded-none cursor-pointer">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
