import React, { useState } from 'react';
import { useAuth } from '@lib/auth-context';
import { ChevronDown, Search } from 'lucide-react';

const Help = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  if (!isAuthenticated) return null;

  const faqs = [
    {
      id: 1,
      question: 'How do I create a new product?',
      answer: 'Navigate to Products > New Product, fill in the product details, and click Save.',
    },
    {
      id: 2,
      question: 'How do I manage stock across multiple locations?',
      answer: 'Use the Transfers feature to move stock between locations. Each location has its own inventory level.',
    },
    {
      id: 3,
      question: 'What is the difference between Receipts and Transfers?',
      answer: 'Receipts are for incoming stock from suppliers, while Transfers are for moving stock between your own locations.',
    },
    {
      id: 4,
      question: 'How do I run a stock count?',
      answer: 'Go to Counts > New Count, select the location, and assign staff to count items.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Help & Documentation</h1>
        <p className="text-neutral-600 mt-1">Find answers to common questions</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="card">
            <button
              onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <h3 className="font-medium text-neutral-900 text-left">{faq.question}</h3>
              <ChevronDown
                size={20}
                className={`text-neutral-400 transition-transform ${
                  expandedFAQ === faq.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedFAQ === faq.id && (
              <div className="px-6 pb-6 text-neutral-600 border-t border-neutral-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Documentation Links */}
      <div className="card-lg p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors">
            <p className="font-medium text-neutral-900">User Guide</p>
            <p className="text-sm text-neutral-600">Complete guide to using StockMaster</p>
          </a>
          <a href="#" className="p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors">
            <p className="font-medium text-neutral-900">API Documentation</p>
            <p className="text-sm text-neutral-600">Integration and API reference</p>
          </a>
          <a href="#" className="p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors">
            <p className="font-medium text-neutral-900">Video Tutorials</p>
            <p className="text-sm text-neutral-600">Step-by-step video guides</p>
          </a>
          <a href="#" className="p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors">
            <p className="font-medium text-neutral-900">Contact Support</p>
            <p className="text-sm text-neutral-600">Get help from our team</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;
