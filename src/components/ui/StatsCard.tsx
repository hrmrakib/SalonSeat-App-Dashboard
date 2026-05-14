"use client";

import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  count: number | string;
}

export default function StatsCard({ icon, label, count }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E8F8F8] text-[#2BBFBF] shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
      </div>
    </div>
  );
}
