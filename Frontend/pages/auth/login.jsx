import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth-context';
import Image from 'next/image';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      console.log('Login successful, redirecting to dashboard...');
      // Use replace to prevent back button going to login
      router.replace('/dashboard');
    } catch (err) {
      setFormError(error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/Logo.png" 
              alt="StockMaster Logo" 
              width={64} 
              height={64}
              className="rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to your StockMaster account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-lg p-8 space-y-6">
          {formError && (
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{formError}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-3">Email Address</label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-neutral-800">Password</label>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 mt-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-neutral-600 mt-6 space-y-2">
          <p>
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-medium hover:text-primary-dark">
              Sign up as Staff
            </Link>
          </p>
          <p className="text-sm">
            Are you a manager?{' '}
            <Link href="/auth/manager-signup" className="text-secondary font-medium hover:text-secondary-dark">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.isAuthPage = true;

export default Login;
