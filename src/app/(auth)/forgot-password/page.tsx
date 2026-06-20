/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) return setError("Please enter your email address.");
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Please enter a valid email.");
    }

    try {
      const response = await forgotPassword({ email }).unwrap();

      if (response?.success) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setError(
          response?.message || "Something went wrong. Please try again.",
        );
      }
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to send OTP. Please check your connection.",
      );
    }
  }

  return (
    <AuthLayout>
      <h1 className='text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2'>
        <button
          type='button'
          onClick={() => router.back()}
          className='text-gray-400 hover:text-gray-600 transition'
        >
          ←
        </button>
        Forget Password
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Email Input */}
        <div className='relative'>
          <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='email'
            placeholder='Enter your email ...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className='w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition disabled:bg-gray-50'
          />
        </div>

        {error && <p className='text-xs text-red-500 text-center'>{error}</p>}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-3 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white text-sm font-semibold transition disabled:opacity-60'
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </AuthLayout>
  );
}
