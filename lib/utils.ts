import { type ClassValue, clsx } from "clsx";
import { CookieValueTypes } from "cookies-next";
import { twMerge } from "tailwind-merge";
import api from "../api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getBalance = async (
  userId: string | undefined,
  cookie: CookieValueTypes | string | undefined
) => {
  if (userId && cookie) {
    try {
      const response = await api.post(
        "/wallet/get",
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const data = await response.data;
      return data;
    } catch (error: any) {
      // @ts-ignore
      return error?.response?.data?.message;
    }
  }
};


// export const getAccountNumber = async () => {
//   try {
//     const response = await api.get("/account/virtual-account");
//     const { data } = await response.data;
//     return data;
//   } catch (error) {
//     // @ts-ignore
//     return error?.response.data.message;
//   }
// };
export const getAccountNumber = async (
  userId: string | undefined,
  cookie: CookieValueTypes | string | undefined
) => {
  if (userId && cookie) {
    try {
      const response = await api.post(
        "/user-account/virtual-account",
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const data = await response.data;
      return data;
    } catch (error: any) {
      // @ts-ignore
      return error?.response?.data?.message;
    }
  }
};

export const getBalanceSA = async (
  userId: string | undefined,
  cookie: CookieValueTypes
) => {
  if (userId && cookie) {
    try {
      const response = await api.post(
        "/south-africa/sa-wallet/get",
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const data = await response.data;
      return data;
    } catch (error: any) {
      // @ts-ignore
      return error?.response?.data?.message;
    }
  }
};

export const getOperators = async () => {
  try {
    const response = await api.get("/paga/get-operators");
    const { data } = await response.data;
    return data.mobileOperator;
  } catch (error) {
    // @ts-ignore
    return error?.response.data.message;
  }
};

export const getOperatorsSA = async () => {
  try {
    const response = await api.post("/south-africa/buy-data/data-providers");
    const { data } = await response.data;
    return data;
  } catch (error) {
    // @ts-ignore
    return error?.response.data.message;
  }
};

export const getTvMerchants = async () => {
  try {
    const response = await api.get("/paga/get-tv-merchants");
    const { data } = await response.data;

    return data;
  } catch (error) {
    // @ts-ignore
    return error?.response.data.message;
  }
};

export const getElectricityMerchants = async () => {
  try {
    const response = await api.get("/paga/get-electricity-merchants");
    const { data } = await response.data;

    return data;
  } catch (error) {
    // @ts-ignore
    return error?.response.data.message;
  }
};

export const getOperatorBundle = async (
  userId: string | undefined,
  operatorCode: string
) => {
  try {
    const response = await api.post("/paga/get-bundle-operators", {
      userId: userId,
      operatorCode: operatorCode,
    });
    const { data } = await response.data;
    return data?.response?.mobileOperatorServices;
  } catch (error: any) {
    // @ts-ignore
    return error?.response?.data.message;
  }
};

export const getMerchantServices = async (
  userId: string | undefined,
  merchantCode: string
) => {
  try {
    const response = await api.post("/paga/get-merchant-services", {
      userId: userId,
      merchantCode: merchantCode,
    });
    const { data } = await response.data;

    return data;
  } catch (error: any) {
    // @ts-ignore
    return error?.response?.data.message;
  }
};

export const getTransactions = async (userId: any) => {
  if (userId) {
    try {
      const response = await api.get(`/transactions/${userId}`);

      const data = await response.data;
      return data;
    } catch (error: any) {
      // @ts-ignore
      return error?.response?.data.message;
    }
  }
};

export const formatMoney = (amount: any, currency = "NGN") => {
  if (!amount) amount = 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
export const formatMoneySA = (amount: any, currency = "ZAR") => {
  if (!amount) amount = 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export function roundToDecimals(n: any, decimals: any) {
  let log10 = n ? Math.floor(Math.log10(n)) : 0,
    div =
      log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

  return Math.round(n * div) / div;
}

export function formatNumber(number: number | string): string {
  const numberString = typeof number === "number" ? number.toString() : number;

  const [integerPart, decimalPart] = numberString.split(".");

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

export const formatHumanReadableDateTime = (dateUTC: number) => {
  const dateObject = new Date(dateUTC);

  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  //@ts-ignore
  return new Intl.DateTimeFormat("en-US", options).format(dateObject);
};

export function convertDateFormatDate(inputDate: string) {
  // Parse the input date string
  const dateObject = new Date(inputDate);

  // Options for formatting the date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Format the date
  //@ts-ignore
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  return formattedDate;
}

export function convertDateFormat(timestamp: string) {
  // Create a Date object from the provided timestamp
  const date = new Date(timestamp);

  // Define month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get components of the date
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Convert hours to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (12:00 AM)

  // @ts-ignore
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Format the result
  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}
