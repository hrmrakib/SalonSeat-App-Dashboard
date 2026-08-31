import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Salon Seat',
  description: 'Privacy Policy for Salon Seat. Learn how we collect, use, and protect your personal information when using our mobile application.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 px-8 py-12 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Privacy Policy for Salon Seat</h1>
          <p className="text-indigo-100 font-medium text-lg">Last Updated: August 29, 2026</p>
        </div>
        
        {/* Content Section */}
        <div className="px-8 py-10 space-y-10 text-gray-700">
          <section className="prose prose-indigo max-w-none">
            <p className="text-lg leading-relaxed">
              At <strong className="text-gray-900 font-semibold">Salon Seat</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App").
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. Information We Collect</h2>
            <p className="mb-5 text-lg">We collect information about you in a variety of ways. The information we may collect via the App includes:</p>
            
            <div className="space-y-5">
              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Data</h3>
                <p className="leading-relaxed">Demographic and other personally identifiable information (such as your name, email address, phone number, and physical address) that you voluntarily give to us when you choose to register as a Salon Owner or Beauty Professional, or when you participate in various activities related to the App (such as chat messages, listing details, and profile configurations).</p>
              </div>
              
              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Location Information</h3>
                <p className="mb-3 leading-relaxed">We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using the App, to provide location-based services. This is used specifically for:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>Searching for nearby salon chair/booth listings.</li>
                  <li>Setting accurate coordinates for salon station rentals on the map.</li>
                </ul>
                <p className="mt-4 text-sm font-medium text-gray-500">If you wish to change our access or permissions, you may do so in your device’s settings.</p>
              </div>

              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Financial Data</h3>
                <p className="leading-relaxed">Our app processes in-app purchases and subscription transactions. We use a third-party SDK (RevenueCat) to manage subscriptions. All payment transactions are processed securely through Apple's App Store Payment Gateway. We do not store or collect your payment card details on our own servers.</p>
              </div>

              <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Device and Identifiers</h3>
                <p className="leading-relaxed">We automatically collect certain information when you visit, use, or navigate the App. This information does not reveal your specific identity (like your name or contact information) but may include device-specific identifiers (such as device IDs, push notification tokens via OneSignal, and account IDs used by Firebase Authentication).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. How We Use Your Information</h2>
            <p className="mb-4 text-lg">Having accurate information about you allows us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the App to:</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 leading-relaxed">
              <li>Create and manage your user account.</li>
              <li>Enable booking agreements and communication between Salon Owners and Beauty Professionals.</li>
              <li>Process and manage subscription payments (via RevenueCat).</li>
              <li>Send you push notifications regarding booking updates or account activities (via OneSignal).</li>
              <li>Assist law enforcement and respond to subpoenas.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. Sharing Your Information</h2>
            <p className="mb-4 text-lg">We do not sell, rent, or trade your data with third parties for their marketing or promotional purposes. We may share information we have collected about you in certain situations:</p>
            <ul className="space-y-4 text-gray-800">
              <li className="leading-relaxed"><strong className="text-gray-900 font-semibold">Between Users:</strong> When you communicate via chat or complete a booking, certain information (such as your name and salon listing details) will be visible to the other party to facilitate the transaction.</li>
              <li className="leading-relaxed"><strong className="text-gray-900 font-semibold">Third-Party Service Providers:</strong> We share data with third-party service providers who perform services for us or on our behalf, including Firebase (Authentication), OneSignal (Push Notifications), and RevenueCat (Subscription management).</li>
              <li className="leading-relaxed"><strong className="text-gray-900 font-semibold">By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process or investigate potential violations of our policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">4. Data Security</h2>
            <p className="leading-relaxed text-lg">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">5. Children's Privacy</h2>
            <p className="leading-relaxed text-lg">We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">6. Contact Us</h2>
            <p className="mb-3 text-lg">If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg inline-block">
              <p className="font-medium text-lg text-indigo-900">
                Email: <a href="mailto:support@salonseat.net" className="text-indigo-600 hover:text-indigo-800 transition-colors font-semibold">support@salonseat.net</a>
              </p>
            </div>
          </section>
        </div>
        
        {/* Footer Link */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
