"use client";

import React from "react";
import Image from "next/image";
import type { Listing } from "@/lib/types";

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}

export default function ListingDetailModal({
  listing,
  onClose,
  onApprove,
  onDecline,
}: ListingDetailModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={listing.image}
            alt={listing.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2BBFBF]" />
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="w-2 h-2 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800">{listing.name}</h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Details */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Price:</span>
              <span className="text-sm font-semibold text-gray-800">$250 / month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Rental Type:</span>
              <span className="inline-block px-3 py-0.5 text-xs font-medium text-[#2BBFBF] border border-[#2BBFBF] rounded-full">
                {listing.rentalType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Location:</span>
              <span className="text-sm font-medium text-[#2BBFBF]">Downtown Dallas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Owner:</span>
              <span className="text-sm text-gray-800 flex items-center gap-1.5">
                {listing.owner}
                {listing.ownerVerified && (
                  <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-[#2BBFBF] border border-[#2BBFBF] rounded-full">
                    Verified
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Availability:</span>
              <span className="text-sm text-gray-800">{listing.availability}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-block px-3 py-1 text-xs font-medium text-[#2BBFBF] border border-[#2BBFBF] rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => onDecline(listing.id)}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={() => onApprove(listing.id)}
              className="flex-1 py-2.5 rounded-lg bg-[#2BBFBF] hover:bg-[#1AABA8] text-sm font-medium text-white transition-colors cursor-pointer"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
