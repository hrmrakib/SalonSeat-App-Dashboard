/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getImageURL } from "@/lib/getImageURL";
import {
  useApprovedListingMutation,
  useGetAllListingsQuery,
  useRejectListingMutation,
} from "@/redux/features/listing/listingAPI";
import { useState } from "react";

export interface ListingPhoto {
  id: number;
  url: string;
}

export interface Listing {
  id: number;
  is_admin_approved: boolean;
  is_admin_rejected: boolean;
  businessname: string;
  listing_title: string;
  street_address: string;
  city: string;
  zip: string;
  country: string;
  map_link: string;
  is_wifi: boolean;
  is_parking: boolean;
  is_storage: boolean;
  is_mirror: boolean;
  is_sink: boolean;
  is_styling_chair: boolean;
  is_product_shelves: boolean;
  is_access_24_hours: boolean;
  amenities_description: string;
  rental_type: string;
  lease_terms: string;
  price: string;
  availability_status: string;
  maximum_cccupancy: number;
  restrictions: string;
  additional_notes: string;
  photos: ListingPhoto[];
  create_at: string;
  update_at: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    next: number | null;
    previous: number | null;
    per_page: number;
  };
  data: Listing[];
  overview: {
    beauty_professionals: number;
    salon_owners: number;
    active_listings: number;
    pending_approvals: number;
  };
}

