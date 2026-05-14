"use client";

import React from "react";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { earningTransactions } from "@/lib/data";
import type { EarningTransaction } from "@/lib/types";

const earningsColumns: Column<EarningTransaction>[] = [
  { key: "transactionId", header: "#Tr.ID", accessor: "transactionId" },
  { key: "userName", header: "User Name", accessor: "userName" },
  { key: "subscription", header: "Subscription", accessor: "subscription" },
  { key: "amount", header: "Amount", accessor: "amount" },
  { key: "date", header: "Date", accessor: "date" },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <DataTable<EarningTransaction>
        title="Earnings"
        columns={earningsColumns}
        data={earningTransactions}
        searchable={true}
        searchKeys={["userName", "subscription"]}
        renderAction={(item) => (
          <button
            className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label={`View transaction for ${item.userName}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-[#2BBFBF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      />
    </div>
  );
}
