import React, { useEffect, useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Menu } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import useAuth from '@/hooks/useAuth';
import Sidebar from '@/components/dashboard/Sidebar';
import { Outlet } from 'react-router';
import Button from '@/components/Button';
import { BounceLoader } from 'react-spinners';

export default function DashboardLayout() {
  const { user, logOut } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex gap-4 items-center justify-center bg-[#0B2C3D]">
        <BounceLoader color="#FF503C" size={60}></BounceLoader>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 md:hidden z-50"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#F2F6F7] px-6 py-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0B2C3D]">
            Welcome to Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.photoURL} />
              <AvatarFallback>
                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              label="Logout"
              onClick={async () => await logOut()}
              className="rounded-none px-4 py-2"
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
