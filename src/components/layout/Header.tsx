"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ConfirmModal from "../modal/LogoutModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { getImageURL } from "@/lib/getImageURL";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  console.log({ user });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogoutConfirm() {
    try {
      // 2. Clear tokens/localstorage if you're managing them there
      localStorage.removeItem("access_token");
      sessionStorage.clear();

      // 3. Show a friendly success notification
      toast.success("Logged out successfully");

      // 4. Redirect the admin back to the login screen
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Something went wrong during logout. Please try again.");
    }
  }

  return (
    <header className='sticky top-0 z-30 bg-white border border-gray-100 rounded-xl mx-0 mb-5 shadow-sm'>
      <div className='flex items-center justify-between px-5 py-4'>
        {/* Left: Hamburger + Welcome */}
        <div className='flex items-center gap-4'>
          <button
            onClick={onMenuToggle}
            className='lg:hidden p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
            aria-label='Toggle menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          <div>
            <h1 className='text-lg font-semibold text-gray-800'>
              Welcome, {user?.full_name || ""}
            </h1>
            <p className='text-sm text-gray-400'>Have a nice day</p>
          </div>
        </div>

        {/* Right: Notification + Profile */}
        <div className='flex items-center gap-3'>
          {/* Notification bell */}
          <Link
            href='/notifications'
            className='relative p-2 rounded-lg hover:bg-gray-50 transition-colors'
            aria-label='Notifications'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
            <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-[#2BBFBF] rounded-full' />
          </Link>

          {/* Profile dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
            >
              <div className='w-9 h-9 rounded-full bg-[#E8F8F8] overflow-hidden flex items-center justify-center'>
                {user?.image ? (
                  <Image
                    src={getImageURL(user.image)}
                    alt={user.full_name}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    priority
                    unoptimized
                  />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-[#2BBFBF]'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                )}
              </div>
              <span className='text-sm font-medium text-gray-800 hidden sm:block'>
                {user?.full_name || ""}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50'>
                <Link
                  href='/setting/personal-information'
                  className='flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition-colors'
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4'
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
                  My Profile
                </Link>
                <Link
                  href='/setting'
                  className='flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition-colors'
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  Settings
                </Link>
                <hr className='my-1 border-gray-100' />
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setLogoutModalOpen(true);
                  }}
                  className='flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Reusable Modal */}
      <ConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title='Log Out of SalonSeat?'
        message='Are you sure you want to log out of your admin dashboard account?'
        confirmText='Log Out'
        variant='danger'
      />
    </header>
  );
}
