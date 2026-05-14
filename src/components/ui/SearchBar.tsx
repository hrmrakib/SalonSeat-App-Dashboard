"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search.." }: SearchBarProps) {
  return (
    <div className="flex items-center gap-0">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-32 sm:w-44 px-3 text-sm border border-gray-200 rounded-l-lg outline-none focus:border-[#2BBFBF] transition-colors bg-white placeholder:text-gray-400"
      />
      <button
        type="button"
        className="flex items-center justify-center h-9 w-9 bg-[#2BBFBF] hover:bg-[#1AABA8] rounded-r-lg transition-colors shrink-0 cursor-pointer"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}
