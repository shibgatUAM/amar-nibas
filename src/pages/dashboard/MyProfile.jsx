import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import axiosSecure from '@/hooks/axiosSecure';
import useAuth from '@/hooks/useAuth';

const MyProfile = () => {
  const { user, loading, setUser } = useAuth();
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      // console.log('User inside useEffect:', user);
      reset({
        name: user?.displayName || '',
        email: user?.email || '',
        role: user?.role || 'user',
      });
      setFilePreview(user?.photoURL || '');
    }
  }, [user, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewURL = URL.createObjectURL(file);
      setFilePreview(previewURL);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);

    if (user?.role === 'admin') {
      formData.append('email', data.email);
      formData.append('role', data.role);
    }

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.modifiedCount > 0) {
        toast.success('Profile updated successfully');
        setDialogOpen(false);

        if (res.data.updatedUser) {
          const updated = res.data.updatedUser;

          setUser((prev) => {
            const updatedUser = {
              ...prev,
              displayName: updated.name || prev.displayName,
              photoURL: updated.photoURL || prev.photoURL,
              role: updated.role || prev.role,
            };

            reset({
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
            });

            setFilePreview(updatedUser.photoURL);

            return updatedUser;
          });
        }
      } else {
        toast.error('No changes made');
      }
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
      </div>
    );
  }

  return (
    <Card className="max-w-xl mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle className="text-2xl">My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div>
              <Label>Full Name</Label>
              <Input {...register('name', { required: true })} />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                {...register('email')}
                readOnly={user.role !== 'admin'}
                className={
                  user.role !== 'admin' ? 'bg-gray-100 cursor-not-allowed' : ''
                }
              />
            </div>

            <div>
              <Label>Role</Label>
              <Input
                {...register('role')}
                readOnly={user.role !== 'admin'}
                className={
                  user.role !== 'admin' ? 'bg-gray-100 cursor-not-allowed' : ''
                }
              />
            </div>

            <div>
              <Label>Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {filePreview && (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="mt-3 w-24 h-24 rounded-full"
                />
              )}
            </div>
          </div>
        </form>

        {/* Modal Confirmation */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full" onClick={() => setDialogOpen(true)}>
              Save Changes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Update</DialogTitle>
              <DialogDescription>
                Are you sure you want to update your profile?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MyProfile;
