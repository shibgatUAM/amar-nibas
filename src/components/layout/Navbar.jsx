import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../assets/images/logo.png';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { ChevronDown, LogOut, Menu, User } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const navItems = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'All Properties',
    path: '/all-properties',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  // {
  //   name: 'Login',
  //   path: '/login',
  // },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false);

      toast.success('Successfully logged out!');
      navigate('/login');
    } catch (error) {
      error;
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <header className="bg-[#FFFFFF] text-[#0B2C3D] border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo & website name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="amarNibas" className="h-8 w-8" />
          <span className="text-2xl font-bold">amarNibas</span>
        </Link>

        {/* Desktop view Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-base font-bold px-2 py-1 transition ${
                  isActive
                    ? 'bg-[#FF503C] text-[#111111] font-extrabold text-lg px-6'
                    : 'hover:text-[#FF503C]/80'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-base font-bold px-2 py-1 transition ${
                  isActive
                    ? 'bg-[#FF503C] text-[#111111] font-extrabold text-lg px-6'
                    : 'hover:text-[#FF503C]/80'
                }`
              }
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1"
              >
                <img
                  src={user.photoURL || ''}
                  alt="user"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="mr-2" size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile view Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#0B2C3D]">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8 px-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-base font-bold px-2 py-1 rounded transition ${
                        isActive
                          ? 'bg-[#FF503C] text-[#0B2C3D] font-extrabold text-lg'
                          : 'hover:text-[#FF503C]/80'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {!user ? (
                  <NavLink
                    to="/login"
                    className="text-base font-bold px-2 py-1 hover:text-[#FF503C]"
                  >
                    Login
                  </NavLink>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-base font-bold px-2 py-1 hover:text-[#FF503C]"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logOut}
                      className="text-left text-base font-bold px-2 py-1 hover:text-[#FF503C]"
                    >
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
