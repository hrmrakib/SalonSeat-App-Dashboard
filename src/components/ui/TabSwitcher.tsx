"use client";

import React from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === tab.key
              ? "bg-[#2BBFBF] text-white shadow-sm"
              : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
