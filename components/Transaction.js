import React from "react";
import { useSelector } from "react-redux";

function Transaction({ transaction }) {
  const language = useSelector((state) => state.language.language);
  return (
    <div className="w-[min(1000px,100%)] p-2 rounded-lg shadow-md flex flex-col bg-white">
      <div className="w-full flex flex-row flex-wrap gap-4 items-center">
        <h5 className={true ? `h5 text-zinc-400` : `h5 text-zinc-900`}>
          {transaction.pname}
        </h5>
        {language === "english" ? (
          <h6
            className={
              transaction.status === "new"
                ? `ml-auto h6 text-zinc-400`
                : `ml-auto h6 text-zinc-900`
            }
          >
            {transaction.operation !== "donation" &&
              `${transaction.amount} DZD |`}{" "}
            {transaction.operation === "donation"
              ? "DONATION"
              : transaction.operation === "reward"
              ? "REWARDED"
              : transaction.operation === "investment" && "INVESTMENT"}
          </h6>
        ) : (
          language === "francais" && (
            <h6
              className={
                transaction.status === "new"
                  ? `ml-auto h6 text-zinc-400`
                  : `ml-auto h6 text-zinc-900`
              }
            >
              {transaction.operation !== "donation" &&
                `${transaction.amount} DA |`}{" "}
              {transaction.operation === "donation"
                ? "DON"
                : transaction.operation === "reward"
                ? "RÉCOMPENSÉ"
                : transaction.operation === "investment" && "INVESTISSEMENT"}
            </h6>
          )
        )}
      </div>
      <p
        className={
          transaction.status === "new"
            ? `w-full p text-zinc-300`
            : `w-full p text-zinc-900`
        }
      >
        {transaction.details}
      </p>
    </div>
  );
}

export default Transaction;
