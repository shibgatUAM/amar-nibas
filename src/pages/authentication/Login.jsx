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
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F6F7] px-4">
      <Card className="w-full max-w-md shadow-md rounded-none">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-[#0B2C3D]">
            Login to amarNibas
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
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
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer rounded-none bg-[#FF503C] text-[#0B2C3D] font-bold text-lg hover:bg-[#0B2C3D] hover:text-white"
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer rounded-none"
          >
            <FcGoogle /> Login with Google
          </Button>
          <p className="text-muted-foreground mt-2">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#FF503C] hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
