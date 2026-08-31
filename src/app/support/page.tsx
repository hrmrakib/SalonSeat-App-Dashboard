import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Support | Salon Seat',
  description: 'Get in touch with Salon Seat support. Send us a message or email us directly for any inquiries.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 px-8 py-12 text-white text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">How can we help?</h1>
          <p className="text-indigo-100 font-medium text-lg">
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
        
        {/* Content Section */}
        <div className="px-8 py-10 text-gray-700">
          <ContactForm />

          <div className="mt-10 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Direct Contact</h2>
            <p className="text-lg">
              You can also reach us directly via email at:{' '}
              <a href="mailto:support@salonseat.net" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                support@salonseat.net
              </a>
            </p>
          </div>
        </div>
        
        {/* Footer Link */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
