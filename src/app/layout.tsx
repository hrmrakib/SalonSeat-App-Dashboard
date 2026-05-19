import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/features/Providers";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SalonSeat - Admin Dashboard",
  description:
    "SalonSeat admin dashboard for managing salon owners, beauty professionals, listings, and earnings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${poppins.variable} h-full antialiased`}>
      <Providers>
        <Toaster />
        <body className={`${poppins.className} min-h-full bg-gray-50`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
