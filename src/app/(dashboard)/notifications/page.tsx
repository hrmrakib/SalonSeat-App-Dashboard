"use client";

import React from "react";
import Link from "next/link";
import NotificationItem from "@/components/ui/NotificationItem";
import { notifications } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light">
        <Link
          href="/"
          className="p-1.5 rounded-lg hover:bg-surface-secondary transition-colors"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h2 className="text-lg font-semibold text-text-primary">
          Notifications
        </h2>
      </div>

      {/* Notification List */}
      <div className="p-4 space-y-2">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

        {notifications.length === 0 && (
          <div className="py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-text-muted mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <p className="text-text-muted text-sm">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
