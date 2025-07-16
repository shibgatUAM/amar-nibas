import React, { useState } from 'react';
import {
  HomeIcon,
  User,
  ChevronLeft,
  ChevronRight,
  HousePlus,
  LayoutGrid,
  HandCoins,
  Settings,
  UserRoundCog,
  ScanEye,
  Heart,
  CalendarDays,
} from 'lucide-react';
import { MdSell } from 'react-icons/md';

import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router';
import Logo from '../../assets/images/logo.png';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { label: 'Add Property', to: '/dashboard/add-property', icon: HousePlus },
  {
    label: 'My Added Properties',
    to: '/dashboard/my-added-properties',
    icon: LayoutGrid,
  },
  {
    label: 'My Sold Properties',
    to: '/dashboard/my-sold-properties',
    icon: MdSell,
  },
  {
    label: 'Offered Properties',
    to: '/dashboard/offered-properties',
    icon: HandCoins,
  },
  {
    label: 'Manage Properties',
    to: '/dashboard/manage-properties',
    icon: Settings,
  },
  {
    label: 'Manage Users',
    to: '/dashboard/manage-users',
    icon: UserRoundCog,
  },
  {
    label: 'Manage Reviews',
    to: '/dashboard/manage-reviews',
    icon: ScanEye,
  },
  {
    label: 'Wishlist',
    to: '/dashboard/wishlist',
    icon: Heart,
  },
  {
    label: 'Bookings Property',
    to: '/dashboard/bookings-property',
    icon: CalendarDays,
  },
  {
    label: 'My Reviews',
    to: '/dashboard/my-reviews',
    icon: ScanEye,
  },
  { label: 'My Profile', to: '/dashboard/my-profile', icon: User },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col bg-[#F2F6F7] border-r min-h-screen transition-all duration-300',
        collapsed ? 'w-26' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between px-4 py-6">
        <Link
          to="/"
          className={`flex items-center ${
            collapsed ? 'justify-center' : 'gap-2'
          } transition-all duration-300`}
        >
          <img
            src={Logo}
            alt="amarNibas"
            className={`transition-all duration-300 ${
              collapsed ? 'w-10 h-10 mx-auto' : 'w-10 h-10'
            }`}
          />
          {!collapsed && (
            <span
              className={`text-2xl font-bold text-[#0B2C3D] transition-all duration-300 ${
                collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 ml-2'
              }`}
            >
              amarNibas
            </span>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition text-sm',
                isActive
                  ? 'bg-gray-200 text-[#FF503C] font-semibold'
                  : 'text-[#0B2C3D] hover:bg-gray-100',
                collapsed && 'justify-center'
              )}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
