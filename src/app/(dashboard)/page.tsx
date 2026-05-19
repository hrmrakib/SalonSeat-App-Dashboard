"use client";

import React, { useState } from "react";
import StatsCard from "@/components/ui/StatsCard";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { dashboardStats, pendingListings } from "@/lib/data";
import DetailModal from "@/components/modal/DetailModal";

interface PendingListing {
  id: string;
  name: string;
  owner: string;
  submittedOn: string;
}

const pendingColumns: Column<PendingListing>[] = [
  { key: "name", header: "Listing Name", accessor: "name" },
  { key: "owner", header: "Owner", accessor: "owner" },
  { key: "submittedOn", header: "Submitted On", accessor: "submittedOn" },
];

export default function DashboardPage() {
  const [selectedListing, setSelectedListing] = useState<PendingListing | null>(
    null,
  );

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatsCard
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          }
          label='Beauty Professionals'
          count={dashboardStats.beautyProfessionals}
        />
        <StatsCard
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
              />
            </svg>
          }
          label='Salon Owners'
          count={dashboardStats.salonOwners}
        />
        <StatsCard
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
              />
            </svg>
          }
          label='Active Listings'
          count={dashboardStats.activeListings}
        />
        <StatsCard
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          }
          label='Pending Approvals'
          count={dashboardStats.pendingApprovals}
        />
      </div>

      {/* Listings Pending Approval Table */}
      <DataTable<PendingListing>
        title='Listings Pending Approval'
        columns={pendingColumns}
        data={pendingListings}
        searchable={true}
        searchKeys={["name", "owner"]}
        renderAction={(item) => (
          <button
            onClick={() => setSelectedListing(item)}
            className='p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
            aria-label={`View details for ${item.name}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-400 hover:text-[#2BBFBF] transition-colors'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </button>
        )}
      />

      {/* 3. Global Modal Display container */}
      <DetailModal
        isOpen={Boolean(selectedListing)}
        onClose={() => setSelectedListing(null)}
        title='Listing Details'
        details={{
          listingId: selectedListing?.id,
          salonName: selectedListing?.name,
          ownerName: selectedListing?.owner,
          submittedOn: selectedListing?.submittedOn,
        }}
      />
    </div>
  );
}
