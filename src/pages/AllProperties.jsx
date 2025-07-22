import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axiosSecure from '@/hooks/axiosSecure';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BadgeCheckIcon, Heart, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllProperties = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [expandedId, setExpandedId] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties');
      return res.data;
    },
  });

  useEffect(() => {
    const fetchWishlistIds = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/wishlist/${user?.email}`);
          const ids = res.data.map((item) => item.propertyId);
          setWishlistIds(ids);
        } catch (error) {
          console.error('Failed to load wishlist', error);
        }
      }
    };
    fetchWishlistIds();
  }, [user?.email]);

  const handleWishlist = async (property) => {
    if (!userEmail) {
      toast.error('You must be logged in');
    }

    const wishlistData = {
      propertyId: property._id,
      title: property.title,
      photoURL: property.photoURL,
      priceMin: property.priceMin,
      priceMax: property.priceMax,
      location: property.location,
      agentName: property.agentName,
      userEmail,
    };

    try {
      const res = await axiosSecure.post('/wishlist', wishlistData);

      if (res.status === 201) {
        toast.success('Added to wishlist');
        setWishlistIds((prev) => [...prev, property._id]);
      } else if (res.status === 409) {
        toast.info('Already in wishlist');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add to wishlist');
    }
  };

  const toggleDetails = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load properties
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <Card
          key={property._id}
          className="shadow-md hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-4 space-y-4">
            <img
              src={property.photoURL || 'https://via.placeholder.com/400x200'}
              alt={property.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              {property.verification ? (
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1"
                >
                  <BadgeCheckIcon className="w-4 h-4" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="destructive">Pending</Badge>
              )}
            </div>
            <p className="text-gray-600">{property.location}</p>
            <p className="font-medium text-blue-600">
              ৳ {property.priceMin} - ৳ {property.priceMax}
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => handleWishlist(property)}
                className={`flex items-center gap-2 cursor-pointer ${
                  wishlistIds.includes(property._id)
                    ? 'bg-[#FF503C] text-white hover:bg-[#e54832]'
                    : 'bg-secondary text-black hover:bg-secondary/80'
                }`}
              >
                <Heart className="w-4 h-4" />
                {wishlistIds.includes(property._id) ? 'Wishlisted' : 'Wishlist'}
              </Button>

              <Button
                variant="outline"
                onClick={() => toggleDetails(property._id)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Info className="w-4 h-4" />{' '}
                {expandedId === property._id ? 'Hide' : 'Details'}
              </Button>
            </div>

            {expandedId === property._id && (
              <div className="bg-gray-100 mt-4 p-3 rounded-md text-sm space-y-1 text-gray-700">
                <p>
                  <strong>Description:</strong>{' '}
                  {property.description || 'No description available.'}
                </p>
                <p>
                  <strong>Agent:</strong> {property.agentName || 'N/A'}
                </p>
                <p>
                  <strong>Contact:</strong> {property.contact || 'N/A'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllProperties;
