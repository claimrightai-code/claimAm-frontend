// "use client";
// import { Dispatch, SetStateAction, createContext, useState } from "react";
// import { LiaGoogleWallet } from "react-icons/lia";
// import { GiSelect } from "react-icons/gi";
// import {
//   MdOutlineWifiTetheringErrorRounded,
//   MdOutlineWifiCalling3,
//   MdElectricBolt,
// } from "react-icons/md";
// import { PiTelevision } from "react-icons/pi";


// import { RiLuggageDepositLine } from "react-icons/ri";
// import {
//   FaExchangeAlt,
//   FaUsers,
//   FaMoneyBillWave,
//   FaWrench,
// } from "react-icons/fa";
// import { IoLogoStackoverflow } from "react-icons/io5";

// import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
// import { FaRegUser } from "react-icons/fa";

// import { JSX } from "react/jsx-runtime";

// interface TabProviderProps {
//   tabState: number;
//   setTabState: Dispatch<SetStateAction<number>>;
//   Tabs: {
//     title: string;
//     path: number;
//     user: string;
//     icon: JSX.Element;
//   }[];
//   ContentComponents: {
//     title: string;
//     path: number;
//     component: JSX.Element;
//   }[];
// }
// interface Props {
//   children: React.ReactNode;
// }

// export const TabContext = createContext({} as TabProviderProps);

// export const TabProvider = ({ children }: Props) => {
//   const [tabState, setTabState] = useState(1);

//   const Tabs = [
//     {
//       title: "Home",
//       path: 1,
//       icon: <GiSelect className="mr-2 h-6 w-6" />,
//       user: "admin",
//     },
//     {
//       title: "Home",
//       path: 1,
//       icon: <GiSelect className="mr-2 h-6 w-6" />,
//       user: "user",
//     },
//     {
//       title: "Profile",
//       path: 13,
//       icon: <FaRegUser className="mr-2 h-6 w-6" />,
//       user: "user",
//     },
//     {
//       title: "Wallet",
//       path: 2,
//       icon: <LiaGoogleWallet className="mr-2 h-6 w-6" />,
//       user: "user",
//     },
//     {
//       title: "Buy Data",
//       path: 3,
//       icon: <MdOutlineWifiTetheringErrorRounded className="mr-2 h-6 w-6" />,
//       user: "user",
//     },
//     {
//       title: "Bank Deposit",
//       path: 7,
//       icon: <RiLuggageDepositLine className="mr-2 h-6 w-6" />,
//       user: "user",
//     },
//     {
//       title: "Buy Airtime",
//       path: 4,
//       icon: <MdOutlineWifiCalling3 className="mr-2 h-6 w-6" />,
//       user: "user",
//     },
//     {
//       title: "Pay Electricity Bill",
//       icon: <MdElectricBolt className="mr-2 h-6 w-6" />,
//       path: 5,
//       user: "user",
//     },
//     {
//       title: "TV BIll",
//       icon: <PiTelevision className="mr-2 h-6 w-6" />,
//       path: 6,
//       user: "user",
//     },
//     {
//       title: "Users",
//       icon: <FaUsers className="mr-2 h-6 w-6" />,
//       path: 9,
//       user: "admin",
//     },

//     {
//       title: "Transactions",
//       icon: <IoLogoStackoverflow className="mr-2 h-6 w-6" />,
//       path: 8,
//       user: "admin",
//     },
//     {
//       title: "Exchange",
//       icon: <FaExchangeAlt className="mr-2 h-6 w-6 " />,
//       path: 10,
//       user: "user",
//     },
//     {
//       title: "Exchange",
//       icon: <FaExchangeAlt className="mr-2 h-6 w-6" />,
//       path: 11,
//       user: "admin",
//     },
//     {
//       title: "Exchange Request",
//       icon: <VscGitPullRequestGoToChanges className="mr-2 h-6 w-6" />,
//       path: 12,
//       user: "admin",
//     },
//     {
//       title: "Airtime Exchange",
//       icon: <FaWrench className="mr-2 h-6 w-6" />,
//       path: 13,
//       user: "admin",
//     },
//     {
//       title: "Airtime Exchange Requests",
//       icon: <FaMoneyBillWave className="mr-2 h-6 w-6" />,
//       path: 14,
//       user: "admin",
//     },
//   ];
//   const ContentComponents = [
//     {
//       title: "Home",
//       path: 1,
//       component: <Home />,
//     },

//     {
//       title: "Transactions",
//       path: 8,
//       component: <Transactions />,
//     },
//     {
//       title: "Users",
//       path: 9,
//       component: <Users />,
//     },

  

   

//     {
//       title: "Airtime Exchange",
//       path: 13,
//       component: <AirtimeExchangeSettings />,
//     },

//     {
//       title: "Airtime Exchange Request",
//       path: 14,
//       component: <AirtimeCash />,
//     },
//   ];

//   return (
//     <TabContext.Provider
//       value={{ ContentComponents, setTabState, Tabs, tabState }}
//     >
//       {children}
//     </TabContext.Provider>
//   );
// };
