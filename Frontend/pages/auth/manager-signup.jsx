import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth-context';
import Image from 'next/image';
import { User, Mail, Lock, Building2, AlertCircle } from 'lucide-react';

const ManagerSignup = () => {
  const router = useRouter();
  const { signup, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      setFormError('First name and last name are required');
      return;
    }

    if (!formData.companyName) {
      setFormError('Company name is required');
      return;
    }

    setLoading(true);

    try {
      const response = await signup(formData.firstName, formData.lastName, formData.email, formData.password);
      console.log('Manager signup successful, redirecting to OTP verification...');
      // Store email in session for OTP verification
      sessionStorage.setItem('signupEmail', formData.email);
      sessionStorage.setItem('userRole', 'INVENTORY_MANAGER');
      sessionStorage.setItem('companyName', formData.companyName);
      // Use replace to prevent back button
      router.replace('/auth/verify-signup-otp');
    } catch (err) {
      setFormError(error || 'Signup failed. Please try again.');
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
          <h1 className="text-2xl font-bold text-neutral-900">Manager Registration</h1>
          <p className="text-neutral-600 mt-2">Create your inventory management account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-lg p-8 space-y-6">
          {formError && (
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{formError}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-800 mb-3">First Name</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-800 mb-3">Last Name</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-3">Company Name</label>
            <div className="relative">
              <Building2 size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your Company Ltd"
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                required
              />
            </div>
          </div>

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
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-3">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-3">Confirm Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-neutral-900 placeholder-neutral-400 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 mt-2 bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-secondary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? 'Creating account...' : 'Create Manager Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-neutral-600 mt-6 space-y-2">
          <p>
            Are you warehouse staff?{' '}
            <Link href="/auth/signup" className="text-primary font-medium hover:text-primary-dark">
              Sign up here
            </Link>
          </p>
          <p>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

ManagerSignup.isAuthPage = true;

export default ManagerSignup;
