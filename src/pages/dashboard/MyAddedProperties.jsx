import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axiosSecure from '@/hooks/axiosSecure';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PropertyCard from './PropertyCard/PropertyCard';
import toast from 'react-hot-toast';

const MyAddedProperties = () => {
  const { user } = useAuth();

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['properties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this property?'
    );
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/properties/${id}`);
      toast.success('Property deleted successfully');
      refetch();
    } catch (error) {
      error;
      toast.error('Failed to delete');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[#FF503C]"></div>
      </div>
    );

  if (properties.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-2xl font-bold text-center text-[#0B2C3D]">
          No properties found
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MyAddedProperties;
