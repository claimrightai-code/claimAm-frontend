import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/../../components/ui/popover";
import { useUserContext } from "@/hooks/hooks";
import { Button } from "./ui/button";
import api from "../api";
import { FaSpinner } from "react-icons/fa";

interface Accounts {
  bankName: string;
  accountNumber: number;
  accountName: string;
  _id: string;
}
type Exchange = {
  _id: string;
  currency: string;
  type: string;
  image: string;
};

type Fee = {
  _id: string;
  firstPair: Exchange;
  secondPair: Exchange;
  fee: string;
};

interface ExchangeRate {
  fees: Fee[];
  exchanges: Exchange[];
  _id: string;
}

export default function ExchangeRates() {
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [account, setAccount] = useState<Accounts | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currencyName, setCurrencyName] = useState("");
  const { user } = useUserContext();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate | null>(null);

  const getExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/exchange/get-exchanges`);
      const data: ExchangeRate = await response.data[0];
      setExchangeRates(data);
      setLoading(false);
      //@ts-ignore
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getExchangeRates();
  }, []);

  const deleteAccount = async () => {
    try {
      setDeleteLoading(true);
      const response = await api.post(
        `/account/delete-account/${account?._id}`,
        {
          userId: user?.id,
        }
      );

      const data = await response.data;
      setDeleteLoading(false);
      setDeleteModal(false);
      getAccounts();
    } catch (error) {
      setDeleteLoading(false);
      console.log({ error });
    }
  };
  const addAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setAddLoading(true);
      const response = await api.post(`/account/add-account`, {
        userId: user?.id,
        accountName: accountName,
        accountNumber: bankName,
        bankName: bankName,
        currency: currencyName,
      });

      const data = await response.data;
      setAddLoading(false);
      setAccountName("");
      setAccountNumber("");
      setBankName("");
      getAccounts();
    } catch (error) {
      setAddLoading(false);
      console.log({ error });
    }
  };

  const getAccounts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/account/get-accounts`);
      const data: Accounts[] = await response.data;
      setAccounts(data);
      setLoading(false);
      //@ts-ignore
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const handleCurrencyName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyName(event.target.value);
  };
  return (
    <>
      <h2 className='font-bold text-lg pb-4 mb-10 lg:mt-24 sm:mt-8'>Bank Account</h2>

      {deleteModal && (
        <div
          style={{ zIndex: 1000 }}
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'
        >
          <div className='modal-box'>
            <button
              onClick={() => setDeleteModal(false)}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
            <h3 className='font-bold text-xl'>Delete</h3>
            <p>
              Are you sure you want to delete this account details. this cannot
              be undone.
            </p>

            <div className='flex items-center gap-4 justify-stretch'>
              <Button
                variant={"outline"}
                className='mt-4 w-full'
                onClick={() => {
                  setDeleteModal(false);
                }}
              >
                Cancel Delete
              </Button>
              <Button
                variant={"destructive"}
                className='mt-4 w-full'
                onClick={() => {
                  deleteAccount();
                }}
              >
                {deleteLoading ? (
                  <FaSpinner className='text-lg animate-spin text-white' />
                ) : (
                  "Delete Exchange Rate"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className='bg-white mt-2 rounded-xl p-4 grid '>
        <div className=''>
          {loading ? (
            <div className=''>
              <FaSpinner className='text-lg animate-spin text-white' />
            </div>
          ) : (
            <>
              <h2 className="text-md">Available Accounts</h2>
              {accounts?.map((item, id) => (
                <div
                  key={id}
                  className='text-sm flex justify-between items-center gap-4 bg-white p-3 rounded-lg my-3 border'
                >
                  <div className=''>
                    <p>{item.bankName}</p>
                    <p className=''>{item.accountName}</p>
                    <p className='mb-3 md:ml-0 md:mb-0'>
                      Account number: {item.accountNumber}
                    </p>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <div className='cursor-pointer bounce p-3 bg-gray-200 rounded-full'>
                        <BsThreeDotsVertical />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col gap-4'>
                      <Button
                        onClick={() => {
                          setDeleteModal(true);
                          setAccount(item);
                        }}
                        className='bounce'
                        variant={"destructive"}
                      >
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </>
          )}
          <h2 className='my-4 pb-4 font-bold text-xl mt-7 border-b'>
            Add Bank Account
          </h2>
          <form className='flex items-center'>
            <div className='flex-1 items-center gap-4'>
              <select
                value={currencyName}
                onChange={handleCurrencyName}
                required
                className='select select-none mb-2 w-full bg-gray-100 rounded-md outline outline-gray-200'
              >
                <option defaultChecked>Select currency</option>
                {exchangeRates?.exchanges
                  ?.filter((item) => item.type === "money")
                  .map((rate) => (
                    <option key={rate._id} value={rate.currency}>
                      {rate.currency}
                    </option>
                  ))}
              </select>
              <input
                placeholder='Enter Bank Name'
                type='text'
                value={bankName}
                onChange={(e) => {
                  setBankName(e.target.value);
                }}
                className={`p-2 border mb-2 my-2 rounded-lg bg-gray-100 text-black w-full`}
                required
              />
              <input
                placeholder='Enter Account Name'
                type='text'
                value={accountName}
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
                className={`p-2 border mb-2 rounded-lg bg-gray-100 text-black w-full`}
                required
              />
              <input
                placeholder='Enter Account Number'
                required
                type='text'
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                }}
                className={`p-2 border rounded-lg bg-gray-100 text-black w-full`}
              />
            </div>
            <div className='ml-3 bounce'>
              <Button
                variant={"outline"}
                className='text-black'
                type='submit'
                onClick={(e) => {
                  if (!bankName) {
                    return;
                  }
                  if (!accountName) {
                    return;
                  }

                  addAccount(e);
                }}
              >
                {addLoading ? (
                  <FaSpinner className='text-lg animate-spin text-white' />
                ) : (
                  "Add Account"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className=''></div>
      </div>
    </>
  );
}
