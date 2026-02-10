"use client";

import { useState, useEffect } from "react";
import api  from "@/../../api";
// import {UserContext} from "@/context/UserContext"
import {getCookie} from "cookies-next";


export interface WithdrawalResponse {
  status: string; // "success" (The API request status)
  message: string; // "Transfer has been queued"
  reference: string; // Your internal WDR-XXX reference
  data: {
    paystack_status:
      | "success"
      | "pending"
      | "processing"
      | "reviewed"
      | "failed";
    transfer_code: string;
    amount: number;
  };
}

export function useWithdraw() {
  const cookies = getCookie("token");
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);

  useEffect(() => {
    // Fetch banks on mount
    api
      .get("/wallet/banks", {
        headers: { Authorization: `Bearer ${cookies}` },
      })
      .then((res: any) => setBanks(res.data));
  }, []);

  const resolveAccount = async (accountNumber: string, bankCode: string) => {
    const res = await api.post(
      "/wallet/resolve-account",
      {
        account_number: accountNumber,
        bank_code: bankCode,
      },
      {
        headers: { Authorization: `Bearer ${cookies}` },
      },
    );
    console.log(res);
    console.log(res.data);
    return res?.data;
  };

  // const withdraw = async (data: any) => {
  //   console.log("withdrawal cred:", data);
  //   const res = await api.post("/wallet/withdraw", data, {
  //     headers: { Authorization: `Bearer ${cookies}` },
  //   });
  //   console.log("withdrawal response:", res);
  //   return res.data;
  // };

  const withdraw = async (data: any): Promise<WithdrawalResponse> => {
    const res = await api.post<WithdrawalResponse>("/wallet/withdraw", data, {
      headers: { Authorization: `Bearer ${cookies}` },
    });
    console.log("withdrawal response:", res);
    return res.data;
  };
  return { banks, resolveAccount, withdraw };
}




