"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import {getCookie, setCookie, deleteCookie } from "cookies-next";
import api from "../api";
import { useToast } from "../components/ui/use-toast";
// import { useRouter } from "next/navigation";
import { useTabContext } from "@/hooks/hooks";
import { usePresenceData } from "motion/react";

type Stats = {
  totalNewUsersThisWeek: number;
  totalSuccessfulAirtimeDataTransactions: number;
  totalSuccessfulBillPayTransactions: number;
  totalTransactions: number;
  totalTransactionsThisMonth: number;
  totalUsers: number;
  totalWallets: number;
};
// type DashboardStats = {
//   ok: boolean;
//   wallet_balance: string; // "0.00" comes as a string from Decimal
//   total_referrals: number;
//   active_referrals: number;
//   pending_referrals: number;
// };

type AgentProfile = {
  id: number;
  whatsapp_number: string;
  state: string;
  lga: string;
  shop_address: string;
  landmark: string | null;
  current_business: string;
  daily_traffic_estimate: string;
  referral_code: string;
  status: "pending" | "active" | "suspended" | "rejected";
  naicom_license_id: string | null;
};
type User = {
  id: string;
  email: string;
  full_name: string;
  userName: string;
  phone: number;
  roles: string;
  userType: string;
  isVerified: boolean;
  // stats: Stats | null;
  kyc: boolean;
  // Nested Profile (Null if the user is not an agent)
  agent_profile: AgentProfile | null;

  stats?: DashboardStats | null;
};

type RegisterAgentFunc = {
  fullName: string;
  email: string;
  password: string;
  whatsappNumber: string;
  state: string;
  lga: string;
  shopAddress: string;
  currentBusiness: string; // e.g. "pos_point", "mechanic_workshop"
  dailyTrafficEstimate: string;
  landmark?: string;
  naicomLicenseId?: string;
  referralCode?: string;
};



type InitializeAgentPaymentFunc = {
  ok: boolean;
  message?: string;
  payment_url?: string; // The Paystack checkout URL
  reference?: string; // The unique transaction ref
}

export type Banks = {
  name: string;
  uuid: string;
  interInstitutionCode: string;
  shortCode: string;
};

type Wallet = {
  id: string;
  user: string;
  balance: number;
};

type MobileOperator = {
  name: string;
  mobileOperatorCode: string;
  network: string | null;
  productDescription: string | null;
};

type Merchants = {
  name: string;
  uuid: string;
  displayName: string;
  description: string;
};

type verifyPaymentFunc = {
  ok: boolean;
  message?: string;
  status?: string; // e.g. "active"
}

export const defaultUser = {
  name: null,
  email: null,
  image: undefined,
  id: null,
  tokens: {
    access: null,
    refresh: null,
  },
};


type DashboardStats = {
  wallet_balance: number;
  total_referrals: number;
  active_referrals: number;
  pending_referrals: number;
}

type Transaction = {
  id: number;
  amount: number;
  type: "credit" | "debit";
  description: string;
  status: "success" | "pending" | "failed";
  date: string;
}

type Referral = {
  name: string;
  joined_at: string;
  status: "active" | "pending";
  reward_earned: number;
}

interface UserProviderProps {
  user: User | null;
  wallet: Wallet | null;
  setWallet: Dispatch<SetStateAction<Wallet | null>>;
  // getWalletBalanceFunc:  () => Promise<any>;
  setUser: Dispatch<SetStateAction<User | null>>;
  loginFunc: (params: any) => Promise<any>;
  otpFunc: (params: any) => Promise<any>;
  resendOtpFunc: (params: any) => Promise<any>;
  registerFunc: (params: any) => Promise<any>;
  forgotPasswordFunc: (params: any) => Promise<any>;
  changePasswordFunc: (params: any) => Promise<any>;
  verifyPaymentFunc: (
    reference: string,
    user_id: any,
  ) => Promise<verifyPaymentFunc>;
  setTvMerchants: Dispatch<SetStateAction<Merchants[] | null>>;
  setElectricityMerchants: Dispatch<SetStateAction<Merchants[] | null>>;
  getListofReferrals: () => Promise<any>;
  getAgentDashboardStats: () => Promise<any>;
  getWalletHistory: () => Promise<any>;
  banks: Banks[] | null;
  setBanks: Dispatch<SetStateAction<Banks[] | null>>;
  getBanks: () => Promise<any>;
  registerAgentFunc: (params: RegisterAgentFunc) => Promise<any>;
  initializeAgentPaymentFunc: () => Promise<InitializeAgentPaymentFunc>;
  logoutFunc: () => Promise<void>;
  getLeaderboardApi: () => Promise<any>;
}
interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({} as UserProviderProps);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [operators, setOperators] = useState<MobileOperator[] | null>(null);
  const [tvMerchants, setTvMerchants] = useState<Merchants[] | null>(null);
  const [banks, setBanks] = useState<Banks[] | null>(null);
  const [electricityMerchants, setElectricityMerchants] = useState<
    Merchants[] | null
  >(null);
  const { setTabState } = useTabContext();
  const { toast } = useToast();
  const cookies = getCookie("token");
  // const router = useRouter();

 
 // Helper to extract FastAPI error messages
 const getErrorMessage = (error: any) => {
   const detail = error?.response?.data?.detail;
   if (typeof detail === "string") return detail;
   if (Array.isArray(detail)) return detail[0]?.msg || "Validation error"; // Pydantic validation errors
   return "An unexpected error occurred.";
 };

