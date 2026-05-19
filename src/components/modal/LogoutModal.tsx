"use client";

import React, { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
}: ConfirmModalProps) {
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

  const confirmButtonBg =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-600 focus:ring-red-200"
      : "bg-[#2BBFBF] hover:bg-[#22a3a3] focus:ring-cyan-100";

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop overlay */}
      <div
        className='fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      />

      {/* Modal Content Box */}
      <div className='relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-10'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>{title}</h3>
        <p className='text-sm text-gray-500 mb-6'>{message}</p>

        {/* Actions layout */}
        <div className='flex items-center justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer'
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors focus:ring-4 cursor-pointer ${confirmButtonBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
