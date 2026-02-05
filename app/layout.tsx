import "./globals.css";
// import "swiper/css";
// ... keep other css imports if needed

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // <--- Import this
import { Toaster } from "@/../../components/ui/toaster"; // Adjusted path to shadcn
// Make sure these providers exist and have 'use client' at the top of their files!
import { AuthProvider } from "../context/AuthState";
import { UserProvider } from "../context/UserContext";
import QueryProvider from "../context/UseQueryProvider"
// import { TabProvider } from "../context/TabContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClaimAm - Insurance",
  description: "ClaimAm | Claim an insurance within minutes",
  // Favicon for browser tab
  icons: {
    icon: "/assets/images/favicon.ico",
  },
  // 1. FIX: Move Google Verification here
  verification: {
    google: "sR4xvVlGTHrlKdNgeT9wxmgal1nfyfp_PbmDD6QSqOc",
  },
  other: {
    cryptomus: "3c8c3dbe",
    keywords: "insurance claim app,Ai insurance app...",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 2. FIX: Remove <head> tag completely. Next.js handles it. */}

      <body className={inter.className}>
        <UserProvider>
          {/* <TabProvider> */}
            <AuthProvider>
              <QueryProvider>
              <main className="">{children}</main>
              </QueryProvider>
            </AuthProvider>
            <Toaster />
          {/* </TabProvider> */}
        </UserProvider>

      
      </body>
    </html>
  );
}
