/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Info,
  X,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useGetAllUsersQuery,
  useUpdateStatusMutation,
} from "@/redux/features/user/userAPI";

// Define strict types matching your real API structure
interface TUserProfile {
  id: number;
  business_name: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  bio: string | null;
  company: string | null;
}

interface TUserItem {
  id: number;
  email: string;
  full_name: string;
  phone: string | null;
  user_role: "salon_owner" | "professional";
  image: string | null;
  is_active: boolean;
  is_email_verified: boolean;
  created_at: string;
  active_listings_count: number;
  latest_subscription_price: string | null;
  profile: TUserProfile | null;
}

export default function UsersManagementPage() {
  // State management for Filters, Searching and Pagination
  const [activeTab, setActiveTab] = useState<"salon_owner" | "professional">(
    "salon_owner",
  );
  const [searchInputValue, setSearchInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal and interaction states
  const [selectedUser, setSelectedUser] = useState<TUserItem | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Debounce search input to prevent overloading RTK Query queries
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInputValue);
      setCurrentPage(1); // Reset page on new search
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInputValue]);

  // RTK Query hooks
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    user_role: activeTab,
    search: debouncedSearch,
    page: currentPage,
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const usersList: TUserItem[] = data?.data || [];
  const meta = data?.meta;

  // Handle toggle update inside the modal
  async function handleToggleActiveStatus(user: TUserItem) {
    try {
      const nextStatus = !user.is_active;
      const response = await updateStatus({
        id: user.id,
        body: { is_active: nextStatus },
      }).unwrap();

      if (response?.success) {
        // Optimistically update local modal state view
        setSelectedUser({ ...user, is_active: nextStatus });
        showToast("User status updated successfully!", false);
      } else {
        showToast("Failed to update user status.", true);
      }
    } catch (err: any) {
      showToast(
        err?.data?.message || "An error occurred during updating.",
        true,
      );
    }
  }

  function showToast(text: string, isError: boolean) {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 4000);
  }

  return (
    <div className='container mx-auto min-h-screen bg-gray-50 text-gray-800'>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-5 right-5 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-50 text-white animate-slide-in ${toastMessage.isError ? "bg-red-500" : "bg-emerald-500"}`}
        >
          {toastMessage.isError ? (
            <AlertCircle className='w-4 h-4' />
          ) : (
            <Check className='w-4 h-4' />
          )}
          <span className='text-sm font-medium'>{toastMessage.text}</span>
        </div>
      )}

      {/* Segmented Controller Navigation Tabs */}
      <div className='flex items-center gap-3 mb-6'>
        <button
          onClick={() => {
            setActiveTab("salon_owner");
            setCurrentPage(1);
          }}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
            activeTab === "salon_owner"
              ? "bg-teal-500 text-white shadow-sm"
              : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200"
          }`}
        >
          Salon Owner
        </button>
        <button
          onClick={() => {
            setActiveTab("professional");
            setCurrentPage(1);
          }}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
            activeTab === "professional"
              ? "bg-teal-500 text-white shadow-sm"
              : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200"
          }`}
        >
          Beauty Professional
        </button>
      </div>

      {/* Main Container Board */}
      <div className='bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden'>
        {/* Header Block with Search */}
        <div className='p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100'>
          <h1 className='text-xl font-bold text-gray-800 capitalize'>
            {activeTab.replace("_", " ")} Listings
          </h1>

          <div className='relative w-full sm:w-72'>
            <input
              type='text'
              placeholder='Search by name or email...'
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className='w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition placeholder-gray-400'
            />
            <div className='absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-teal-500 text-white rounded-full'>
              <Search className='w-3.5 h-3.5' />
            </div>
          </div>
        </div>

        {/* Dynamic Table Layout */}
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-teal-500 text-white text-xs font-semibold tracking-wider uppercase'>
                <th className='px-6 py-4'>#ID</th>
                <th className='px-6 py-4'>User Details</th>
                <th className='px-6 py-4'>Location</th>
                <th className='px-6 py-4'>Listings</th>
                <th className='px-6 py-4'>Joined Date</th>
                <th className='px-6 py-4'>Subscription</th>
                <th className='px-6 py-4 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 text-sm'>
              {isLoading || isFetching ? (
                <tr>
                  <td
                    colSpan={7}
                    className='text-center py-12 text-gray-400 font-medium'
                  >
                    Loading records data...
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className='text-center py-12 text-gray-400 font-medium'
                  >
                    No records found matching your query criteria.
                  </td>
                </tr>
              ) : (
                usersList.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50/70 transition'>
                    <td className='px-6 py-4 font-mono font-medium text-gray-400'>
                      #{user.id}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='font-semibold text-gray-800 break-all'>
                          {user.full_name || "N/A"}
                        </span>
                        <span className='text-xs text-gray-400 break-all'>
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>
                      {user.profile?.city && user.profile?.country
                        ? `${user.profile.city}, ${user.profile.country}`
                        : user.profile?.city ||
                          user.profile?.country ||
                          "Global"}
                    </td>
                    <td className='px-6 py-4 font-medium text-gray-700'>
                      <span className='px-2.5 py-1 rounded-full bg-gray-100 text-xs'>
                        {user.active_listings_count} Listings
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-500'>
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className='px-6 py-4 font-semibold text-teal-600'>
                      {user.latest_subscription_price
                        ? `$${user.latest_subscription_price}/month`
                        : "Free / None"}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <button
                        onClick={() => setSelectedUser(user)}
                        className='p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition'
                      >
                        <Info className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Section */}
        {meta && meta.total_pages > 1 && (
          <div className='p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between'>
            <span className='text-xs font-medium text-gray-500'>
              Showing page {meta.current_page} of {meta.total_pages} (
              {meta.total_items} items total)
            </span>

            <div className='flex items-center gap-2'>
              <button
                disabled={currentPage === 1 || isFetching}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className='p-2 border border-gray-200 rounded-full bg-white hover:bg-gray-50 text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronLeft className='w-4 h-4' />
              </button>
              <button
                disabled={currentPage === meta.total_pages || isFetching}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className='p-2 border border-gray-200 rounded-full bg-white hover:bg-gray-50 text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full Account Details & Management Modal Component */}
      {selectedUser && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all animate-scale-up'>
            {/* Modal Heading Header */}
            <div className='bg-teal-500 px-6 py-4 flex items-center justify-between text-white'>
              <h3 className='font-bold text-lg'>User Extended Profile</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className='p-1 rounded-full hover:bg-white/20 transition'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            {/* Modal Contents Body */}
            <div className='p-6 space-y-6 max-h-[75vh] overflow-y-auto'>
              {/* Primary User Information */}
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xl uppercase'>
                  {selectedUser.full_name?.slice(0, 2) || "U"}
                </div>
                <div>
                  <h4 className='font-bold text-gray-800 text-base'>
                    {selectedUser.full_name || "N/A"}
                  </h4>
                  <p className='text-xs text-gray-400'>{selectedUser.email}</p>
                </div>
              </div>

              {/* Status Switch Controller Block */}
              <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between'>
                <div>
                  <p className='text-sm font-semibold text-gray-700'>
                    Account Access Control
                  </p>
                  <p className='text-xs text-gray-400'>
                    Toggle whether user is allowed to access application
                    services.
                  </p>
                </div>
                <button
                  type='button'
                  disabled={isUpdating}
                  onClick={() => handleToggleActiveStatus(selectedUser)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    selectedUser.is_active ? "bg-teal-500" : "bg-gray-200"
                  } disabled:opacity-50`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      selectedUser.is_active ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Meta Account Data Specs */}
              <div className='grid grid-cols-2 gap-4 text-xs'>
                <div className='p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
                  <span className='text-gray-400 block mb-0.5'>Role Type</span>
                  <span className='font-semibold text-gray-700 capitalize'>
                    {selectedUser.user_role.replace("_", " ")}
                  </span>
                </div>
                <div className='p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
                  <span className='text-gray-400 block mb-0.5'>
                    Email Verified Status
                  </span>
                  <span
                    className={`font-semibold ${selectedUser.is_email_verified ? "text-emerald-600" : "text-amber-500"}`}
                  >
                    {selectedUser.is_email_verified
                      ? "Verified"
                      : "Pending Verification"}
                  </span>
                </div>
                <div className='p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
                  <span className='text-gray-400 block mb-0.5'>
                    Active Ad Listings
                  </span>
                  <span className='font-semibold text-gray-700'>
                    {selectedUser.active_listings_count} Listings
                  </span>
                </div>
                <div className='p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
                  <span className='text-gray-400 block mb-0.5'>
                    Phone Number
                  </span>
                  <span className='font-semibold text-gray-700'>
                    {selectedUser.phone || "Not Provided"}
                  </span>
                </div>
              </div>

              {/* Nested Extended Custom Business Profiles */}
              <div className='border-t border-gray-100 pt-4'>
                <h5 className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-3'>
                  Professional Business Profile
                </h5>
                {selectedUser.profile ? (
                  <div className='space-y-3 text-sm'>
                    {selectedUser.profile.business_name && (
                      <div>
                        <span className='text-xs text-gray-400 block'>
                          Business Trade Title
                        </span>
                        <span className='text-gray-700 font-medium'>
                          {selectedUser.profile.business_name}
                        </span>
                      </div>
                    )}
                    {selectedUser.profile.address && (
                      <div>
                        <span className='text-xs text-gray-400 block'>
                          Physical Registered Address
                        </span>
                        <span className='text-gray-700 font-medium'>
                          {selectedUser.profile.address}
                        </span>
                      </div>
                    )}
                    {selectedUser.profile.company && (
                      <div>
                        <span className='text-xs text-gray-400 block'>
                          Organization / Company
                        </span>
                        <span className='text-gray-700 font-medium'>
                          {selectedUser.profile.company}
                        </span>
                      </div>
                    )}
                    {selectedUser.profile.bio && (
                      <div>
                        <span className='text-xs text-gray-400 block'>
                          Professional Biography Overview
                        </span>
                        <p className='text-gray-600 bg-gray-50 p-3 rounded-xl mt-1 text-xs leading-relaxed italic'>
                          &quot;{selectedUser.profile.bio}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className='text-xs text-gray-400 italic bg-gray-50 p-3 rounded-xl text-center'>
                    Extended professional context details have not been
                    customized yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import TabSwitcher from "@/components/ui/TabSwitcher";
// import DataTable, { type Column } from "@/components/ui/DataTable";
// import DetailModal from "@/components/modal/DetailModal"; // 1. Import your DetailModal
// import { salonOwners, beautyProfessionals } from "@/lib/data";
// import type { SalonOwner, BeautyProfessional, UserTab } from "@/lib/types";

// const tabs = [
//   { key: "salon-owner", label: "Salon Owner" },
//   { key: "beauty-professional", label: "Beauty Professional" },
// ];

// const salonOwnerColumns: Column<SalonOwner>[] = [
//   { key: "sl", header: "#SL", accessor: "serialNumber" },
//   { key: "user", header: "User", accessor: "name" },
//   { key: "email", header: "Email", accessor: "email" },
//   { key: "location", header: "Location", accessor: "location" },
//   {
//     key: "listings",
//     header: "Listings",
//     render: (item) => `${item.listings} Listings`,
//   },
//   { key: "joinedDate", header: "Joined Date", accessor: "joinedDate" },
//   { key: "subscription", header: "Subscription", accessor: "subscription" },
// ];

// const beautyProfColumns: Column<BeautyProfessional>[] = [
//   { key: "sl", header: "#SL", accessor: "serialNumber" },
//   { key: "user", header: "User", accessor: "name" },
//   { key: "email", header: "Email", accessor: "email" },
//   { key: "location", header: "Location", accessor: "location" },
//   { key: "joinedDate", header: "Joined Date", accessor: "joinedDate" },
// ];

// export default function UsersPage() {
//   const [activeTab, setActiveTab] = useState<UserTab>("salon-owner");

//   // 2. State that can flexibly hold either user profile type
//   const [selectedUser, setSelectedUser] = useState<
//     SalonOwner | BeautyProfessional | null
//   >(null);

//   // Helper type guard to check if selected user is a Salon Owner
//   const isSalonOwner = (
//     user: SalonOwner | BeautyProfessional | null,
//   ): user is SalonOwner => {
//     return user !== null && "listings" in user;
//   };

//   return (
//     <div className='space-y-5'>
//       <TabSwitcher
//         tabs={tabs}
//         activeTab={activeTab}
//         onTabChange={(key) => setActiveTab(key as UserTab)}
//       />

//       {activeTab === "salon-owner" ? (
//         <DataTable<SalonOwner>
//           title='Salon Owner'
//           columns={salonOwnerColumns}
//           data={salonOwners}
//           searchable={true}
//           searchKeys={["name", "email", "location"]}
//           renderAction={(item) => (
//             <button
//               onClick={() => setSelectedUser(item)}
//               className='p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group'
//               aria-label={`View details for ${item.name}`}
//             >
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 className='w-5 h-5 text-gray-400 group-hover:text-[#2BBFBF] transition-colors'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 stroke='currentColor'
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
//                 />
//               </svg>
//             </button>
//           )}
//         />
//       ) : (
//         <DataTable<BeautyProfessional>
//           title='Beauty Professional'
//           columns={beautyProfColumns}
//           data={beautyProfessionals}
//           searchable={true}
//           searchKeys={["name", "email", "location"]}
//           renderAction={(item) => (
//             <button
//               onClick={() => setSelectedUser(item)}
//               className='p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group'
//               aria-label={`View details for ${item.name}`}
//             >
//               <svg
//                 xmlns='http://www.w3.org/2000/svg'
//                 className='w-5 h-5 text-gray-400 group-hover:text-[#2BBFBF] transition-colors'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 stroke='currentColor'
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
//                 />
//               </svg>
//             </button>
//           )}
//         />
//       )}

//       {/* 3. Reusable Detail Modal mapping properties based on active type */}
//       <DetailModal
//         isOpen={Boolean(selectedUser)}
//         onClose={() => setSelectedUser(null)}
//         title={
//           isSalonOwner(selectedUser)
//             ? "Salon Owner Details"
//             : "Professional Details"
//         }
//         details={{
//           serialNo: selectedUser?.serialNumber,
//           fullName: selectedUser?.name,
//           emailAddress: selectedUser?.email,
//           location: selectedUser?.location,
//           joinedDate: selectedUser?.joinedDate,
//           // Conditionally append properties if the user belongs to the salon owner dataset
//           ...(isSalonOwner(selectedUser) && {
//             totalListings: `${selectedUser.listings} Active Listings`,
//             tierPlan: selectedUser.subscription,
//           }),
//         }}
//       />
//     </div>
//   );
// }