export default function SalonDashboard() {
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">(
    "pending",
  );
  const [page, setPage] = useState<number>(1);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const page_size = 10;

  const { data, isLoading } = useGetAllListingsQuery({
    filter,
    page,
    page_size,
  });
  const [approveListing] = useApprovedListingMutation();
  const [rejectListing] = useRejectListingMutation();

  const listings = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.total_pages || 1;

  const handleFilterChange = (
    newFilter: "pending" | "approved" | "rejected",
  ) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleApprove = async (id: number) => {
    try {
      await approveListing({ id, body: { is_admin_rejected: false } });
      setSelectedListing(null);
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectListing({ id, body: { is_admin_rejected: true } });
      setSelectedListing(null);
    } catch (err) {
      console.error("Rejection failed", err);
    }
  };

  const defaultPlaceholder =
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80";

  return (
    <div className='min-h-screen bg-[#f3f4f6] p-4 md:p-8 text-slate-800 flex flex-col justify-between'>
      <div>
        {/* Header section */}
        <div className='mb-6'>
          <h1 className='text-xl font-bold text-gray-800'>Welcome, Sharon</h1>
          <p className='text-sm text-gray-500'>Have a nice day</p>
        </div>

        {/* Dynamic Tabs matching the UI buttons */}
        <div className='flex gap-3 mb-6'>
          <button
            onClick={() => handleFilterChange("pending")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "pending"
                ? "bg-[#159a9c] text-white"
                : "bg-white text-gray-500 border border-gray-100 shadow-sm"
            }`}
          >
            Requested
          </button>
          <button
            onClick={() => handleFilterChange("approved")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "approved"
                ? "bg-[#159a9c] text-white"
                : "bg-white text-gray-500 border border-gray-100 shadow-sm"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => handleFilterChange("rejected")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "rejected"
                ? "bg-[#159a9c] text-white"
                : "bg-white text-gray-500 border border-gray-100 shadow-sm"
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Loading & Empty States */}
        {isLoading && (
          <div className='flex justify-center py-20 text-[#159a9c] font-medium'>
            Loading items...
          </div>
        )}

        {!isLoading && listings.length === 0 && (
          <div className='text-center py-20 text-gray-400 bg-white rounded-xl shadow-sm border border-gray-100'>
            No listings found for this category.
          </div>
        )}

        {/* Main Grid System */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing: Listing) => {
            const cardImgSrc =
              listing.photos && listing.photos.length > 0
                ? listing.photos[0].url
                : defaultPlaceholder;

            return (
              <div
                key={listing.id}
                onClick={() => setSelectedListing(listing)}
                className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100'
              >
                <div className='relative aspect-4/3 bg-gray-100'>
                  <img
                    src={getImageURL(cardImgSrc)}
                    alt={listing.listing_title}
                    className='w-full h-full object-cover'
                  />
                </div>

                <div className='p-5'>
                  <h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>
                    {listing.listing_title}
                  </h3>
                  <p className='text-sm text-gray-400 mt-0.5'>
                    {listing.city}, {listing.country}
                  </p>

                  <div className='mt-3'>
                    <span className='inline-block bg-[#eefafb] text-[#159a9c] border border-[#d2f1f3] text-xs font-medium px-3 py-1 rounded-full capitalize'>
                      {listing.rental_type}
                    </span>
                  </div>

                  <div className='mt-4 pt-3 border-t border-gray-50 flex justify-between items-center'>
                    <span className='text-[#159a9c] font-bold text-lg'>
                      ${parseFloat(listing.price).toLocaleString()}/
                      {listing.lease_terms?.toLowerCase() || "month"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Complete Responsive Pagination Control Elements */}
      {!isLoading && listings.length > 0 && totalPages > 1 && (
        <div className='mt-10 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3.5 sm:px-6 rounded-2xl shadow-xs'>
          {/* Mobile view action frames */}
          <div className='flex flex-1 justify-between sm:hidden'>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className='relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className='relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Next
            </button>
          </div>

          {/* Desktop/Tablet view action frames */}
          <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-600'>
                Showing page{" "}
                <span className='font-semibold text-gray-900'>
                  {meta?.current_page}
                </span>{" "}
                of{" "}
                <span className='font-semibold text-gray-900'>
                  {meta?.total_pages}
                </span>{" "}
                ({meta?.total_items} items)
              </p>
            </div>
            <div>
              <nav
                className='isolate inline-flex -space-x-px rounded-xl shadow-xs gap-1.5'
                aria-label='Pagination'
              >
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className='relative inline-flex items-center rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-50 border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  <span className='text-sm font-medium text-gray-700'>
                    ← Prev
                  </span>
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        page === pageNum
                          ? "z-10 bg-[#159a9c] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159a9c]"
                          : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className='relative inline-flex items-center rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-50 border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  <span className='text-sm font-medium text-gray-700'>
                    Next →
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Verification Detail Modal overlay */}
      {selectedListing && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto'>
          <div className='bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl transform transition-all animate-in fade-in-50 zoom-in-95 duration-200'>
            <div className='relative aspect-4/3 bg-gray-200'>
              <img
                src={
                  selectedListing.photos && selectedListing.photos.length > 0
                    ? getImageURL(selectedListing.photos[0].url)
                    : defaultPlaceholder
                }
                alt={selectedListing.listing_title}
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-xs'>
                <div className='w-2 h-2 rounded-full bg-white'></div>
                <div className='w-2 h-2 rounded-full bg-white/50'></div>
                <div className='w-2 h-2 rounded-full bg-white/50'></div>
              </div>
            </div>

            {/* Modal Content */}
            <div className='p-6 max-h-[60vh] overflow-y-auto custom-scrollbar'>
              <h2 className='text-xl font-bold text-gray-900'>
                {selectedListing.listing_title}
              </h2>
              <p className='text-sm text-gray-500 mt-2 leading-relaxed'>
                {selectedListing.amenities_description ||
                  `Spacious modern salon suite located in the heart of downtown. Perfect for hair stylists looking for flexible ${selectedListing.rental_type} leases.`}
              </p>

              {/* Specs Table List */}
              <div className='mt-5 space-y-3.5 border-t border-b border-gray-100 py-4 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Price:</span>
                  <span className='font-bold text-gray-800'>
                    ${parseFloat(selectedListing.price).toLocaleString()} /{" "}
                    {selectedListing.lease_terms?.toLowerCase() || "month"}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Rental Type:</span>
                  <span className='text-xs bg-[#eefafb] text-[#159a9c] border border-[#d2f1f3] px-3 py-1 rounded-full capitalize font-medium'>
                    {selectedListing.rental_type}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Location:</span>
                  <span className='text-[#159a9c] font-medium'>
                    {selectedListing.street_address}, {selectedListing.city}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Owner:</span>
                  <div className='flex items-center gap-1.5'>
                    <span className='font-bold text-gray-800'>
                      {selectedListing.businessname}
                    </span>
                    <span className='text-[10px] bg-[#eefafb] text-[#159a9c] font-semibold px-2 py-0.5 rounded border border-[#d2f1f3]'>
                      Verified
                    </span>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Availability:</span>
                  <span className='font-bold text-gray-800 capitalize'>
                    {selectedListing.availability_status} /{" "}
                    {selectedListing.lease_terms}
                  </span>
                </div>
              </div>

              {/* Dynamic Badges mapped via Boolean Values */}
              <div className='mt-5 flex flex-wrap gap-2'>
                {selectedListing.is_wifi && (
                  <span className='text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full'>
                    Wi-Fi
                  </span>
                )}
                {selectedListing.is_parking && (
                  <span className='text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full'>
                    Parking
                  </span>
                )}
                {selectedListing.is_mirror && (
                  <span className='text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full'>
                    Mirror
                  </span>
                )}
                {selectedListing.is_sink && (
                  <span className='text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full'>
                    Sink
                  </span>
                )}
                {selectedListing.is_styling_chair && (
                  <span className='text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full'>
                    AC / Styling Chair
                  </span>
                )}
              </div>
            </div>

            {/* Sticky Modal Action Buttons footer */}
            <div className='p-4 bg-gray-50 border-t border-gray-100 flex gap-3'>
              <button
                onClick={() => handleReject(selectedListing.id)}
                className='flex-1 py-3 px-4 bg-[#e5e7eb] hover:bg-gray-300 text-gray-700 font-semibold rounded-xl text-sm transition-colors'
              >
                Decline
              </button>
              <button
                onClick={() => handleApprove(selectedListing.id)}
                className='flex-1 py-3 px-4 bg-[#159a9c] hover:bg-[#0f7c7e] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm'
              >
                Approve
              </button>
            </div>

            <button
              onClick={() => setSelectedListing(null)}
              className='absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all'
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
