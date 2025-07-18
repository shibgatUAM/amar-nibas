import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axiosSecure from '@/hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const roles = ['all', 'user', 'agent', 'admin'];
const PAGE_SIZE = 5;

const ManageUsers = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [page, setPage] = useState(1);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['users', selectedRole, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      let filtered = res.data;
      if (selectedRole !== 'all') {
        filtered = filtered.filter((user) => user.role === selectedRole);
      }
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return filtered.slice(start, end);
    },
  });

  const handleRoleChange = async (userId, role) => {
    try {
      await axiosSecure.patch(`/users/role/${userId}`, { role });
      toast.success(`Role updated to ${role}`);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (!confirm) return;
    try {
      await axiosSecure.delete(`/users/${userId}`);
      toast.success('User deleted');
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <div className="flex gap-4 items-center mb-4">
          <span>Filter by Role:</span>
          {roles.map((role) => (
            <Button
              key={role}
              size="sm"
              variant={selectedRole === role ? 'default' : 'outline'}
              onClick={() => {
                setSelectedRole(role);
                setPage(1);
              }}
              className="cursor-pointer"
            >
              {role}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[#FF503C]"></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-400 text-black font-bold"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {['user', 'agent', 'admin'].map((role) => (
                      <Button
                        key={role}
                        variant="outline"
                        size="sm"
                        disabled={user.role === role}
                        onClick={() => handleRoleChange(user._id, role)}
                        className="cursor-pointer"
                      >
                        {role}
                      </Button>
                    ))}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                      className="cursor-pointer"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageUsers;
