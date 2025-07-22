import axiosSecure from '@/hooks/axiosSecure';
import React, { useEffect, useState } from 'react';
import ManageProperties from './ManageProperties';
import toast from 'react-hot-toast';

const ManagePropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get('/properties')
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        err;
        setLoading(false);
      });
  }, []);

  const handleVerify = async (id) => {
    try {
      await axiosSecure.patch(`/properties/${id}/verify`);
      setProperties(
        properties.map((property) =>
          property._id === id ? { ...property, verified: true } : property
        )
      );
      toast.success('Property verified successfully');
      window.location.reload();
    } catch (error) {
      error;
      toast.error('Failed to verify property');
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/properties/${id}/reject`);
      setProperties(properties.filter((property) => property._id !== id));
      toast.success('Property rejected successfully');
      window.location.reload();
    } catch (error) {
      error;
      toast.error('Failed to reject property');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[#FF503C]"></div>
      </div>
    );

  return (
    <ManageProperties
      properties={properties}
      handleVerify={handleVerify}
      handleReject={handleReject}
    />
  );
};

export default ManagePropertiesPage;
