import useAuth from '@/hooks/useAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { BounceLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex gap-4 items-center justify-center bg-[#0B2C3D]">
        <BounceLoader color="#FF503C" size={60}></BounceLoader>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location.pathname }}></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
