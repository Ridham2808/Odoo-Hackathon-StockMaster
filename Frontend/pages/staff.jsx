import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@lib/auth-context';
import DataTable from '@components/DataTable';
import { Plus } from 'lucide-react';

const Staff = () => {
  const { isAuthenticated } = useAuth();
  const [staff, setStaff] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Warehouse Staff', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Inventory Manager', status: 'active' },
  ]);

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (status) => <span className="badge badge-secondary">{status}</span>,
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Staff</h1>
          <p className="text-neutral-600 mt-1">Manage warehouse staff</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      <DataTable columns={columns} data={staff} />
    </div>
  );
};

export default Staff;
