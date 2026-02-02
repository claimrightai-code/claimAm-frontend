"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/hooks";
import api from "../api";
// @ts-ignore
import Dojah from "react-dojah";
import { useRouter } from "next/navigation";
import { useToast } from "@/../../components/ui/use-toast";
import { getCookie, setCookie } from "cookies-next";

interface KycProps {
  id: string;
  first_name: string;
  last_name: string;
}

const Kyc: React.FC<{ userdata: string }> = ({ userdata }) => {
  const appID = process.env.NEXT_PUBLIC_APP_ID!;
  const publicKey = process.env.NEXT_PUBLIC_KYC_KEY!;
  const type = "liveness";

  const { user } = useUserContext(); // Get user from context
  const [client, setClient] = useState<KycProps | null>(null);
  const cookies = getCookie("token");
  const router = useRouter();
  const { toast } = useToast();
  const [showDojah, setShowDojah] = useState(true);

  // Update client details when `user` or `userdata` changes
  useEffect(() => {
    if (user) {
      const [first_name, last_name] = userdata?.split(" ") || ["", ""];
      setClient({
        id: user?.id || "",
        first_name: first_name || "",
        last_name: last_name || "",
      });
    } else {
      const [first_name, last_name] = userdata?.split(" ") || ["", ""];
      setClient({
        id: "",
        first_name: first_name || "",
        last_name: last_name || "",
      });
    }
  }, [user, userdata]);

  const config = {
    debug: true,
    pages: [
      {
        page: "government-data",
        config: {
          bvn: true,
          nin: true,
          dl: false,
          mobile: false,
          otp: false,
          selfie: true,
        },
      },
      { page: "selfie" },
      { page: "id", config: { passport: false, dl: true } },
    ],
  };

  const metadata = {
    user_id: userdata || null,
  };

  const handleResponse = async (type: string, data: string) => {
    if (type === "success") {
      if (!client?.id) {
        console.error("User ID is undefined. Cannot verify KYC.");
        return;
      }

      try {
        const response = await api.post(
          "/kyc/submit",
          { userId: client.id || user?.id },
          {
            headers: {
              authorization: `Bearer ${cookies}`,
            },
          }
        );
        
        if (response.status === 200) {
          toast({
            variant: "default",
            title: "Verification Successful",
            description: response.data.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error Submitting KYC",
          description: error?.response?.data?.message || error.message,
        });
      }
    } else if (type === "error") {
      toast({
        variant: "destructive",
        title: "Complete KYC",
        description: "Please complete your KYC to access your wallet and transactions.",
      });
      setCookie("token", "");
      router.push("/");
    } else if (type === "close") {
        window.location.href = "/login";
    } else if (type === "begin") {
    } else if (type === "loading") {
    }
  };

  return (
    <>
      {showDojah && (
        <Dojah
          response={handleResponse}
          appID={appID}
          publicKey={publicKey}
          type={type}
          config={config}
          userData={metadata}
          metadata={metadata}
        />
      )}
    </>
  );
};

export default Kyc;
