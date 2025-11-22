import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth-context';
import Image from 'next/image';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const router = useRouter();
  const { requestOTP, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      await requestOTP(email);
      setSubmitted(true);
    } catch (err) {
      setFormError(error || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="card-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-secondary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Check Your Email</h1>
            <p className="text-neutral-600 mb-6">
              We've sent an OTP to <strong>{email}</strong>. Enter it on the next page to reset your password.
            </p>
            <Link href="/auth/verify-otp" className="btn btn-primary w-full">
              Enter OTP
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-neutral-900">Reset Password</h1>
          <p className="text-neutral-600 mt-2">Enter your email to receive an OTP</p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-neutral-600 mt-6">
          Remember your password?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

ForgotPassword.isAuthPage = true;

export default ForgotPassword;
