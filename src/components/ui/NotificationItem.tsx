"use client";

import React from "react";

// Matches the exact shape of your incoming backend dataset objects
export interface ApiNotification {
  id: number;
  title: string;
  content: string;
  note_type: string; // e.g., "success", "payment", "info"
}

interface NotificationItemProps {
  notification: ApiNotification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const { title, content, note_type } = notification;

  // Use note_type to determine highlighting configurations
  const isHighlighted = note_type === "success";

  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-colors duration-200 ${isHighlighted ? "bg-[#2BBFBF] text-white" : "bg-white hover:bg-gray-50"}`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${isHighlighted ? "bg-white/20 text-white" : "bg-[#E8F8F8] text-[#2BBFBF]"}`}
      >
        {note_type === "payment" ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
            />
          </svg>
        )}
      </div>
      <div className='min-w-0 flex-1'>
        <p
          className={`text-sm font-medium truncate ${isHighlighted ? "text-white" : "text-gray-800"}`}
        >
          {title}
        </p>
        <p
          className={`text-xs mt-0.5 ${isHighlighted ? "text-white/70" : "text-gray-400"}`}
        >
          {content}
        </p>
      </div>
    </div>
  );
}
