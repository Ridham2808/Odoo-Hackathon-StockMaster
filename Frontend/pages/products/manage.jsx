import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth-context';
import { api } from '@lib/api';
import DataTable from '@components/DataTable';
import { Plus, Edit2, Trash2, Search, Filter, RefreshCw } from 'lucide-react';

const ProductsManagement = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching products...');
        const response = await api.get('/products');
        console.log('Products API response:', JSON.stringify(response, null, 2));
        
        // Backend returns { ok: true, data: [...], meta: {...} }
        // api.js interceptor returns response.data, so response is the backend response object
        let productsList = [];
        
        // Check if response indicates an error
        if (response && response.ok === false) {
          throw new Error(response.error?.message || 'Failed to fetch products');
        }
        
        if (response && response.ok && Array.isArray(response.data)) {
          // Standard backend response format
          productsList = response.data;
          setMeta(response.meta || null);
          console.log(`Loaded ${productsList.length} products from backend. Total: ${response.meta?.total || 0}`);
        } else if (Array.isArray(response)) {
          // Direct array response (fallback)
          productsList = response;
          console.log(`Loaded ${productsList.length} products (direct array)`);
        } else if (response && response.data && Array.isArray(response.data)) {
          // Nested data (fallback)
          productsList = response.data;
          console.log(`Loaded ${productsList.length} products (nested data)`);
        } else {
          console.warn('Unexpected response format:', response);
          productsList = [];
        }
        
        console.log('Final products list:', productsList);
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        console.error('Error details:', error);
        
        // Handle different error formats
        let errorMessage = 'Failed to load products. Please try again.';
        if (error?.payload?.error?.message) {
          errorMessage = error.payload.error.message;
        } else if (error?.payload?.message) {
          errorMessage = error.payload.message;
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (error?.response?.data?.error?.message) {
          errorMessage = error.response.data.error.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Handle search
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p.id !== productId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete product:', error);
      setError('Failed to delete product');
    }
  };

  const columns = [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'minStockLevel', label: 'Min Stock', sortable: true },
    { key: 'reorderPoint', label: 'Reorder Point', sortable: true },
    { key: 'unitPrice', label: 'Unit Price', sortable: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Products</h1>
          <p className="text-neutral-600 mt-1">Manage your inventory products</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setLoading(true);
              const fetchProducts = async () => {
                try {
                  setError(null);
                  console.log('Refreshing products...');
                  const response = await api.get('/products');
                  console.log('Products API response:', JSON.stringify(response, null, 2));
                  
                  let productsList = [];
                  if (response && response.ok && Array.isArray(response.data)) {
                    productsList = response.data;
                    console.log(`Loaded ${productsList.length} products from backend`);
                  } else if (Array.isArray(response)) {
                    productsList = response;
                  } else if (response && response.data && Array.isArray(response.data)) {
                    productsList = response.data;
                  }
                  
                  setProducts(productsList);
                  setFilteredProducts(productsList);
                } catch (error) {
                  console.error('Failed to refresh products:', error);
                } finally {
                  setLoading(false);
                }
              };
              fetchProducts();
            }}
            disabled={loading}
            className="btn btn-outline flex items-center gap-2"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <Link href="/products/new" className="btn btn-primary flex items-center gap-2">
            <Plus size={20} /> New Product
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card-lg p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="card-lg p-6">
        {error && (
          <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg mb-4 text-danger text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {!loading && !error && products.length === 0 && (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg mb-4 text-warning text-sm">
            <strong>Info:</strong> No products found in the database. 
            {meta && meta.total === 0 && ' The database appears to be empty. '}
            {meta && meta.total > 0 && ` Found ${meta.total} products but they may be filtered out. `}
            Create your first product to get started, or check backend logs for details.
          </div>
        )}
        
        {!loading && !error && products.length > 0 && meta && (
          <div className="mb-4 text-sm text-neutral-600">
            Showing {products.length} of {meta.total} products
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">SKU</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Product Name</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Min Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Reorder Point</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Unit Price</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-neutral-600">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-neutral-600">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-neutral-900 font-medium">{product.sku}</td>
                    <td className="py-3 px-4 text-neutral-900">{product.name}</td>
                    <td className="py-3 px-4 text-neutral-600">{product.category?.name || product.category || '-'}</td>
                    <td className="py-3 px-4 text-neutral-600">{product.minStockLevel || '-'}</td>
                    <td className="py-3 px-4 text-neutral-600">{product.reorderPoint || '-'}</td>
                    <td className="py-3 px-4 text-neutral-900 font-medium">${(product.unitPrice || 0).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`} className="p-2 hover:bg-primary/10 rounded-lg text-primary">
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 hover:bg-danger/10 rounded-lg text-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Delete Product?</h3>
            <p className="text-neutral-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
