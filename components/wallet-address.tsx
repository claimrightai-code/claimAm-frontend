"use client";
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

interface Address {
  currency: string;
  walletAddress: number;
  network: string;
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

export default function CoinAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currency, setCurrency] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const deleteAddress = async () => {
    try {
      setDeleteLoading(true);
      const response = await api.post(
        `/coin-address/delete-coin-address/${address?._id}`,
        {
          userId: user?.id,
        }
      );

      const data = await response.data;
      setDeleteLoading(false);
      setDeleteModal(false);
      getCoinAddresses();
    } catch (error) {
      setDeleteLoading(false);
      console.log({ error });
    }
  };
  const addCoinAddress = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setAddLoading(true);
      const response = await api.post(`/coin-address/add-coin-address`, {
        userId: user?.id,
        currency,
        address: walletAddress,
        network,
      });

      const data = await response.data;
      console.log(data);
      setAddLoading(false);
      setWalletAddress("");
      setCurrency("");
      getCoinAddresses();
    } catch (error) {
      setAddLoading(false);
      console.log({ error });
    }
  };

  const getCoinAddresses = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/coin-address/get-coin-addresses`);
      const data: Address[] = await response.data;
      setAddresses(data);
      setLoading(false);
      //@ts-ignore
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoinAddresses();
  }, []);

  const handleCurrencyName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };
  return (
    <div className=''>
      <h2 className='font-bold text-lg pb-4 mb-10 lg:mt-24 sm:mt-8'>Wallet Addresses</h2>

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
              Are you sure you want to delete this wallet address?. this cannot
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
                  deleteAddress();
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
              <FaSpinner className='text-lg animate-spin' />
            </div>
          ) : (
            <>
              <h2 className="text-md">Wallet Addresses</h2>
              {addresses?.map((item, id) => (
                <div
                  key={id}
                  className='text-sm flex justify-between items-center gap-4 bg-white p-3 rounded-lg my-3 border'
                >
                  <div className=''>
                    <p>Coin Name: {item.currency}</p>
                    <p className=''>Coin Network: {item.network}</p>
                    <p className='mb-3 md:ml-0 md:mb-0'>
                      Coin Adress: {item.walletAddress}
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
                          setAddress(item);
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
          <h2 className='my-4 pt-4 font-bold text-xl mt-7 border-t'>
            Add Wallet Address
          </h2>
          <form className='flex items-center'>
            <div className='flex-1 items-center gap-4'>
              <select
                value={currency}
                onChange={handleCurrencyName}
                required
                className='select select-none mb-2 w-full bg-gray-100 rounded-md outline outline-gray-200'
              >
                <option defaultChecked>Select currency</option>
                {exchangeRates?.exchanges
                  ?.filter((item) => item.type === "crypto")
                  .map((rate) => (
                    <option key={rate._id} value={rate.currency}>
                      {rate.currency}
                    </option>
                  ))}
              </select>
              <input
                placeholder='Enter Wallet Address'
                type='text'
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                }}
                className={`p-2 border mb-2 rounded-lg bg-gray-100 text-black w-full`}
                required
              />
              <input
                placeholder='Enter Network'
                required
                type='text'
                value={network}
                onChange={(e) => {
                  setNetwork(e.target.value);
                }}
                className={`p-2 border rounded-lg bg-gray-100 text-black w-full`}
              />
            </div>
            <div className='ml-3 bounce'>
              <Button
                type='submit'
                variant={"outline"}
                className='text-black'
                onClick={(e) => {
                  if (!currency) {
                    return;
                  }
                  if (!walletAddress) {
                    return;
                  }

                  addCoinAddress(e);
                }}
              >
                {addLoading ? (
                  <FaSpinner className='text-lg animate-spin' />
                ) : (
                  "Add Wallet Address"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className=''></div>
      </div>
    </div>
  );
}
