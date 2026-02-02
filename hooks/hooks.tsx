"use client";
import { TabContext } from "@/context/TabContext";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export function useUserContext() {
  return useContext(UserContext);
}
export function useTabContext() {
  return useContext(TabContext);
}
