import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ManageProperties = ({ properties, handleVerify, handleReject }) => {
  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage Properties</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Price Range (BDT)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property._id}>
              <TableCell>{property.title}</TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>{property.agentName}</TableCell>
              <TableCell>{property.agentEmail}</TableCell>
              <TableCell>
                {property.priceMin} - {property.priceMax}
              </TableCell>
              <TableCell>
                {property.verification === 'verified' && (
                  <span className="text-green-600 font-medium">Verified</span>
                )}
                {property.verification === 'rejected' && (
                  <span className="text-red-600 font-medium">Rejected</span>
                )}
                {property.verification === 'pending' && (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {property.verification === 'pending' ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleVerify(property._id)}
                    >
                      Verify
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(property._id)}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="italic text-gray-500">No Action</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProperties;
