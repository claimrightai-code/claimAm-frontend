"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/../../components/ui/popover";
import { useUserContext } from "@/hooks/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/../../components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import api from "../api";
import Image from "next/image";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

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

const currencyTypes = ["money", "crypto"];

export default function ExchangeRates() {
  const [currentRate, setCurrentRate] = useState(0);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [currToEdit, setCurrToEdit] = useState("");
  const [feeToEdit, setFeeToEdit] = useState<Fee | null>(null);
  const [currToDelete, setCurrToDelete] = useState("");
  const [feeToDelete, setFeeToDelete] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editFeeModal, setEditFeeModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editCurrencyInput, setCurrencyEditInput] = useState("");
  const [editFeeInput, setFeeEditInput] = useState("");
  const [currencyInput, setCurrencyInput] = useState("");
  const [feeResErr, setFeeResErr] = useState("");
  const [currencyErr, setCurrencyErr] = useState(false);
  const [feeErr, setFeeErr] = useState(false);
  const [feeInput, setFeeInput] = useState("");
  const [firstPair, setFirstPair] = useState("");
  const [secondPair, setSecondPair] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [feeLoading, setFeeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currencyType, setCurrencyType] = useState("crypto");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { user } = useUserContext();

  const editCurrency = async () => {
    try {
      setEditLoading(true);
      const response = await api.put(`/exchange/edit-exchange/${currToEdit}`, {
        currency: editCurrencyInput,
        userId: user?.id,
      });

      const data = await response.data;
      getExchangeRates();
      setEditModal(false);
      setEditLoading(false);
    } catch (error) {
      console.log({ error });
      setEditLoading(false);
    }
  };

  const editFee = async () => {
    try {
      setEditLoading(true);
      const response = await api.put(`/fee/edit-fee/${feeToEdit?._id}`, {
        fee: editFeeInput,
        userId: user?.id,
      });

      const data = await response.data;
      getExchangeRates();
      setEditFeeModal(false);
      setEditLoading(false);
    } catch (error) {
      console.log({ error });
      setEditLoading(false);
    }
  };

  const getCurrentRate = async () => {
    try {
      const response = await axios.get(
        `https://api.fastforex.io/convert?from=${firstPair.split("|")[1]}&to=${
          secondPair.split("|")[1]
        }&amount=1&api_key=245b91efbe-478d8a02dd-sbd0ve`
      );
      const data = await response.data;
      setCurrentRate(data.result.rate);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const deleteCurrency = async () => {
    try {
      setDeleteLoading(true);
      let response;

      if (currToDelete.length) {
        response = await api.post(`/exchange/delete-exchange/${currToDelete}`, {
          userId: user?.id,
        });
      } else {
        response = await api.post(`/fee/delete-fee/${feeToDelete}`, {
          userId: user?.id,
        });
      }

      const data = await response.data;
      setDeleteLoading(false);
      setDeleteModal(false);
      getExchangeRates();
      setCurrToDelete("");
      setFeeToDelete("");
    } catch (error) {
      setDeleteLoading(false);
      console.log({ error });
    }
  };

  const addFee = async () => {
    try {
      setFeeLoading(true);
      const response = await api.post(`/fee/add-fee/`, {
        userId: user?.id,
        firstPair: firstPair.split("|")[0],
        secondPair: secondPair.split("|")[0],
        fee: feeInput,
      });

      const data = await response.data;
      setFeeLoading(false);
      if (!data.ok) {
        setFeeResErr(data.message);
      }
      setFeeInput("");
      getExchangeRates();
    } catch (error) {
      setFeeLoading(false);
    }
  };

  const addExchange = async () => {
    try {
      setAddLoading(true);
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile);
      }
      formData.append("userId", user?.id!);
      formData.append("currency", currencyInput.toUpperCase());
      formData.append("type", currencyType);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const response = await api.post(
        `/exchange/add-exchange/`,
        formData,
        config
      );

      const data = await response.data;
      setAddLoading(false);
      setCurrencyInput("");
      setImageFile(null);
      getExchangeRates();
    } catch (error) {
      setAddLoading(false);
      console.log({ error });
    }
  };

  const getExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/exchange/get-exchanges`);
      const data: ExchangeRate = await response.data[0];
      setExchangeRate(data);
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

  useEffect(() => {
    getCurrentRate();
  }, [firstPair, secondPair]);

  const handleCurrencyTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrencyType(event.target.value);
  };

  return (
    <>
      <h2 className='font-bold text-lg pb-4 mb-10 lg:mt-24 sm:mt-8'>Exchanges And Fees</h2>
      {editModal && (
        <div
          style={{ zIndex: 1000 }}
          className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75'
        >
          <div className='modal-box'>
            <button
              onClick={() => setEditModal(false)}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
            <h3 className='font-bold text-lg'>Edit</h3>
            <div className='flex items-center my-4'>
              <div className='flex-1 flex items-center gap-4'>
                <input
                  placeholder='Enter currency'
                  type='text'
                  className='p-2 rounded-lg bg-gray-100 text-black w-full'
                  value={editCurrencyInput}
                  onChange={(e) => setCurrencyEditInput(e.target.value)}
                />
              </div>
            </div>
            <Button
              className='mt-4 w-full bg-black'
              onClick={() => {
                editCurrency();
              }}
            >
              {editLoading ? (
                <FaSpinner className='text-lg animate-spin text-green-400' />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      )}{" "}
      {editFeeModal && (
        <div
          style={{ zIndex: 1000 }}
          className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75'
        >
          <div className='modal-box'>
            <button
              onClick={() => setEditFeeModal(false)}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
            <h3 className='font-bold text-lg'>
              Edit {feeToEdit?.firstPair.currency}/
              {feeToEdit?.secondPair.currency} Fee
            </h3>
            <div className='flex items-center my-4'>
              <div className='flex-1 flex items-center gap-4'>
                <input
                  placeholder='Enter fee'
                  type='number'
                  className='p-2 rounded-lg bg-gray-100 text-black w-full'
                  value={editFeeInput}
                  onChange={(e) => setFeeEditInput(e.target.value)}
                />
              </div>
            </div>
            <Button
              className='mt-4 w-full bg-black'
              onClick={() => {
                editFee();
              }}
            >
              {editLoading ? (
                <FaSpinner className='text-lg animate-spin text-white' />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      )}{" "}
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
              Are you sure you want to delete this exchange rate. this cannot be
              undone.
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
                  deleteCurrency();
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
              <div className='flex gap-3'>
                <div className='flex-1'>
                  {exchangeRate?.exchanges?.map((item) => (
                    <div
                      className='flex items-center justify-between p-3 hover:border bg-gray-50 my-3 rounded-lg'
                      key={item._id}
                    >
                      <div className='flex text-sm items-center gap-x-8'>
                        <Image
                          src={
                            item?.image ? item.image : "/image-placeholder.png"
                          }
                          className='rounded-full'
                          height={40}
                          width={40}
                          alt='image'
                        />
                        <p>{item.currency}</p>
                      </div>

                      <Popover>
                        <PopoverTrigger>
                          <div className='cursor-pointer bounce p-3 bg-white rounded-full'>
                            <BsThreeDotsVertical />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className='flex flex-col gap-4'>
                          <Button
                            onClick={() => {
                              setEditModal(true);
                              setCurrencyEditInput(item?.currency);
                              setCurrToEdit(item._id);
                            }}
                            className='bounce'
                            variant={"outline"}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setDeleteModal(true);
                              setCurrToDelete(item._id);
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
                </div>
                <div className='flex-1'>
                  {exchangeRate?.fees?.map((item) => (
                    <div
                      className='flex items-center justify-between p-3 hover:border bg-gray-50 my-3 rounded-lg'
                      key={item._id}
                    >
                      <div className='flex text-sm items-center gap-x-8'>
                        <p>
                          {item?.firstPair.currency} /{" "}
                          {item?.secondPair.currency}
                        </p>
                        <p>{item?.fee}%</p>
                      </div>

                      <Popover>
                        <PopoverTrigger>
                          <div className='cursor-pointer bounce p-3 bg-white rounded-full'>
                            <BsThreeDotsVertical />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className='flex flex-col gap-4'>
                          <Button
                            onClick={() => {
                              setEditFeeModal(true);
                              setFeeEditInput(item?.fee);
                              setFeeToEdit(item);
                            }}
                            className='bounce'
                            variant={"outline"}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setDeleteModal(true);
                              setFeeToDelete(item._id);
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
                </div>
              </div>
            </>
          )}
          <h2 className='my-4 pb-4 font-bold text-xl mt-7 border-b'>
            Add Exchange
          </h2>
          <div className='flex'>
            <div className='flex-1 flex flex-col items-center gap-4'>
              <input
                placeholder='Enter currency'
                type='text'
                value={currencyInput}
                onChange={(e) => {
                  setCurrencyInput(e.target.value);
                  setCurrencyErr(false);
                }}
                className={`p-2 border rounded-lg bg-gray-100 text-black w-full ${
                  currencyErr && "border-red-500"
                }`}
              />
              <Input
                type='file'
                id='image'
                name='image'
                accept='image/*'
                onChange={(e) => {
                  if (e.target.files != null) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
              <select
                value={currencyType}
                onChange={handleCurrencyTypeChange}
                className='select select-none w-full bg-gray-100 rounded-md outline outline-gray-200'
              >
                {currencyTypes?.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-6 justify-between ml-3 bounce'>
              <Button
                variant={"outline"}
                className='text-black'
                onClick={() => {
                  if (!currencyInput) {
                    setCurrencyErr(true);
                    return;
                  }

                  addExchange();
                }}
              >
                {addLoading ? (
                  <FaSpinner className='text-lg animate-spin' />
                ) : (
                  "Add Exchange"
                )}
              </Button>
            </div>
          </div>

          <h2 className='my-4 pb-4 font-bold text-xl mt-7 border-b'>Add Fee</h2>
          <div className='flex'>
            <div className='flex-1 flex flex-col items-center gap-4'>
              <Select
                required
                onValueChange={(e: any) => {
                  setFeeResErr("");
                  setFirstPair(e);
                }}
              >
                <SelectTrigger className={`flex-1 w-full h-11 mt-3 mb-3`}>
                  <SelectValue placeholder='Select First Pair' />
                </SelectTrigger>
                <SelectContent className='max-h-[300px]'>
                  <SelectGroup>
                    <SelectLabel>Select First Pair</SelectLabel>
                    {exchangeRate?.exchanges?.map((item) => (
                      <SelectItem
                        value={item?._id + "|" + item?.currency}
                        key={item?._id}
                        className=''
                      >
                        {item?.currency}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                required
                onValueChange={(e: any) => {
                  setFeeResErr("");
                  setSecondPair(e);
                }}
              >
                <SelectTrigger className={`flex-1 w-full h-11 mt-3`}>
                  <SelectValue placeholder='Select Second Pair' />
                </SelectTrigger>
                <SelectContent className='max-h-[300px]'>
                  <SelectGroup>
                    <SelectLabel>Select Second Pair</SelectLabel>
                    {exchangeRate?.exchanges?.map((item) => (
                      <SelectItem
                        value={item?._id + "|" + item?.currency}
                        key={item?._id}
                        className=''
                      >
                        {item?.currency}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className='mt-[-0.5rem] flex-1 self-start ml-2 text-sm text-gray-500'>
                <b>Current rate:</b>{" "}
                {currentRate && (
                  <span>
                    1 {firstPair.split("|")[1]} = {currentRate}{" "}
                    {secondPair.split("|")[1]}
                  </span>
                )}
              </p>
              <input
                placeholder='Enter Fee'
                type='number'
                value={feeInput}
                min='0'
                max='100'
                onChange={(e) => {
                  if (
                    Number(e.target.value) < 0 ||
                    Number(e.target.value) > 100
                  ) {
                    setFeeResErr("Fee should be a number between 0 and 100");
                  } else {
                    setFeeResErr("");
                    setFeeInput(e.target.value);
                    setFeeErr(false);
                  }
                }}
                className={`flex-1 p-2 border rounded-lg bg-gray-100 text-black w-full ${
                  feeErr && "border-red-500"
                }`}
              />
              <p className='text-red-500 self-start text-[0.85rem]'>
                {feeResErr}
              </p>
            </div>
            <div className='flex flex-col gap-6 justify-between ml-3 mt-3 bounce'>
              <Button
                variant={"outline"}
                className='text-black h-11'
                onClick={() => {
                  if (!feeInput) {
                    setFeeErr(true);
                    return;
                  }

                  addFee();
                }}
              >
                {feeLoading ? (
                  <FaSpinner className='text-lg animate-spin' />
                ) : (
                  "Set Fee"
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className=''></div>
      </div>
    </>
  );
}
