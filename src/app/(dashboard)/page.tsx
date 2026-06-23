/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useGetAllListingsQuery } from "@/redux/features/listing/listingAPI";
import { Clock, Crown, PartyPopper, Search, Users } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

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
    rejected_listings: number;
  };
}

export default function SalonDashboard() {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const debounceSearch = useDebounce(searchQuery, 1000);

  const { data, isLoading } = useGetAllListingsQuery({
    filter: "approved",
    page,
    page_size: pageSize,
    search: debounceSearch,
  });

  const listings = data?.data || [];
  const meta = data?.meta || {
    total_items: 0,
    total_pages: 1,
    current_page: 1,
  };
  const overview = data?.overview || {
    beauty_professionals: 689,
    salon_owners: 500,
    active_listings: 145,
    pending_approvals: 20,
    rejected_listings: 0,
  };

  const defaultPlaceholder =
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80";

  return (
    <div className='min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-4 md:p-8'>
      <div className='container mx-auto space-y-8'>
        {/* --- Top Metrics Summary Row --- */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-[#B6E6EA] flex items-center justify-center text-[#159a9c]'>
              <span className='text-xl'>
                <Users />
              </span>
            </div>
            <div>
              <p className='text-sm font-medium text-slate-400'>
                Beauty Professionals
              </p>
              <h3 className='text-2xl font-bold text-slate-800'>
                {overview.beauty_professionals}
              </h3>
            </div>
          </div>

          <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-[#B6E6EA] flex items-center justify-center text-[#159a9c]'>
              <span className='text-xl'>
                <Crown />
              </span>
            </div>
            <div>
              <p className='text-sm font-medium text-slate-400'>Salon Owners</p>
              <h3 className='text-2xl font-bold text-slate-800'>
                {overview.salon_owners}
              </h3>
            </div>
          </div>

          <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-[#B6E6EA] flex items-center justify-center text-[#159a9c]'>
              <span className='text-xl'>
                <PartyPopper />
              </span>
            </div>
            <div>
              <p className='text-sm font-medium text-slate-400'>
                Active Listings
              </p>
              <h3 className='text-2xl font-bold text-slate-800'>
                {overview.active_listings}
              </h3>
            </div>
          </div>

          <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-[#B6E6EA] flex items-center justify-center text-[#159a9c]'>
              <span className='text-xl'>
                <Clock />
              </span>
            </div>
            <div>
              <p className='text-sm font-medium text-slate-400'>
                Pending Approvals
              </p>
              <h3 className='text-2xl font-bold text-slate-800'>
                {overview.pending_approvals}
              </h3>
            </div>
          </div>
        </div>

        {/* --- Search + Table Header Row --- */}
        <div className='bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h2 className='text-base font-bold text-slate-800'>
            Listings Pending Approval
          </h2>
          <div className='relative flex items-center'>
            <input
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full md:w-64 bg-slate-50 text-slate-700 text-sm rounded-xl pl-4 pr-10 py-2.5 border border-slate-200 focus:outline-hidden focus:border-[#159a9c] focus:bg-white transition-all'
            />
            <div className='absolute right-2 w-8 h-8 bg-[#159a9c] text-white rounded-lg flex items-center justify-center text-sm'>
              <Search size={16} />
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        {isLoading ? (
          <div className='flex justify-center items-center py-24 text-[#159a9c] font-medium text-sm animate-pulse'>
            Fetching Dashboard Data Elements...
          </div>
        ) : listings.length === 0 ? (
          <div className='text-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-100 shadow-sm text-sm'>
            No approved listings match your search criteria.
          </div>
        ) : (
          <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-[#159a9c] text-white'>
                  <th className='text-left px-6 py-4 font-semibold text-sm tracking-wide'>
                    Listing Name
                  </th>
                  <th className='text-left px-6 py-4 font-semibold text-sm tracking-wide'>
                    Owner
                  </th>
                  <th className='text-left px-6 py-4 font-semibold text-sm tracking-wide'>
                    Location
                  </th>
                  <th className='text-left px-6 py-4 font-semibold text-sm tracking-wide'>
                    Rental Type
                  </th>
                  <th className='text-left px-6 py-4 font-semibold text-sm tracking-wide'>
                    Price
                  </th>
                  <th className='text-left px-6 py-4 font-semibold text-sm tracking-wide'>
                    Submitted On
                  </th>
                  <th className='text-center px-6 py-4 font-semibold text-sm tracking-wide'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {listings.map((listing: Listing) => (
                  <tr
                    key={listing.id}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4 text-sm font-semibold text-slate-800'>
                      {listing.listing_title}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-600'>
                      {listing.businessname}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-600'>
                      {listing.city}, {listing.country}
                    </td>
                    <td className='px-6 py-4'>
                      <span className='inline-block bg-[#B6E6EA] text-[#159a9c] border border-[#d2f1f3] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase'>
                        {listing.rental_type}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm font-bold text-[#159a9c]'>
                      ${parseFloat(listing.price).toLocaleString()} /{" "}
                      {listing.lease_terms.toLowerCase()}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-500'>
                      {new Date(listing.create_at).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <button
                        onClick={() => setSelectedListing(listing)}
                        className='w-7 h-7 rounded-full border border-slate-300 text-slate-400 hover:border-[#159a9c] hover:text-[#159a9c] flex items-center justify-center mx-auto transition-colors text-sm font-bold'
                        title='View Details'
                      >
                        ⓘ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Pagination --- */}
        {!isLoading && listings.length > 0 && meta.total_pages > 1 && (
          <div className='flex items-center justify-between border border-slate-100 bg-white px-5 py-4 rounded-2xl shadow-sm'>
            <div className='flex flex-1 justify-between sm:hidden'>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className='inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, meta.total_pages))
                }
                disabled={page === meta.total_pages}
                className='ml-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
              >
                Next
              </button>
            </div>

            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-500'>
                  Showing Page{" "}
                  <span className='font-bold text-slate-800'>
                    {meta.current_page}
                  </span>{" "}
                  of{" "}
                  <span className='font-bold text-slate-800'>
                    {meta.total_pages}
                  </span>{" "}
                  ({meta.total_items} items)
                </p>
              </div>
              <div>
                <nav
                  className='inline-flex items-center gap-1'
                  aria-label='Pagination'
                >
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className='px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: meta.total_pages }, (_, idx) => {
                    const currentNum = idx + 1;
                    return (
                      <button
                        key={currentNum}
                        onClick={() => setPage(currentNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                          page === currentNum
                            ? "bg-[#159a9c] text-white"
                            : "text-slate-600 hover:bg-slate-50 border border-slate-200"
                        }`}
                      >
                        {currentNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, meta.total_pages))
                    }
                    disabled={page === meta.total_pages}
                    className='px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                  >
                    Next →
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Detail Modal --- */}
      {selectedListing && (
        <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]'>
            <div className='relative aspect-4/3 bg-slate-100 shrink-0'>
              <img
                src={
                  selectedListing.photos && selectedListing.photos.length > 0
                    ? selectedListing.photos[0].url
                    : defaultPlaceholder
                }
                alt={selectedListing.listing_title}
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md'>
                {Array.from({
                  length: Math.max(selectedListing.photos?.length || 1, 3),
                }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === 0 ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className='p-6 overflow-y-auto space-y-5'>
              <div>
                <h2 className='text-lg font-bold text-slate-900'>
                  {selectedListing.listing_title}
                </h2>
                <p className='text-sm text-slate-500 mt-2 leading-relaxed'>
                  {selectedListing.amenities_description ||
                    "Spacious modern salon suite located in the heart of downtown."}
                </p>
              </div>

              <div className='space-y-3 border-t border-b border-slate-100 py-4 text-sm font-medium'>
                <div className='flex justify-between'>
                  <span className='text-slate-400'>Price:</span>
                  <span className='font-bold text-slate-800'>
                    ${parseFloat(selectedListing.price).toLocaleString()} /{" "}
                    {selectedListing.lease_terms.toLowerCase()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-slate-400'>Rental Type:</span>
                  <span className='text-[10px] bg-[#B6E6EA] text-[#159a9c] border border-[#d2f1f3] px-2.5 py-0.5 rounded-md font-bold uppercase'>
                    {selectedListing.rental_type}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-slate-400'>Location:</span>
                  <span className='text-[#159a9c] font-semibold text-right'>
                    {selectedListing.street_address}, {selectedListing.city}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-slate-400'>Owner:</span>
                  <div className='flex items-center gap-1.5'>
                    <span className='font-bold text-slate-800'>
                      {selectedListing.businessname}
                    </span>
                    <span className='text-[9px] bg-[#B6E6EA] text-[#159a9c] font-bold px-1.5 py-0.5 rounded border border-[#d2f1f3] tracking-wide uppercase'>
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-1.5'>
                {selectedListing.is_wifi && (
                  <span className='text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-md'>
                    Wi-Fi
                  </span>
                )}
                {selectedListing.is_parking && (
                  <span className='text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-md'>
                    Parking
                  </span>
                )}
                {selectedListing.is_mirror && (
                  <span className='text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-md'>
                    Mirror
                  </span>
                )}
                {selectedListing.is_product_shelves && (
                  <span className='text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-md'>
                    Product Shelves
                  </span>
                )}
                {selectedListing.is_access_24_hours && (
                  <span className='text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-md'>
                    24H Access
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedListing(null)}
              className='absolute top-3 right-3 bg-slate-900/40 hover:bg-slate-900/60 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-all'
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
