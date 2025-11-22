import React, { useState } from 'react';
import { useAuth } from '@lib/auth-context';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

const Reports = () => {
  const { isAuthenticated } = useAuth();
  const [selectedReport, setSelectedReport] = useState(null);

  if (!isAuthenticated) return null;

  const reports = [
    {
      id: 'stock-val',
      title: 'Stock Valuation',
      description: 'Total inventory value by location',
      icon: TrendingUp,
    },
    {
      id: 'movements',
      title: 'Movement Report',
      description: 'Stock movements over time',
      icon: BarChart3,
    },
    {
      id: 'abc',
      title: 'ABC Analysis',
      description: 'Inventory classification by value',
      icon: PieChart,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Reports</h1>
        <p className="text-neutral-600 mt-1">Generate and view inventory reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className="card-lg p-6 text-left hover:shadow-xl transition-shadow"
            >
              <Icon size={32} className="text-primary mb-4" />
              <h3 className="font-bold text-neutral-900 mb-2">{report.title}</h3>
              <p className="text-sm text-neutral-600">{report.description}</p>
            </button>
          );
        })}
      </div>

      {selectedReport && (
        <div className="card-lg p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            {reports.find((r) => r.id === selectedReport)?.title}
          </h2>
          <div className="text-neutral-600">
            <p>Report content and filters would go here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
