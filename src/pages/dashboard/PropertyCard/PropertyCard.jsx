import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axiosSecure from '@/hooks/axiosSecure';

const PropertyCard = ({ property, onDelete, refetch }) => {
  const {
    _id,
    title,
    location,
    photoURL,
    priceMin,
    priceMax,
    agentName,
    agentEmail,
    verification = 'pending',
  } = property;

  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title,
      location,
      photoURL,
      priceMin,
      priceMax,
    },
  });

  const handleUpdate = async (data) => {
    try {
      await axiosSecure.patch(`/properties/${_id}`, {
        title: data.title,
        location: data.location,
        photoURL: photoURL,
        priceMin: parseFloat(data.priceMin),
        priceMax: parseFloat(data.priceMax),
      });
      toast.success('Property updated successfully');
      refetch();
      setOpen(false);
    } catch (error) {
      error;
      toast.error('Failed to update');
    }
  };

  return (
    <Card className="p-4 space-y-3 shadow border">
      <img
        src={photoURL}
        alt={title}
        className="rounded-lg w-full h-48 object-cover"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">{location}</p>
      <p className="text-sm text-gray-600">Agent: {agentName}</p>
      <p className="text-sm text-gray-600">Email: {agentEmail}</p>
      <p className="text-sm">Min Price: ${priceMin}</p>
      <p className="text-sm">Max Price: ${priceMax}</p>
      <p className="text-sm font-medium capitalize">
        Status:{' '}
        <span
          className={`text-${
            verification === 'verified'
              ? 'green'
              : verification === 'rejected'
              ? 'red'
              : 'yellow'
          }-600`}
        >
          {verification}
        </span>
      </p>
      <div className="flex gap-2">
        {verification !== 'rejected' && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input {...register('title', { required: true })} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input {...register('location', { required: true })} />
                </div>
                <div>
                  <Label>Photo URL</Label>
                  <Input {...register('photoURL', { required: true })} />
                </div>
                <div>
                  <Label>Minimum Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register('priceMin', { required: true })}
                  />
                </div>
                <div>
                  <Label>Maximum Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register('priceMax', { required: true })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
        <Button variant="destructive" onClick={() => onDelete(property._id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default PropertyCard;
