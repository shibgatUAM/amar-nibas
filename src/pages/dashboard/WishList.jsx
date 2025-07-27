import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axiosSecure from '@/hooks/axiosSecure';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const WishList = () => {
  const { user } = useAuth();
  const email = user?.email;

  const {
    data: wishlist = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wishlist', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    toast.error('Failed to load wishlist.');
    return (
      <p className="text-red-500 text-center mt-6">Error loading wishlist.</p>
    );
  }

  if (!wishlist.length) {
    return (
      <p className="text-center mt-10 text-gray-500">Your wishlist is empty.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <Card key={item._id} className="rounded-none shadow-md">
          <img
            src={item.photoURL}
            alt={item.title}
            className="h-48 w-full -mt-6 object-cover"
          />
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-gray-600">{item.location}</p>
            <div className="flex gap-2 text-sm">
              <Badge variant="outline">
                Min: ৳{item.priceMin.toLocaleString()}
              </Badge>
              <Badge variant="outline">
                Max: ৳{item.priceMax.toLocaleString()}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Agent: {item.agentName}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WishList;
