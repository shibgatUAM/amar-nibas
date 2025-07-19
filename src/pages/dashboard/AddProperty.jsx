import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosSecure from '@/hooks/axiosSecure';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddProperty = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const imageFile = data.picture[0];
      const photoURL = await imageUpload(imageFile);

      const propertyData = {
        title: data.title,
        location: data.location,
        photoURL,
        priceMin: parseFloat(data.priceMin),
        priceMax: parseFloat(data.priceMax),
        agentName: user.displayName,
        agentEmail: user.email,
      };

      const res = await axiosSecure.post('/properties', propertyData);

      if (res.data.insertedId) {
        toast.success('Property added successfully!');
        reset();
      } else {
        toast.error('Failed to add property');
      }
    } catch (error) {
      error;
      toast.error('Failed to add property');
    }
  };

  const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        formData
      );

      return response.data.data.url;
    } catch (error) {
      error;
      throw new Error('Image Upload failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>
      <Card>
        <CardContent className="space-y-4 py-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                type="text"
                {...register('title', {
                  required: true,
                  maxLength: 50,
                  minLength: 3,
                })}
                placeholder="Enter property title"
              />
              {errors.title?.type === 'required' && (
                <p className="text-red-500 text-sm">
                  Property title is required
                </p>
              )}
              {errors.title?.type === 'maxLength' && (
                <p className="text-red-500 text-sm">
                  Property title must be less than 50 characters
                </p>
              )}
              {errors.title?.type === 'minLength' && (
                <p className="text-red-500 text-sm">
                  Property title must be at least 3 characters
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Property Location</Label>
              <Input
                id="location"
                type="text"
                {...register('location', {
                  required: true,
                  maxLength: 100,
                  minLength: 3,
                })}
                placeholder="Enter property Location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  Property location is required
                </p>
              )}
              {errors.location?.type === 'maxLength' && (
                <p className="text-red-500 text-sm">
                  Property location must be less than 100 characters
                </p>
              )}
              {errors.location?.type === 'minLength' && (
                <p className="text-red-500 text-sm">
                  Property location must be at least 3 characters
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                {...register('picture', { required: true })}
              />
              {errors.picture && (
                <p className="text-red-500 text-sm">Image is required</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceMin">Price Minimum</Label>
                <Input
                  id="priceMin"
                  type="number"
                  step="any"
                  {...register('priceMin', {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Enter price minimum"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">
                    Price minimum is required
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceMax">Price Maximum</Label>
                <Input
                  id="priceMax"
                  type="number"
                  step="any"
                  {...register('priceMax', {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Enter price maximum"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">
                    Price maximum is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Agent Name</Label>
                <Input value={user.displayName} readOnly disabled />
              </div>

              <div className="space-y-2">
                <Label>Agent Email</Label>
                <Input value={user.email} readOnly disabled />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-none">
              Add Property
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProperty;
