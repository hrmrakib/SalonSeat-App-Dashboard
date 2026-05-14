"use client";

import React from "react";
import Image from "next/image";
import type { Listing } from "@/lib/types";

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  return (
    <button
      onClick={() => onClick(listing)}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 text-left cursor-pointer w-full"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800">{listing.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{listing.location}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-[#2BBFBF] border border-[#2BBFBF] rounded-full">
            Chair
          </span>
        </div>
        <p className="text-sm font-semibold text-[#2BBFBF] mt-2">{listing.price}</p>
      </div>
    </button>
  );
}
