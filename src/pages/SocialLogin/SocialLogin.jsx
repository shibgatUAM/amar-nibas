import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      toast.success(`Welcome ${user.displayName}`);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error('Account already exists with different credential');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full cursor-pointer rounded-none"
      >
        <FcGoogle /> Register with Google
      </Button>
    </>
  );
};

export default SocialLogin;
