"use client";

import React, { useEffect } from "react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  details: Record<string, string | number | undefined | null>;
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  details,
}: DetailModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop overlay */}
      <div
        className='fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      />

      {/* Modal Content Box */}
      <div className='relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-10'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-100 pb-3 mb-4'>
          <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-lg hover:bg-gray-50'
          >
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Details Grid List */}
        <div className='space-y-3.5'>
          {Object.entries(details).map(([label, value]) => (
            <div
              key={label}
              className='flex flex-col sm:flex-row sm:justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0'
            >
              <span className='text-xs font-medium text-gray-400 capitalize'>
                {label.replace(/([A-Z])/g, " $1").trim()}{" "}
                {/* Converts camelCase to spaced labels */}
              </span>
              <span className='text-sm font-semibold text-gray-700'>
                {value || "N/A"}
              </span>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className='mt-6 flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-white bg-[#2BBFBF] hover:bg-[#22a3a3] rounded-xl transition-colors cursor-pointer shadow-sm'
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
