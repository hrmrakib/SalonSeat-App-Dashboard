import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex'>
      {/* Left — white panel with logo (hidden on mobile) */}
      <div className='hidden md:flex w-1/2 bg-white items-center justify-center'>
        <BrandLogo />
      </div>

      {/* Right — mint panel */}
      <div className='flex-1 flex items-center justify-center min-h-screen bg-linear-to-br from-teal-50 to-cyan-100 px-4 py-16 relative'>
        {/* Mobile logo */}
        <div className='absolute top-6 left-6 md:hidden'>
          <BrandLogo size={52} />
        </div>

        {/* Card */}
        <div className='w-full max-w-md bg-white rounded-2xl border border-teal-100 shadow-sm p-8'>
          {children}
        </div>
      </div>
    </div>
  );
}

function BrandLogo({ size = 110 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 110 120'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22 18 Q72 18 72 42 Q72 62 22 62'
        stroke='#17C4C4'
        strokeWidth='13'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M22 62 Q72 62 72 86 L72 98'
        stroke='#17C4C4'
        strokeWidth='13'
        strokeLinecap='round'
        fill='none'
      />
      <line
        x1='14'
        y1='98'
        x2='84'
        y2='98'
        stroke='#17C4C4'
        strokeWidth='13'
        strokeLinecap='round'
      />
      <line
        x1='28'
        y1='98'
        x2='28'
        y2='112'
        stroke='#17C4C4'
        strokeWidth='13'
        strokeLinecap='round'
      />
      <line
        x1='72'
        y1='98'
        x2='72'
        y2='112'
        stroke='#17C4C4'
        strokeWidth='13'
        strokeLinecap='round'
      />
    </svg>
  );
}