const logoutFunc = async () => { 
  deleteCookie("token");
  localStorage.removeItem("token");
  setUser(null);
  
  // // If you want to redirect to home immediately
  // window.location.href = "/agent"; 
};
 // 1. LOGIN: Uses FormData (OAuth2 Standard)
const loginFunc = async (params: any) => {
  try {
    const formData = new FormData();
    formData.append("username", params.email);
    formData.append("password", params.password);

    const response = await api.post(`/auth/token`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });


    const data = response.data;

    if (data.access_token) {
      setCookie("token", data.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
      });

      // Fetch User Profile
      const userRes = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      const userData = userRes.data;
      console.log(userData)
      // Default route
      let redirectUrl = "/components/Dashboard";

      // =========================================================
      // 1. CHECK VERIFICATION FIRST
      // =========================================================
      if (userData.is_verified === false) {
        // Redirect to your OTP/Verification page
        // We append email so the verify page knows who to verify
        redirectUrl = `/verify-email?email=${userData.email}`;
        console.log(redirectUrl);
      } else {
        const isAgent = userData.roles.some((r: any) => r.name === "agent");
        const isAdmin = userData.roles.some((r: any) => r.name === "admin");

        if (isAdmin) {
          redirectUrl = "/components/AdminDashboard"; //coming soon
        } else if (isAgent) {
          // Check if they paid/are active
          if (userData.agent_profile?.status !== "active") {
            redirectUrl = `/agent-payment`; // Agent Dashboard
          } else {
            redirectUrl = "/agent"; 
          }
        }
      }

      setUser(userData);
      console.log(redirectUrl)
      return { ok: true, ...userData, redirectUrl: redirectUrl };
    }

    return { ok: false, message: "No token received" };
  } catch (error: any) {
    const msg = getErrorMessage(error);
    toast({
      variant: "destructive",
      title: "Login failed",
      description: msg,
      style: { zIndex: 110000 },
    });
    return { ok: false, message: msg };
  }
};

 // 2. REGISTER: Uses JSON with snake_case
 const registerFunc = async (params: any) => {
   try {
     // Matches UserCreate Schema
     const payload = {
       email: params.email,
       full_name: params.full_name, // Map camelCase -> snake_case
       password: params.password,
       // Only include these if your UserCreate schema allows them, otherwise they might cause 422 errors
       phone_number: params.phone,
       role_name: "user",
       
     };

     const response = await api.post(`/users/`, payload); // Standard REST path
     const data = response.data;

     // FastAPI returns 201 Created on success
     if (response.status === 201) {
      
       toast({
         variant: "default",
         title: "Registration successful",
         description: "Account created! Please check your email for the OTP.",
         style: { zIndex: 110000 },
       });
       return { ok: true, ...data };
     }
   } catch (error: any) {
     const msg = getErrorMessage(error);
     toast({
       variant: "destructive",
       title: "Registration error",
       description: msg,
       style: { zIndex: 110000 },
     });
     return { ok: false, message: msg };
   }
 };


const registerAgentFunc = async (params: any) => {
  try {
    // Map UI camelCase params -> Backend snake_case Schema
    const payload = {
      full_name: params.fullName,
      email: params.email,
      password: params.password,
      whatsapp_number: params.whatsappNumber,
      state: params.state,
      lga: params.lga,
      shop_address: params.shopAddress,
      current_business: params.currentBusiness,
      daily_traffic_estimate: params.dailyTrafficEstimate,
      landmark: params.landmark || null, // Optional
      naicom_license_id: params.naicomLicenseId || null,
      referral_code: params.referralCode || null,
    };
    console.log(payload)
    const response = await api.post(`/agents/register`, payload);
    const data = response.data;
    // console.log(data)
    //  setUser(data);
    // FastAPI returns 201 Created on success
    if (response.status === 201) {
      toast({
        variant: "default",
        title: "Agent Registration successful",
        description: "Account created! Proceeding to payment...",
        style: { zIndex: 110000 },
      });
      return { ok: true, ...data };
    }
  } catch (error: any) {
    const msg = getErrorMessage(error);
    toast({
      variant: "destructive",
      title: "Registration error",
      description: msg,
      style: { zIndex: 110000 },
    });
    return { ok: false, message: msg };
  }
};

