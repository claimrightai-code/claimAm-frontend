"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AgentSearchParams({
  onOpenLogin,
}: {
  onOpenLogin: (email?: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const action = searchParams?.get("action");
    const email = searchParams?.get("email") || "";

    if (action === "login") {
      onOpenLogin(email);

      if (typeof window !== "undefined" && window.history?.replaceState) {
        window.history.replaceState(null, "", "/agent");
      }
    }
  }, [searchParams, onOpenLogin]);

  return null;
}
