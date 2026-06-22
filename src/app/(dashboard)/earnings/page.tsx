"use client";

import React, { useState } from "react";
import {
  X,
  Search,
  DollarSign,
  Users,
  Calendar,
  ShieldCheck,
  Mail,
  CreditCard,
  Hash,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetEarningsQuery } from "@/redux/features/earning/earningAPI";

export interface EarningsMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  per_page: number;
}

export interface EarningItem {
  id: number;
  user: number;
  user_email: string;
  user_name: string;
  plan: number;
  stripe_session_id: string;
  stripe_payment_intent_id: string;
  paid_ammount: string;
  expire_date: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  meta: EarningsMeta;
  data: EarningItem[];
}

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState<EarningItem | null>(
    null,
  );
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: responseBody, isLoading } = useGetEarningsQuery({
    search,
    page,
  });

  const backendData = responseBody?.data || [];
  const backendMeta = responseBody?.meta;

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className='min-h-screen bg-slate-50 text-slate-800 flex antialiased'>
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* TOP METRIC DISPLAY CARDS */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4'>
              <div className='p-3 bg-emerald-50 text-emerald-600 rounded-xl'>
                <DollarSign size={22} />
              </div>
              <div>
                <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>
                  Current Page Revenue
                </p>
                <p className='text-xl font-bold text-slate-990'>
                  $
                  {(
                    backendData.reduce(
                      (sum: number, entry: EarningItem) =>
                        sum + parseFloat(entry.paid_ammount),
                      0,
                    ) || 0
                  ).toFixed(2)}
                </p>
              </div>
            </div>

            <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4'>
              <div className='p-3 bg-indigo-50 text-indigo-600 rounded-xl'>
                <Users size={22} />
              </div>
              <div>
                <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>
                  Total Actions
                </p>
                <p className='text-xl font-bold text-slate-900'>
                  {backendMeta?.total_items || 0} Records
                </p>
              </div>
            </div>

            <div className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm sm:col-span-2 lg:col-span-1 flex items-center space-x-4'>
              <div className='p-3 bg-amber-50 text-amber-600 rounded-xl'>
                <Calendar size={22} />
              </div>
              <div>
                <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider'>
                  Pagination Page
                </p>
                <p className='text-xl font-bold text-slate-900'>
                  {backendMeta?.current_page || 1} of{" "}
                  {backendMeta?.total_pages || 1}
                </p>
              </div>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className='bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden'>
            <div className='px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white'>
              <h2 className='text-xl font-semibold text-[#1e293b] self-start sm:self-center tracking-tight'>
                Earnings
              </h2>

              <form
                onSubmit={handleSearchSubmit}
                className='flex items-center w-full sm:w-auto border border-slate-300 rounded-md bg-white overflow-hidden shadow-sm max-w-xs'
              >
                <input
                  type='text'
                  placeholder='Search...'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className='px-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none w-full bg-white'
                />
                <button
                  type='submit'
                  className='bg-[#00b2c2] hover:bg-[#0092a1] transition-colors p-2 text-white flex items-center justify-center shrink-0'
                >
                  <Search size={14} strokeWidth={2.5} />
                </button>
              </form>
            </div>

            {isLoading ? (
              <div className='p-12 text-center text-sm text-slate-400'>
                Evaluating dataset contents...
              </div>
            ) : responseBody?.success && backendData.length > 0 ? (
              <>
                {/* DESKTOP TABLE */}
                <div className='hidden md:block overflow-x-auto'>
                  <table className='w-full text-left border-collapse'>
                    <thead>
                      <tr className='bg-[#00b2c2] text-white text-[13px] font-medium tracking-wide'>
                        <th className='px-6 py-3.5 text-center font-semibold'>
                          #Tr.ID
                        </th>
                        <th className='px-6 py-3.5 font-semibold'>User Name</th>
                        <th className='px-6 py-3.5 font-semibold'>
                          User Email
                        </th>
                        <th className='px-6 py-3.5 font-semibold'>Amount</th>
                        <th className='px-6 py-3.5 font-semibold'>Date</th>
                        <th className='px-6 py-3.5 text-center font-semibold'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-200 text-slate-700 text-[13px] font-normal'>
                      {backendData.map((item: EarningItem) => (
                        <tr
                          key={item.id}
                          className='hover:bg-slate-50/60 transition'
                        >
                          <td className='px-6 py-4.5 text-center text-slate-600 font-medium'>
                            #{item.id}
                          </td>
                          <td className='px-6 py-4.5 text-[#1e293b] font-normal'>
                            {item.user_name}
                          </td>
                          <td className='px-6 py-4.5 text-slate-600 font-mono'>
                            {item.user_email}
                          </td>
                          <td className='px-6 py-4.5 text-slate-700 font-medium'>
                            ${parseFloat(item.paid_ammount).toFixed(2)}
                          </td>
                          <td className='px-6 py-4.5 text-slate-600'>
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                          <td className='px-6 py-4.5 text-center'>
                            <button
                              onClick={() => setSelectedEarning(item)}
                              className='text-slate-400 hover:text-slate-700 transition inline-flex p-1 rounded-full hover:bg-slate-100'
                              title='Inspect Details'
                            >
                              <Info size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARDS */}
                <div className='block md:hidden divide-y divide-slate-100 border-t border-slate-100'>
                  {backendData.map((item: EarningItem) => (
                    <div key={item.id} className='p-4 space-y-4 bg-white'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <h3 className='font-semibold text-[#1e293b] text-sm'>
                            {item.user_name}
                          </h3>
                          <p className='text-xs text-slate-400 font-mono mt-0.5'>
                            {item.user_email}
                          </p>
                        </div>
                        <span className='text-sm font-bold text-slate-900'>
                          ${parseFloat(item.paid_ammount).toFixed(2)}
                        </span>
                      </div>

                      <div className='flex items-center justify-between pt-1 text-xs'>
                        <span className='text-slate-500 font-medium'>
                          Date: {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => setSelectedEarning(item)}
                          className='text-[#00b2c2] font-semibold flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded border border-slate-200'
                        >
                          <Info size={14} />
                          <span>View Entry Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {backendMeta && (
                  <div className='px-6 py-4 bg-white border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs'>
                    <p className='text-slate-500 text-center sm:text-left'>
                      Showing{" "}
                      <span className='font-semibold text-slate-800'>
                        {Math.min(
                          backendMeta.total_items,
                          (backendMeta.current_page - 1) *
                            backendMeta.per_page +
                            1,
                        )}
                      </span>{" "}
                      to{" "}
                      <span className='font-semibold text-slate-800'>
                        {Math.min(
                          backendMeta.total_items,
                          backendMeta.current_page * backendMeta.per_page,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className='font-semibold text-slate-800'>
                        {backendMeta.total_items}
                      </span>{" "}
                      matching logs
                    </p>

                    <div className='flex items-center space-x-1.5'>
                      <button
                        type='button'
                        onClick={() =>
                          handlePageChange(backendMeta.current_page - 1)
                        }
                        disabled={!backendMeta.previous}
                        className={`p-2 rounded border border-slate-200 transition flex items-center justify-center ${
                          !backendMeta.previous
                            ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                            : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <ChevronLeft size={14} />
                      </button>

                      {Array.from(
                        { length: backendMeta.total_pages },
                        (_, i) => i + 1,
                      ).map((pageNum) => (
                        <button
                          key={pageNum}
                          type='button'
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1.5 rounded border transition text-xs font-medium ${
                            backendMeta.current_page === pageNum
                              ? "bg-[#00b2c2] text-white border-[#00b2c2] shadow-sm"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        type='button'
                        onClick={() =>
                          handlePageChange(backendMeta.current_page + 1)
                        }
                        disabled={!backendMeta.next}
                        className={`p-2 rounded border border-slate-200 transition flex items-center justify-center ${
                          !backendMeta.next
                            ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                            : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className='p-12 text-center text-sm text-slate-400'>
                Zero query items match selection arguments.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {selectedEarning && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in'>
          <div className='bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl border border-slate-100'>
            <div className='px-6 py-4 bg-slate-50 border-b border-slate-150 flex items-center justify-between'>
              <div className='flex items-center space-x-2 text-slate-900 font-bold text-sm'>
                <ShieldCheck className='text-emerald-500' size={18} />
                <span>Audit Context Ledger</span>
              </div>
              <button
                onClick={() => setSelectedEarning(null)}
                className='text-slate-400 hover:text-slate-700 p-1.5 hover:bg-slate-200/60 rounded-lg transition'
              >
                <X size={16} />
              </button>
            </div>

            <div className='p-6 space-y-4 text-xs text-slate-600 max-h-[80vh] overflow-y-auto'>
              <div className='flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl'>
                <div className='w-9 h-9 bg-[#00b2c2]/10 text-[#00b2c2] font-bold rounded-lg flex items-center justify-center text-xs'>
                  {selectedEarning.user_name.charAt(0)}
                </div>
                <div>
                  <h4 className='text-slate-950 font-bold text-sm'>
                    {selectedEarning.user_name}
                  </h4>
                  <div className='text-slate-400 flex items-center space-x-1 font-mono text-[11px] mt-0.5'>
                    <Mail size={12} />
                    <span>{selectedEarning.user_email}</span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='p-3 border border-slate-100 rounded-xl space-y-1'>
                  <span className='text-slate-400 block text-[10px] font-semibold uppercase tracking-wider'>
                    Database ID
                  </span>
                  <div className='font-mono font-bold text-slate-800 text-xs flex items-center space-x-1'>
                    <Hash size={12} className='text-slate-400' />
                    <span>{selectedEarning.id}</span>
                  </div>
                </div>
                <div className='p-3 border border-slate-100 rounded-xl space-y-1'>
                  <span className='text-slate-400 block text-[10px] font-semibold uppercase tracking-wider'>
                    Plan Assignment
                  </span>
                  <span className='font-bold text-slate-800 text-xs'>
                    Tier Level {selectedEarning.plan}
                  </span>
                </div>
              </div>

              <div className='p-3 border border-slate-100 rounded-xl space-y-2'>
                <span className='text-slate-400 block text-[10px] font-semibold uppercase tracking-wider'>
                  Financial Remittance Summary
                </span>
                <div className='flex justify-between items-baseline'>
                  <span className='text-slate-500'>
                    Gross Capturable Capital:
                  </span>
                  <span className='font-bold text-slate-900 text-sm'>
                    ${parseFloat(selectedEarning.paid_ammount).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className='p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100 font-mono text-[11px]'>
                <div>
                  <span className='text-slate-400 block text-[9px] uppercase font-sans font-bold tracking-wider mb-0.5'>
                    Stripe Session Hash
                  </span>
                  <div className='break-all text-slate-600 bg-white p-1.5 rounded border border-slate-200/60 flex items-start space-x-1'>
                    <CreditCard
                      size={12}
                      className='text-slate-400 mt-0.5 shrink-0'
                    />
                    <span>{selectedEarning.stripe_session_id}</span>
                  </div>
                </div>
                <div>
                  <span className='text-slate-400 block text-[9px] uppercase font-sans font-bold tracking-wider mb-0.5'>
                    Payment Intent Sequence
                  </span>
                  <div className='break-all text-slate-600 bg-white p-1.5 rounded border border-slate-200/60 flex items-start space-x-1'>
                    <CreditCard
                      size={12}
                      className='text-slate-400 mt-0.5 shrink-0'
                    />
                    <span>{selectedEarning.stripe_payment_intent_id}</span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-[11px]'>
                <div className='flex justify-between sm:block border-b sm:border-0 border-slate-100 pb-1.5 sm:pb-0'>
                  <span className='text-slate-400 block'>
                    System Log Creation:
                  </span>
                  <span className='font-medium text-slate-700'>
                    {new Date(selectedEarning.created_at).toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between sm:block'>
                  <span className='text-slate-400 block'>
                    Subscription Expiry:
                  </span>
                  <span className='text-amber-700 font-semibold'>
                    {new Date(selectedEarning.expire_date).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className='px-6 py-3 bg-slate-50 border-t border-slate-150 flex justify-end'>
              <button
                onClick={() => setSelectedEarning(null)}
                className='bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition'
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
