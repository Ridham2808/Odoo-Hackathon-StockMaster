import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/auth-context';
import Image from 'next/image';
import { 
  Package, Truck, BarChart3, Users, Lock, ArrowRight, CheckCircle, 
  Zap, Shield, Globe, TrendingUp, Warehouse, ClipboardList, 
  GitBranch, AlertCircle, Settings, LogOut 
} from 'lucide-react';

const Home = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/Logo.png" 
              alt="StockMaster Logo" 
              width={48} 
              height={48}
              className="shadow-lg rounded-lg"
            />
            <div>
              <span className="font-bold text-xl text-neutral-900">StockMaster</span>
              <p className="text-xs text-neutral-500">Inventory Management System</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login" className="px-6 py-2.5 text-neutral-700 font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-sm font-semibold text-primary">✨ Trusted by 500+ Warehouses</p>
            </div>
            <h1 className="text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Real-Time Inventory Management Made Simple
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Replace manual registers and Excel sheets with StockMaster. Digitize all stock operations, track movements in real-time, and make data-driven decisions instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/auth/signup" className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight size={20} />
              </Link>
              <Link href="/auth/login" className="px-8 py-4 border-2 border-neutral-200 text-neutral-900 font-semibold rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                Try Demo
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-secondary" />
                <span className="text-neutral-700">No credit card required</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-secondary" />
                <span className="text-neutral-700">14-day free trial • Full access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-secondary" />
                <span className="text-neutral-700">24/7 customer support</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-neutral-200">
              <div className="space-y-6">
                {/* Dashboard Preview */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-neutral-900">Dashboard Overview</h3>
                    <TrendingUp size={20} className="text-secondary" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-neutral-600">Total Products</p>
                      <p className="text-2xl font-bold text-primary">2,450</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-neutral-600">Stock Value</p>
                      <p className="text-2xl font-bold text-secondary">$125K</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-neutral-600">Pending Receipts</p>
                      <p className="text-2xl font-bold text-warning">12</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-neutral-600">Low Stock Items</p>
                      <p className="text-2xl font-bold text-danger">8</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <Zap size={24} className="text-primary mx-auto mb-2" />
                    <p className="text-xs font-semibold text-neutral-900">Real-Time</p>
                  </div>
                  <div className="text-center">
                    <Shield size={24} className="text-secondary mx-auto mb-2" />
                    <p className="text-xs font-semibold text-neutral-900">Secure</p>
                  </div>
                  <div className="text-center">
                    <Globe size={24} className="text-warning mx-auto mb-2" />
                    <p className="text-xs font-semibold text-neutral-900">Multi-Location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Core Features</h2>
            <p className="text-xl text-neutral-600">Everything you need to manage inventory efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Package size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Product Management</h3>
              <p className="text-neutral-600 mb-4">Create and manage products with SKU, categories, units of measure, and reordering rules.</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> SKU & Barcode</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Multi-category</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Stock Levels</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <Truck size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Receipts & Deliveries</h3>
              <p className="text-neutral-600 mb-4">Manage incoming goods from vendors and outgoing shipments to customers seamlessly.</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Vendor Management</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Auto Stock Update</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Validation</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-warning/5 to-warning/10 rounded-2xl p-8 border border-warning/20 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-warning rounded-xl flex items-center justify-center mb-6">
                <GitBranch size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Internal Transfers</h3>
              <p className="text-neutral-600 mb-4">Move stock between warehouse locations and track every movement in the ledger.</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Multi-Location</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Movement Logging</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Audit Trail</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-danger/5 to-danger/10 rounded-2xl p-8 border border-danger/20 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-danger rounded-xl flex items-center justify-center mb-6">
                <AlertCircle size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Stock Adjustments</h3>
              <p className="text-neutral-600 mb-4">Fix discrepancies between recorded and physical stock with detailed logging.</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Physical Counts</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Auto Adjustment</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Damage Tracking</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <BarChart3 size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Advanced Analytics</h3>
              <p className="text-neutral-600 mb-4">Get insights with stock valuation, movement analysis, and ABC classification.</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Stock Valuation</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> ABC Analysis</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Trends</li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Role-Based Access</h3>
              <p className="text-neutral-600 mb-4">Three user roles with granular permissions for secure operations.</p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Inventory Manager</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Warehouse Staff</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> StockMaster Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-xl text-neutral-600">Simple 4-step inventory management workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Receive Goods', desc: 'Create receipts from vendors and add products' },
              { num: 2, title: 'Track Stock', desc: 'Monitor inventory across multiple locations' },
              { num: 3, title: 'Manage Movements', desc: 'Handle transfers, deliveries, and adjustments' },
              { num: 4, title: 'Analyze Data', desc: 'Get insights with reports and analytics' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center border border-neutral-200 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-600">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-8">Why Choose StockMaster?</h2>
              <div className="space-y-6">
                {[
                  { icon: Zap, title: 'Real-Time Updates', desc: 'Instant stock level updates across all locations' },
                  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with data encryption' },
                  { icon: BarChart3, title: 'Smart Analytics', desc: 'Data-driven insights for better decisions' },
                  { icon: Users, title: 'Easy Collaboration', desc: 'Seamless team coordination and task assignment' },
                  { icon: TrendingUp, title: 'Scalable', desc: 'Grows with your business needs' },
                  { icon: Globe, title: 'Multi-Location', desc: 'Manage unlimited warehouse locations' },
                ].map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                          <Icon size={24} className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">{benefit.title}</h3>
                        <p className="text-neutral-600">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20">
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">QUICK STATS</p>
                  <h3 className="text-3xl font-bold text-neutral-900">500+</h3>
                  <p className="text-neutral-600">Active Warehouses</p>
                </div>
                <div className="border-t border-neutral-200 pt-8">
                  <p className="text-sm font-semibold text-primary mb-2">AVERAGE IMPROVEMENT</p>
                  <h3 className="text-3xl font-bold text-neutral-900">45%</h3>
                  <p className="text-neutral-600">Faster Operations</p>
                </div>
                <div className="border-t border-neutral-200 pt-8">
                  <p className="text-sm font-semibold text-primary mb-2">USER SATISFACTION</p>
                  <h3 className="text-3xl font-bold text-neutral-900">4.9/5</h3>
                  <p className="text-neutral-600">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">Ready to Transform Your Inventory Management?</h2>
          <p className="text-xl text-neutral-600 mb-12">Start your free 14-day trial today. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link href="/auth/login" className="px-10 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/Logo.png" 
                  alt="StockMaster Logo" 
                  width={32} 
                  height={32}
                  className="rounded"
                />
                <span className="font-bold text-white">StockMaster</span>
              </div>
              <p className="text-sm text-neutral-400">Real-time inventory management for modern warehouses.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2024 StockMaster. All rights reserved. | Built with ❤️ for modern warehouses</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

Home.isAuthPage = true;

export default Home;
