"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!password || !confirm) return setError("Please fill in all fields.");
    if (password.length < 8 || password.length > 10)
      return setError("Password must be 8–10 characters long.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/login");
  }

  return (
    <AuthLayout>
      <h1 className='text-2xl font-bold text-gray-800 text-center mb-1 flex items-center justify-center gap-2'>
        <button
          type='button'
          onClick={() => router.back()}
          className='text-gray-400 hover:text-gray-600 transition'
        >
          ←
        </button>
        Verify Email
      </h1>
      <p className='text-xs text-gray-400 text-center mb-6'>
        Your password must be 8–10 character long.
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* New password */}
        <div className='relative'>
          <KeyRound className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full pl-11 pr-11 py-3 rounded-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition'
          >
            {showPassword ? (
              <Eye className='w-4 h-4' />
            ) : (
              <EyeOff className='w-4 h-4' />
            )}
          </button>
        </div>

        {/* Confirm password */}
        <div className='relative'>
          <KeyRound className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder='Re-type Password'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className='w-full pl-11 pr-11 py-3 rounded-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition'
          />
          <button
            type='button'
            onClick={() => setShowConfirm(!showConfirm)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition'
          >
            {showConfirm ? (
              <Eye className='w-4 h-4' />
            ) : (
              <EyeOff className='w-4 h-4' />
            )}
          </button>
        </div>

        {error && <p className='text-xs text-red-500 text-center'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white text-sm font-semibold transition disabled:opacity-60'
        >
          {loading ? "Saving..." : "Confirm"}
        </button>
      </form>
    </AuthLayout>
  );
}
