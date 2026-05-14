"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-[200px] min-h-screen">
        <div className="p-4 sm:p-6">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
