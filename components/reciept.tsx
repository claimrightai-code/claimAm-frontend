"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";
import { formatHumanReadableDateTime, formatMoney } from "@/lib/utils";

export default function Reciept({ currentTransaction, setModal }: any) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let {
    amount,
    dateUTC,
    recipient,
    referenceNumber,
    status,
    transactionId,
    transactionReference,
    transactionType,
  } = currentTransaction;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div>
        <div
          className="modal-box flex flex-col justify-between p-8 bg-white rounded-md relative text-sm w-[500px]"
          ref={componentRef}
        >
          <div>
            <button
              onClick={() => setModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0"
            >
              ✕
            </button>
            <h3 className="font-bold text-xl">Reciept</h3>
            <div className="py-4 flex-col flex">
              <p className="p-2">
                <span className="font-semibold">Description: </span>
                {transactionType}
              </p>
              <p className="p-2">
                <span className="font-semibold">Status: </span>
                {status}
              </p>
              <p className="p-2">
                <span className="font-semibold">Amount: </span>
                {formatMoney(amount)}
              </p>
              <p className="p-2">
                <span className="font-semibold">Recipient: </span>
                {recipient}
              </p>
              <p className="p-2">
                <span className="font-semibold">Transaction Ref: </span>
                {transactionReference}
              </p>

              <p className="p-2">
                <span className="font-semibold">Transaction Id: </span>
                {transactionId}
              </p>
              <p className="p-2">
                <span className="font-semibold">Date: </span>
                {formatHumanReadableDateTime(dateUTC)}
              </p>
            </div>
          </div>

          <Button
            className="mt-4 w-52 text-white bg-black"
            onClick={handlePrint}
          >
            Print Reciept
          </Button>
        </div>
      </div>
    </div>
  );
}
