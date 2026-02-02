"use client";
import Image from "next/image";
import Link from "next/link";
import { useTabContext, useUserContext } from "@/hooks/hooks";
import { Button } from "./ui/button";
import { BiSolidDashboard } from "react-icons/bi";
import { useEffect, useState } from "react";
import api from "../api";
import { getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FaSpinner } from "react-icons/fa";
import { getBalance } from "@/lib/utils";
function Navigation() {
  const { user, setUser, setWallet, wallet } = useUserContext();
  const { Tabs, setTabState, tabState } = useTabContext();
  const [toggleNav, setToggleNav] = useState(false);
  const cookies = getCookie("token");
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (user) {
      (async () => {
        const data = await getBalance(user?.id, cookies);
        if (data?.wallet) {
          setWallet(data.wallet);
        }
      })();
    }
  }, [!wallet, user]);

  useEffect(() => {
    if (!user?.email) {
      if (!cookies) {
        if (pathname !== "/login") {
          router.push("/");
        }
        return;
      }
      (async () => {
        try {
          const res = await api.get("/user/persist-user", {
            headers: {
              authorization: `Bearer ${cookies}`,
            },
          });
          const data = await res.data;
          if (data.ok) {
            setUser(data.user);
            if (data.user?.userType === "admin") {
              router.push("/dashboard");
            } else {
              router.push("/home");
            }
          }
        } catch (error: any) {
          if (error.response) {
            setCookie("token", "");
            router.push("/");
          }
        }
      })();
    }
  }, [pathname]);

  return (
    <div className="bg-white shadow-md fixed top-0 left-0 w-full z-40">
      <div className="flex justify-between items-center px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.jpeg" width={150} height={50} alt="logo" />
        </Link>
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex space-x-6 items-center">
            {user?.userType === "user" && (
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-green-500 font-medium"
                >
                  Profile
                </Link>
              </li>
            )}
            {user?.userType === "admin" && (
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-green-500 font-medium"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {user?.email ? (
              <li>
                <button
                  onClick={() => {
                    setUser(null);
                    router.push("/");
                    setCookie("token", "");
                    setTabState(1);
                  }}
                  className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md font-medium"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <div
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition"
                    onClick={() => setLoading(true)}
                  >
                    {loading ? (
                      <FaSpinner className="text-lg animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </div>
                </Link>
              </li>
            )}
          </ul>
          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Profile"
                  className="object-cover"
                />
              </Avatar>
              <div className=" flex flex-col items-start m-2">
                <p className="font-medium text-gray-800 p-0 m-0 space-y-0">{user.fullName}</p>
                <p className="text-sm text-gray-500 m-0">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={() => setToggleNav(!toggleNav)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-2/3 max-w-sm h-full bg-white shadow-md transition-transform transform ${
          toggleNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setToggleNav(false)}
            className="text-gray-600 focus:outline-none mb-4"
          >
            Close
          </button>
          {user && (
            <div className="mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Profile"
                  className="object-cover"
                />
              </Avatar>
              <div className="mt-2">
                <p className="font-medium text-gray-800">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <ul className="space-y-4">
            {user?.userType === "user" && (
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setToggleNav(false)}
                  className="text-gray-800 hover:text-green-500 font-medium"
                >
                  Profile
                </Link>
              </li>
            )}
            {user?.userType === "admin" && (
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setToggleNav(false)}
                  className="text-gray-800 hover:text-green-500 font-medium"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {user?.email ? (
              <li>
                <button
                  onClick={() => {
                    setUser(null);
                    router.push("/");
                    setCookie("token", "");
                    setToggleNav(false);
                  }}
                  className="w-full text-left text-gray-800 hover:text-red-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  onClick={() => setToggleNav(false)}
                  className="text-gray-800 hover:text-green-500 font-medium"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
