"use client";

import React, { useState } from "react";
import TabSwitcher from "@/components/ui/TabSwitcher";
import DataTable, { type Column } from "@/components/ui/DataTable";
import DetailModal from "@/components/modal/DetailModal"; // 1. Import your DetailModal
import { salonOwners, beautyProfessionals } from "@/lib/data";
import type { SalonOwner, BeautyProfessional, UserTab } from "@/lib/types";

const tabs = [
  { key: "salon-owner", label: "Salon Owner" },
  { key: "beauty-professional", label: "Beauty Professional" },
];

const salonOwnerColumns: Column<SalonOwner>[] = [
  { key: "sl", header: "#SL", accessor: "serialNumber" },
  { key: "user", header: "User", accessor: "name" },
  { key: "email", header: "Email", accessor: "email" },
  { key: "location", header: "Location", accessor: "location" },
  {
    key: "listings",
    header: "Listings",
    render: (item) => `${item.listings} Listings`,
  },
  { key: "joinedDate", header: "Joined Date", accessor: "joinedDate" },
  { key: "subscription", header: "Subscription", accessor: "subscription" },
];

const beautyProfColumns: Column<BeautyProfessional>[] = [
  { key: "sl", header: "#SL", accessor: "serialNumber" },
  { key: "user", header: "User", accessor: "name" },
  { key: "email", header: "Email", accessor: "email" },
  { key: "location", header: "Location", accessor: "location" },
  { key: "joinedDate", header: "Joined Date", accessor: "joinedDate" },
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<UserTab>("salon-owner");

  // 2. State that can flexibly hold either user profile type
  const [selectedUser, setSelectedUser] = useState<
    SalonOwner | BeautyProfessional | null
  >(null);

  // Helper type guard to check if selected user is a Salon Owner
  const isSalonOwner = (
    user: SalonOwner | BeautyProfessional | null,
  ): user is SalonOwner => {
    return user !== null && "listings" in user;
  };

  return (
    <div className='space-y-5'>
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as UserTab)}
      />

      {activeTab === "salon-owner" ? (
        <DataTable<SalonOwner>
          title='Salon Owner'
          columns={salonOwnerColumns}
          data={salonOwners}
          searchable={true}
          searchKeys={["name", "email", "location"]}
          renderAction={(item) => (
            <button
              onClick={() => setSelectedUser(item)}
              className='p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group'
              aria-label={`View details for ${item.name}`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-gray-400 group-hover:text-[#2BBFBF] transition-colors'
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
      ) : (
        <DataTable<BeautyProfessional>
          title='Beauty Professional'
          columns={beautyProfColumns}
          data={beautyProfessionals}
          searchable={true}
          searchKeys={["name", "email", "location"]}
          renderAction={(item) => (
            <button
              onClick={() => setSelectedUser(item)}
              className='p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group'
              aria-label={`View details for ${item.name}`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-gray-400 group-hover:text-[#2BBFBF] transition-colors'
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
      )}

      {/* 3. Reusable Detail Modal mapping properties based on active type */}
      <DetailModal
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title={
          isSalonOwner(selectedUser)
            ? "Salon Owner Details"
            : "Professional Details"
        }
        details={{
          serialNo: selectedUser?.serialNumber,
          fullName: selectedUser?.name,
          emailAddress: selectedUser?.email,
          location: selectedUser?.location,
          joinedDate: selectedUser?.joinedDate,
          // Conditionally append properties if the user belongs to the salon owner dataset
          ...(isSalonOwner(selectedUser) && {
            totalListings: `${selectedUser.listings} Active Listings`,
            tierPlan: selectedUser.subscription,
          }),
        }}
      />
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import TabSwitcher from "@/components/ui/TabSwitcher";
// import DataTable, { type Column } from "@/components/ui/DataTable";
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
//   { key: "listings", header: "Listings", render: (item) => `${item.listings} Listings` },
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

// function ActionButton({ label }: { label: string }) {
//   return (
//     <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" aria-label={label}>
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-[#2BBFBF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     </button>
//   );
// }

// export default function UsersPage() {
//   const [activeTab, setActiveTab] = useState<UserTab>("salon-owner");

//   return (
//     <div className="space-y-5">
//       <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as UserTab)} />

//       {activeTab === "salon-owner" ? (
//         <DataTable<SalonOwner>
//           title="Salon Owner"
//           columns={salonOwnerColumns}
//           data={salonOwners}
//           searchable={true}
//           searchKeys={["name", "email", "location"]}
//           renderAction={(item) => <ActionButton label={`View details for ${item.name}`} />}
//         />
//       ) : (
//         <DataTable<BeautyProfessional>
//           title="Beauty Professional"
//           columns={beautyProfColumns}
//           data={beautyProfessionals}
//           searchable={true}
//           searchKeys={["name", "email", "location"]}
//           renderAction={(item) => <ActionButton label={`View details for ${item.name}`} />}
//         />
//       )}
//     </div>
//   );
// }
