/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { setUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { saveTokens } from "@/service/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill in all fields.");
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid credentials. Please try again.",
        );
      }

      if (data.success) {
        await saveTokens(data.access);
        localStorage.setItem("access_token", data.access);
        dispatch(
          setUser({
            user: data.user,
            token: data.access,
          }),
        );
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
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
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Email */}
        <div className='relative'>
          <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='email'
            placeholder='Enter your email ...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition'
          />
        </div>

        {/* Password */}
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

        {/* Remember me + Forgot password */}
        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
            <input
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='w-4 h-4 rounded accent-teal-500'
            />
            Remember me
          </label>
          <Link
            href='/forgot-password'
            className='text-sm text-teal-500 hover:underline'
          >
            Forgot password?
          </Link>
        </div>

        {error && <p className='text-xs text-red-500 text-center'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthLayout>
  );
}
