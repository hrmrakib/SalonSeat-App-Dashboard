"use client";

import React, { useState, useMemo } from "react";
import SearchBar from "./SearchBar";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  accessor?: keyof T;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  renderAction?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends { id: string }>({
  title,
  columns,
  data,
  searchable = true,
  searchKeys = [],
  renderAction,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim() || searchKeys.length === 0) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return typeof value === "string" && value.toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, searchKeys]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {searchable && <SearchBar value={searchQuery} onChange={setSearchQuery} />}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-[#2BBFBF]">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">
                  {col.header}
                </th>
              ))}
              {renderAction && (
                <th className="px-5 py-3 text-center text-sm font-semibold text-white whitespace-nowrap">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (renderAction ? 1 : 0)} className="px-5 py-10 text-center text-gray-400 text-sm">
                  No results found.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">
                      {col.render ? col.render(item) : col.accessor ? String(item[col.accessor] ?? "") : ""}
                    </td>
                  ))}
                  {renderAction && (
                    <td className="px-5 py-3.5 text-center">{renderAction(item)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
