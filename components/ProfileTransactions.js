import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Transaction from "./Transaction";

function ProfileTransactions({ transactions }) {
  const language = useSelector((state) => state.language.language);
  return (
    <div className="w-full grid grid-cols-1fr grid-rows-1fr pb-6">
      <div className="w-full h-[500px] col-1/2 row-1/2 z-0">
        <Image
          className="w-full h-full flex items-center justify-center object-cover"
          src={`/exeptions/banner.jpg`}
          alt="profile"
          height={500}
          width={2000}
        />
      </div>
      <div className="w-full pt-[240px] px-4 sm:px-8 xl:px-16 flex flex-col gap-2 col-1/2 row-1/2 z-10 [&>*]:mx-auto">
        <div className="w-[min(1000px,100%)] flex flex-col gap-2 my-6 p-2 rounded-lg bg-white ">
          <h5 className="h5 text-zinc-900 w-full">
            {language === "english"
              ? "TRANSACTIONS"
              : language === "francais" && "TRANSACTIONS"}
          </h5>
        </div>
        {transactions?.map((transaction) => {
          return (
            <Transaction key={transaction._id} transaction={transaction} />
          );
        })}
      </div>
    </div>
  );
}

export default ProfileTransactions;
