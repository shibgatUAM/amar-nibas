import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, UserCircle } from 'lucide-react';

const PropertyCard = ({ property, onDelete }) => {
  const { title, location, photoURL, agentName, status, priceMin, priceMax } =
    property;

  return (
    <Card className="w-full max-w-sm shadow-md rounded-xl p-4">
      <img
        src={photoURL}
        alt={title}
        className="h-48 w-full object-cover rounded-lg"
      />
      <CardContent className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-red-500" />
          {location}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <UserCircle className="h-4 w-4 text-blue-500" />
          {agentName}
        </div>
        <p className="text-sm">
          <span className="font-semibold">Status:</span>{' '}
          {status ? status : 'Pending'}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Price Range:</span> ৳
          {priceMin.toLocaleString()} - ৳ {priceMax.toLocaleString()}
        </p>
        <div className="flex justify-between gap-2 pt-4">
          {status !== 'rejected' && (
            <Button
              className="w-1/2 rounded-none cursor-pointer"
              variant="secondary"
            >
              Update
            </Button>
          )}
          <Button
            className="w-1/2 rounded-none cursor-pointer"
            variant="destructive"
            onClick={() => onDelete(property._id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
