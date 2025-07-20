import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axiosSecure from '@/hooks/axiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const UpdatePropertyModal = ({ property, onClose, refetch }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: property.title,
      location: property.location,
      minPrice: property.minPrice,
      maxPrice: property.maxPrice,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updated) => {
      return await axiosSecure.patch(`/properties/${property._id}`, updated);
    },
    onSuccess: () => {
      toast.success('Property updated');
      refetch();
      onClose();
    },
    onError: () => {
      toast.error('Failed to update');
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <Dialog.Title className="text-xl font-semibold mb-4">
          Update Property
        </Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              {...register('title')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input
              {...register('location')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Minimum Price</label>
            <input
              type="number"
              {...register('minPrice')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Maximum Price</label>
            <input
              type="number"
              {...register('maxPrice')}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default UpdatePropertyModal;
