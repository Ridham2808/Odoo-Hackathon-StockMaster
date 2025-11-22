import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '@lib/auth-context';
import { api } from '@lib/api';
import KPICard from '@components/KPICard';
import DataTable from '@components/DataTable';
import { Package, AlertCircle, Truck, TrendingUp, Clock, CheckCircle, ArrowRightLeft } from 'lucide-react';

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [kpis, setKpis] = useState(null);
  const [recentMovements, setRecentMovements] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [pendingOperations, setPendingOperations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel with proper response parsing
        const [kpisRes, movementsRes, alertsRes, operationsRes] = await Promise.all([
          api.get('/dashboard/kpis').catch(e => ({ ok: false, error: e })),
          api.get('/dashboard/recent-movements?limit=10').catch(e => ({ ok: false, error: e })),
          api.get('/dashboard/low-stock-alerts').catch(e => ({ ok: false, error: e })),
          api.get('/dashboard/pending-operations').catch(e => ({ ok: false, error: e })),
        ]);

        // Parse KPIs - api.js returns response.data, so response is already the backend response
        if (kpisRes?.ok && kpisRes?.data) {
          setKpis(kpisRes.data);
        } else if (kpisRes && !kpisRes.error && !kpisRes.ok) {
          // Direct data without wrapper
          setKpis(kpisRes);
        }

        // Parse movements
        let movementsList = [];
        if (movementsRes?.ok && Array.isArray(movementsRes?.data)) {
          movementsList = movementsRes.data;
        } else if (Array.isArray(movementsRes)) {
          movementsList = movementsRes;
        } else if (movementsRes?.data && Array.isArray(movementsRes.data)) {
          movementsList = movementsRes.data;
        }
        setRecentMovements(movementsList);

        // Parse alerts
        let alertsList = [];
        if (alertsRes?.ok && Array.isArray(alertsRes?.data)) {
          alertsList = alertsRes.data.slice(0, 5);
        } else if (Array.isArray(alertsRes)) {
          alertsList = alertsRes.slice(0, 5);
        } else if (alertsRes?.data && Array.isArray(alertsRes.data)) {
          alertsList = alertsRes.data.slice(0, 5);
        }
        setLowStockAlerts(alertsList);

        // Parse operations
        if (operationsRes?.ok && operationsRes?.data) {
          setPendingOperations(operationsRes.data);
        } else if (operationsRes && !operationsRes.error) {
          setPendingOperations(operationsRes);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError('Failed to load dashboard data. Please refresh the page.');
        // Set default values if API fails
        if (!kpis) {
          setKpis({
            totalProducts: 0,
            lowStockItems: 0,
            outOfStock: 0,
            pendingReceipts: 0,
            pendingDeliveries: 0,
            internalTransfers: 0,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
      // Refresh data every 60 seconds (increased from 30 to reduce rate limiting)
      const interval = setInterval(fetchDashboardData, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const movementColumns = [
    { key: 'refNo', label: 'Reference', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'items', label: 'Items' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image 
            src="/Logo.png" 
            alt="StockMaster Logo" 
            width={56} 
            height={56}
            className="rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">StockMaster Dashboard</h1>
            <p className="text-neutral-600 mt-1">Welcome back! Here's your inventory overview.</p>
          </div>
        </div>
        <Link href="/products/new" className="btn btn-primary">
          + New Product
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Products in Stock"
            value={(kpis.totalProducts || 0).toLocaleString()}
            icon={Package}
            color="primary"
            trend={5}
            trendLabel="vs last month"
          />
          <KPICard
            title="Low / Out of Stock"
            value={((kpis.lowStockItems || 0) + (kpis.outOfStock || 0)).toLocaleString()}
            icon={AlertCircle}
            color="danger"
            trend={-2}
            trendLabel="vs last month"
          />
          <KPICard
            title="Pending Receipts"
            value={(kpis.pendingReceipts || 0).toLocaleString()}
            icon={Truck}
            color="warning"
            trend={12}
            trendLabel="vs last month"
          />
          <KPICard
            title="Pending Deliveries"
            value={(kpis.pendingDeliveries || 0).toLocaleString()}
            icon={Truck}
            color="secondary"
            trend={8}
            trendLabel="vs last month"
          />
        </div>
      )}
      
      {/* Additional KPIs Row */}
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="Internal Transfers Scheduled"
            value={(kpis.internalTransfers || 0).toLocaleString()}
            icon={ArrowRightLeft}
            color="warning"
            trend={3}
            trendLabel="vs last month"
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Movements */}
        <div className="lg:col-span-2">
          <div className="card-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Recent Movements</h2>
              <Link href="/movements" className="text-sm text-primary hover:text-primary-dark">
                View All →
              </Link>
            </div>
            <DataTable
              columns={movementColumns}
              data={recentMovements}
              loading={loading}
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="card-lg p-6">
            <h3 className="font-bold text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/receipts/new"
                className="block p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-colors"
              >
                <p className="font-medium text-neutral-900">New Receipt</p>
                <p className="text-sm text-neutral-600">Add incoming stock</p>
              </Link>
              <Link
                href="/deliveries/new"
                className="block p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 transition-colors"
              >
                <p className="font-medium text-neutral-900">New Delivery</p>
                <p className="text-sm text-neutral-600">Create outgoing order</p>
              </Link>
              <Link
                href="/transfers/new"
                className="block p-4 rounded-lg bg-gradient-to-br from-warning/10 to-warning/5 hover:from-warning/20 hover:to-warning/10 transition-colors"
              >
                <p className="font-medium text-neutral-900">New Transfer</p>
                <p className="text-sm text-neutral-600">Move between locations</p>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="card-lg p-6">
            <h3 className="font-bold text-neutral-900 mb-4">Inventory Health</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">Stock Accuracy</span>
                  <span className="font-medium text-neutral-900">98%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">Fulfillment Rate</span>
                  <span className="font-medium text-neutral-900">95%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
