import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import { Card, CardContent } from '../ui/card';
import { CircleCheck, CircleX } from 'lucide-react';
import Button from '../Button';

const fetchAdvData = async () => {
  const res = await axios.get('http://localhost:3000/advertisements');
  return res.data;
};

const Advertisements = () => {
  const {
    data: ads = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['advertisements'],
    queryFn: fetchAdvData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[#FF503C]"></div>
      </div>
    );

  if (isError)
    return (
      <Alert variant="destructive">
        <AlertTitle>{error.message}</AlertTitle>
      </Alert>
    );

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-[#0B2C3D] mb-8">
        Featured Advertisements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ads.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden shadow hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-[#0B2C3D]">
                {property.location}
              </h3>
              <p className="text-base text-gray-800 mt-1">
                Min: ৳{' '}
                {property.priceMin.toLocaleString('en-BD', {
                  minimumFractionDigits: 2,
                })}
                <br />
                Max: ৳{' '}
                {property.priceMax.toLocaleString('en-BD', {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="mt-2 text-sm mb-6">
                {property.verified ? (
                  <span className="flex items-center gap-2 text-[#25d078] font-medium">
                    <CircleCheck color="#25d078" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-500 font-medium">
                    <CircleX color="#fb2c36" />
                    Unverified
                  </span>
                )}
              </p>

              <Button label="Details" className="px-8 py-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Button label="Show More" className="px-10 py-4" />
      </div>
    </section>
  );
};

export default Advertisements;
