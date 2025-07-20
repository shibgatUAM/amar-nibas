import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import Marquee from 'react-fast-marquee';
import { Card, CardContent } from '../ui/card';

const fetchReviews = async () => {
  const res = await axios.get('http://localhost:3000/reviews');
  return res.data;
};

const UserReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
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
    <div className="py-12 px-4 max-w-7xl mx-auto mb-10">
      <h2 className="text-4xl font-extrabold text-center text-[#0B2C3D] mb-2">
        What Our Users Say About Us
      </h2>
      <p className="text-center text-gray-600 mb-8">
        See what our users have to say about us
      </p>

      <Marquee pauseOnHover speed={40} gradient={false}>
        {reviews.map((review, index) => (
          <div key={index} className="px-3">
            <Card
              className="min-w-24 bg-[#F2F6F7] shadow hover:shadow-xl rounded-none transition-all duration-300"
              data-aos="zoom-in"
            >
              <CardContent className="text-center space-y-4">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-20 h-20 rounded-full mx-auto object-cover shadow"
                />
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.description}
                </p>
                <div className="mt-4">
                  <h4 className="font-bold text-[#0B2C3D] text-base">
                    {review.reviewerName}
                  </h4>
                  <p className="text-sm text-gray-500 italic">
                    {review.propertyTitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default UserReviews;
