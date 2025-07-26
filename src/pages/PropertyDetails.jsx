import React, { useEffect, useState } from 'react';
import axiosSecure from '@/hooks/axiosSecure';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const PropertyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputPrice, setInputPrice] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        setError('Failed to load property details.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBuyNow = async () => {
    const min = parseFloat(property.priceMin);
    const max = parseFloat(property.priceMax);
    const price = parseFloat(inputPrice);

    if (isNaN(price)) {
      setError('Invalid price for this property.');
      return;
    }

    if (price < min || price > max) {
      setError(`Price must be between ৳ ${min} and ৳ ${max}.`);
      return;
    }

    if (price > 999999.99) {
      setError(
        'Price exceeds Stripe limit of ৳999,999.99. Please contact support for high-value purchases.'
      );
      return;
    }

    try {
      const res = await axiosSecure.post(`/create-checkout-session`, {
        propertyId: property._id,
        propertyName: property.title,
        price,
        buyerEmail: user?.email,
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      setError('Failed to initiate purchase. Please try again later.');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[#FF503C]"></div>
      </div>
    );

  if (error)
    return (
      <Alert variant="destructive">
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-lg mb-10">
      <CardContent className="space-y-4 p-6">
        <img
          src={property.photoURL || 'https://via.placeholder.com/600x300'}
          alt={property.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <h2 className="text-2xl font-bold">{property.title}</h2>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-600 text-lg font-medium">
          ৳ {property.priceMin} - ৳ {property.priceMax}
        </p>
        <p className="text-gray-700">Agent: {property.agentName}</p>
        <p className="text-sm text-gray-500">
          Status:{' '}
          {property.verification ? (
            <span className="text-green-600">Verified</span>
          ) : (
            <span className="text-yellow-600">Pending</span>
          )}
        </p>

        <Button
          className="bg-[#FF503C] hover:bg-[#e54832] text-white cursor-pointer rounded-none"
          onClick={() => {
            setInputPrice('');
            setError('');
            setModalOpen(true);
          }}
        >
          Buy Now
        </Button>
      </CardContent>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Your Offer Price</DialogTitle>
          </DialogHeader>

          <Input
            type="number"
            placeholder={`Enter a price between ৳${property.priceMin} and ৳${property.priceMax}`}
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.value)}
          />

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          <DialogFooter>
            <Button
              className="bg-[#FF503C] hover:bg-[#e54832] text-white"
              onClick={handleBuyNow}
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PropertyDetails;
