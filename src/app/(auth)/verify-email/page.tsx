"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";

const OTP_LENGTH = 6;

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputs.current[index - 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setOtp(next);
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (otp.join("").length < OTP_LENGTH)
      return setError("Please enter the full 6-digit OTP.");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/reset-password");
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
        Verify Email
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        {/* OTP boxes */}
        <div
          className='flex justify-center gap-2 sm:gap-3'
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-10 h-10 sm:w-12 sm:h-12 text-center rounded-full border text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition
                ${digit ? "border-teal-400 bg-teal-50" : "border-gray-200 bg-white"}`}
            />
          ))}
        </div>

        {error && <p className='text-xs text-red-500 text-center'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white text-sm font-semibold transition disabled:opacity-60'
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className='text-xs text-gray-400 text-center'>
          Please enter the OTP we have sent you in your email.
        </p>
      </form>
    </AuthLayout>
  );
}
