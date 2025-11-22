import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth-context';
import DataTable from '@components/DataTable';
import { Plus, Filter } from 'lucide-react';

const Counts = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [counts, setCounts] = useState([
    {
      id: 1,
      refNo: 'CNT-001',
      location: 'Warehouse A',
      date: '2024-01-15',
      items: 150,
      status: 'done',
    },
    {
      id: 2,
      refNo: 'CNT-002',
      location: 'Warehouse B',
      date: '2024-01-14',
      items: 200,
      status: 'ready',
    },
  ]);

  const columns = [
    { key: 'refNo', label: 'Reference', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'items', label: 'Items Counted' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`badge badge-${status === 'done' ? 'secondary' : 'warning'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Cycle Counts</h1>
          <p className="text-neutral-600 mt-1">Manage inventory counting</p>
        </div>
        <Link href="/counts/new" className="btn btn-primary">
          <Plus size={20} />
          New Count
        </Link>
      </div>

      <div className="card p-4 flex gap-4 items-center">
        <Filter size={20} className="text-neutral-400" />
        <input type="text" placeholder="Search by reference or location..." className="input flex-1" />
        <select className="input w-40">
          <option>All Status</option>
          <option>Draft</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={counts}
        onRowClick={(row) => router.push(`/counts/${row.id}`)}
        selectable
      />
    </div>
  );
};

export default Counts;
