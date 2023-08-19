import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useSelector } from "react-redux";

function HomePayment() {
  const language = useSelector((state) => state.language?.language);

  return (
    <div className="w-full flex flex-col items-center gap-4 bg-yellow-100  py-8 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] flex items-center justify-between">
        <h4 className="h4 text-gray-900">
          {language === "english"
            ? "PAYMENT PROCESSING"
            : language === "francais" && "TRAITEMENT DES PAIEMENTS"}
        </h4>
      </div>
      <div className="w-[min(100%,1000px)] flex items-center justify-center px-4">
        <p className="p text-gray-700 text-center">
          {language === "english"
            ? "We use two payment processing functionalities, stripe and satim, which accepts payments through a variety of methods."
            : language === "francais" &&
              "Nous utilisons deux fonctionnalités de traitement des paiements, Stripe et Satim, qui acceptent les paiements via une variété de méthodes."}
        </p>
      </div>
      <div className="w-[min(100%,1400px)] flex flex-row items-center justify-center gap-6 sm:gap-[64px] xl:gap-[128px] ">
        <Link
          className="flex flex-row items-center gap-2 px-4 py-2 border border-gray-400 rounded-2xl text-gray-900"
          href=""
        >
          <h6 className="h6">Stripe</h6>
          <i className="icon-32">
            <FiArrowUpRight />
          </i>
        </Link>
        <Link
          className="flex flex-row items-center gap-2 px-4 py-2 border border-gray-400 rounded-2xl text-gray-900"
          href=""
        >
          <h6 className="h6">Satim</h6>
          <i className="icon-32">
            <FiArrowUpRight />
          </i>
        </Link>
      </div>
    </div>
  );
}

export default HomePayment;
