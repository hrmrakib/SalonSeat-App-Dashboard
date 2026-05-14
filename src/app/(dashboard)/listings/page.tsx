"use client";

import React, { useState } from "react";
import TabSwitcher from "@/components/ui/TabSwitcher";
import ListingCard from "@/components/ui/ListingCard";
import ListingDetailModal from "@/components/ui/ListingDetailModal";
import { listings } from "@/lib/data";
import type { Listing, ListingTab } from "@/lib/types";

const tabs = [
  { key: "requested", label: "Requested" },
  { key: "approved", label: "Approved" },
];

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState<ListingTab>("requested");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const filteredListings = listings.filter((l) => l.status === activeTab);

  const handleApprove = (id: string) => {
    alert(`Listing ${id} approved!`);
    setSelectedListing(null);
  };

  const handleDecline = (id: string) => {
    alert(`Listing ${id} declined.`);
    setSelectedListing(null);
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as ListingTab)} />

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onClick={setSelectedListing}
          />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="py-16 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-400 text-sm">No listings found.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
}
