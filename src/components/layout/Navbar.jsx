import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../assets/images/logo.png';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

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
  {
    name: 'Login',
    path: '/login',
  },
];

const Navbar = () => {
  return (
    <header className="bg-[#FFFFFF] text-[#0B2C3D] border-b">
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
                `text-base font-bold px-2 py-1 rounded transition ${
                  isActive
                    ? 'bg-[#FF503C] text-[#111111] font-extrabold text-lg px-6'
                    : 'hover:text-[#FF503C]/80'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
