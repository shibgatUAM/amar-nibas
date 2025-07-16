import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axiosSecure from '@/hooks/axiosSecure';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {
    console.log(data, createUser);
    // createUser(data.email, data.password);

    try {
      const imageFile = data.picture[0];
      const imageUrl = await imageUpload(imageFile);

      // create user in Firebase Auth
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      // update firebase user profile
      await updateProfile(user, {
        displayName: data.fullName,
        photoURL: imageUrl,
      });

      // Save user to backend MongoDB
      await axios.post('http://localhost:3000/users', {
        name: data.fullName,
        email: data.email,
        photoURL: imageUrl,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // get token from backend
      const { data: tokenData } = await axiosSecure.post(
        'http://localhost:3000/login',
        {
          email: data.email,
        }
      );
      localStorage.setItem('access-token', tokenData.token);

      toast.success('Registration successful!');

      navigate(from, { replace: true });
    } catch (error) {
      error;
      toast.error('Registration failed!');
    }
  };

  const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        formData
      );

      return response.data.data.url;
    } catch (error) {
      error;
      throw new Error('Image Upload failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F6F7] px-4">
      <Card className="w-full max-w-md shadow-md rounded-none">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-[#0B2C3D]">
            Create An Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  name="picture"
                  type="file"
                  {...register('picture', { required: true })}
                  aria-invalid={errors.picture ? 'true' : 'false'}
                />
                {errors.picture?.type === 'required' && (
                  <p className="text-red-800 text-sm">Picture is required.</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  {...register('fullName', {
                    required: true,
                    maxLength: 30,
                    minLength: 3,
                  })}
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                />
                {errors.fullName?.type === 'required' && (
                  <p className="text-red-800 text-sm">Full Name is required.</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-red-800 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          'Must include uppercase, lowercase, and special character',
                      },
                    })}
                    placeholder="......"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-[#FF503C]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-800 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 mb-10">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    {...register('confirmPassword', {
                      required: 'Confirm password is required.',
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                    placeholder="......"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-[#FF503C]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-800 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-none bg-[#FF503C] text-[#0B2C3D] font-bold text-lg hover:bg-[#0B2C3D] hover:text-white"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <SocialLogin label="Register" />
          <p className="text-muted-foreground mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF503C] hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