// 2. INITIALIZE PAYMENT (Paystack)
const initializeAgentPaymentFunc = async () => {
  try {
    // No params needed here because the Token (Authorization Header)
    // tells the backend who the user is.
    const response = await api.post(`/payments/initialize`);

    const data = response.data;

    // Backend returns { "payment_url": "https://checkout.paystack..." }
    if (data.payment_url) {
      return { ok: true, ...data };
    }

    return { ok: false, message: "Could not generate payment link" };
  } catch (error: any) {
    const msg = getErrorMessage(error);
    toast({
      variant: "destructive",
      title: "Payment Initialization Failed",
      description: msg,
      style: { zIndex: 110000 },
    });
    return { ok: false, message: msg };
  }
};

const verifyPaymentFunc = async (
  reference: string,
  user_id: any
) => {
  try {
    // We send the reference to the backend to confirm valid payment
    const response = await api.get(`/payments/verify/${user_id}/${reference}`, {
        headers: { Authorization: `Bearer ${cookies}` },
      });

    // Backend returns { status: "active", ... }
    if (response.data.status === "success") {
      return { ok: true, ...response.data };
    }

    return { ok: false, message: "Payment verification failed" };
  } catch (error: any) {
    const msg = getErrorMessage(error);
    return { ok: false, message: msg };
  }
};

 // 3. OTP: Uses verify-email endpoint
 const otpFunc = async (params: any) => {
   try {
     // Matches VerifyOtpRequest Schema
     const response = await api.post(`/auth/verify-email`, {
       email: params.email,
       otp_code: params.otp.toString(), // Schema expects 'otp_code'
     });
    console.log(response)
     const data = response.data;
     return { ok: true, ...data };
   } catch (error: any) {
     const msg = getErrorMessage(error);
     toast({
       variant: "destructive",
       title: "Verification failed",
       description: msg,
       style: { zIndex: 110000 },
     });
     return { ok: false, message: msg };
   }
 };

 // 4. FORGOT PASSWORD
 const forgotPasswordFunc = async (params: any) => {
   try {
     const response = await api.post(`/auth/forgot-password`, {
       email: params.email,
     });

     const data = response.data;

     toast({
       variant: "default",
       title: "Check your email",
       description: "An OTP has been sent to your inbox.",
       style: { zIndex: 110000 },
     });

     return { ok: true, ...data };
   } catch (error: any) {
     const msg = getErrorMessage(error);
     toast({
       variant: "destructive",
       title: "Request failed",
       description: msg,
       style: { zIndex: 110000 },
     });
     return { ok: false, message: msg };
   }
 };

 // 5. CHANGE PASSWORD (RESET)
 const changePasswordFunc = async (params: any) => {
   try {
     const response = await api.post(`/auth/reset-password`, {
       email: params.email,
       otp_code: params.otp.toString(),
       new_password: params.new_password, // map newPassword -> new_password
     });

     const data = response.data;

     toast({
       variant: "default",
       title: "Password updated",
       description: "You can now login with your new password.",
       style: { zIndex: 110000 },
     });

     return { ok: true, ...data };
   } catch (error: any) {
     const msg = getErrorMessage(error);
     toast({
       variant: "destructive",
       title: "Update failed",
       description: msg,
       style: { zIndex: 110000 },
     });
     return { ok: false, message: msg };
   }
 };
  const getBanks = async () => {
    try {
      const res = await api.get("/paga/get-banks");
      const { response } = await res.data;
      setBanks(response.banks);
    } catch (error: any) {
      return error?.response?.data?.message;
    }
  };

const resendOtpFunc = async (params: any) => {
  try{
       const response = await api.post(`/auth/resend-otp?email=${params.email}`);
       console.log(response)
       return {ok: true, message: response.data.message}
  } catch(error:any){
    const msg = getErrorMessage(error)
    return {ok: false, message: msg};
  }
}




const getAgentDashboardStats = async () => {
  try {
    const response = await api.get(`/dashboard/stats`, {
      headers: { Authorization: `Bearer ${cookies}` },
    });
    console.log(response)
      return { ok: true, ...response.data };
  } catch (error: any) {
    const msg = getErrorMessage(error);
    return { ok: false, message: msg };
  }
};

const getWalletHistory = async () => {
   try {
     const response = await api.get(`/dashboard/transactions`, {
       headers: { Authorization: `Bearer ${cookies}` },
     });
     return { ok: true, ...response.data };
   } catch (error: any) {
     const msg = getErrorMessage(error);
     return { ok: false, message: msg };
   }
}


const getListofReferrals = async () => {
  const res = await api.get("/dashboard/referrals");
  return res.data
}

const getLeaderboardApi = async () => {
  const res = await api.get("/agents/leaderboard");
  return res.data;
};


  return (
    <UserContext.Provider
      value={{
       getAgentDashboardStats,
       getWalletHistory,
       getLeaderboardApi,
       getListofReferrals,
        setElectricityMerchants,
        verifyPaymentFunc,
        setTvMerchants,
        logoutFunc,
        registerFunc,
        resendOtpFunc,
        banks,
        setBanks,
        user,
        loginFunc,
        wallet,
        setWallet,
        setUser,
        getBanks,
        changePasswordFunc,
        otpFunc,
        forgotPasswordFunc,
        registerAgentFunc, 
        initializeAgentPaymentFunc
       // getWalletBalanceFunc
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
