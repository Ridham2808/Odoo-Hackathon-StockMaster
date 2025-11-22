import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@lib/auth-context';
import { api } from '@lib/api';
import { Settings, Key, Bell, Shield, Warehouse, Plus, Edit2, Trash2 } from 'lucide-react';

const SettingsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) return null;

  const tabs = [
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  useEffect(() => {
    if (activeTab === 'warehouse' && isAuthenticated) {
      fetchLocations();
    }
  }, [activeTab, isAuthenticated]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/locations');
      let locationsList = [];
      if (response?.ok && Array.isArray(response?.data)) {
        locationsList = response.data;
      } else if (Array.isArray(response)) {
        locationsList = response;
      } else if (response?.data && Array.isArray(response.data)) {
        locationsList = response.data;
      }
      setLocations(locationsList);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-600 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card-lg p-6">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-neutral-900">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                    <input type="text" defaultValue={user?.name} className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input type="email" defaultValue={user?.email} className="input" disabled />
                  </div>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-neutral-900">Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Current Password</label>
                    <input type="password" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">New Password</label>
                    <input type="password" className="input" />
                  </div>
                  <button className="btn btn-primary">Update Password</button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-neutral-900">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-neutral-700">Email notifications for low stock alerts</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-neutral-700">Email notifications for pending approvals</span>
                  </label>
                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            )}

            {activeTab === 'warehouse' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">Warehouse Management</h2>
                  <Link href="/locations/new" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} /> New Warehouse
                  </Link>
                </div>
                {loading ? (
                  <div className="text-center py-8 text-neutral-600">Loading warehouses...</div>
                ) : locations.length === 0 ? (
                  <div className="text-center py-8 text-neutral-600">
                    No warehouses found. Create your first warehouse to get started.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {locations.map((location) => (
                      <div key={location.id} className="card p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-neutral-900">{location.name}</h3>
                          <p className="text-sm text-neutral-600">{location.code}</p>
                          <p className="text-sm text-neutral-500">{location.address || location.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/locations/${location.id}`}
                            className="p-2 hover:bg-primary/10 rounded-lg text-primary"
                          >
                            <Edit2 size={18} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-neutral-900">API Keys</h2>
                <p className="text-neutral-600">Manage API keys for integrations</p>
                <button className="btn btn-primary">Generate New Key</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
