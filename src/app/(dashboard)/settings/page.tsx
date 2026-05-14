"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: "Sharon",
    lastName: "Admin",
    email: "sharon@salonseat.com",
    phone: "+1 (555) 123-4567",
    role: "Super Admin",
    notifications: true,
    emailAlerts: true,
    darkMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden fade-in">
        <div className="px-5 py-4 border-b border-border-light">
          <h2 className="text-lg font-semibold text-text-primary">
            Profile Settings
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Manage your account information
          </p>
        </div>

        <div className="p-5 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-xs text-text-muted">{formData.role}</p>
              <button className="mt-1 text-xs text-brand hover:text-brand-dark font-medium transition-colors cursor-pointer">
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-brand transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-brand transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-brand transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-brand transition-colors bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden fade-in">
        <div className="px-5 py-4 border-b border-border-light">
          <h2 className="text-lg font-semibold text-text-primary">
            Preferences
          </h2>
        </div>

        <div className="p-5 space-y-4">
          {/* Toggle: Push Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Push Notifications
              </p>
              <p className="text-xs text-text-muted">
                Receive push notifications for new events
              </p>
            </div>
            <button
              onClick={() =>
                handleChange("notifications", !formData.notifications)
              }
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                formData.notifications ? "bg-brand" : "bg-gray-300"
              }`}
              aria-label="Toggle push notifications"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  formData.notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle: Email Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Email Alerts
              </p>
              <p className="text-xs text-text-muted">
                Get email updates for important activities
              </p>
            </div>
            <button
              onClick={() =>
                handleChange("emailAlerts", !formData.emailAlerts)
              }
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                formData.emailAlerts ? "bg-brand" : "bg-gray-300"
              }`}
              aria-label="Toggle email alerts"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  formData.emailAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle: Dark Mode */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Dark Mode</p>
              <p className="text-xs text-text-muted">
                Switch to dark theme (coming soon)
              </p>
            </div>
            <button
              onClick={() => handleChange("darkMode", !formData.darkMode)}
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                formData.darkMode ? "bg-brand" : "bg-gray-300"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  formData.darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          Save Changes
        </button>
        {saved && (
          <span className="text-sm text-success font-medium fade-in">
            ✓ Changes saved successfully!
          </span>
        )}
      </div>
    </div>
  );
}
