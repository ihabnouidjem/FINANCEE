// import { projectContext } from "@/pages/projects/[projectId]";
import { appContext } from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";

function CardDonation({ donation }) {
  const language = useSelector((state) => state.language?.language);
  const profile = useSelector((state) => state.profile?.profile);
  const { projectState, setProjectState } = useContext(appContext);
  return (
    <div className="w-full flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md bg-slate-50">
      <div className="w-[min(100%,140px)] aspect-square">
        <Image
          className="w-full h-full flex items-center justify-center object-cover"
          src={`/donation.png`}
          alt="image"
          height={200}
          width={200}
        />
      </div>
      <div className="w-[min(100%,600px)] ">
        <h6 className="h6 text-gray-900 text-center">
          {language === "english"
            ? "DONATION-BASED CROWDFUNDING"
            : language === "francais" && "FINANCEMENT BASÉ SUR LES DONS"}
        </h6>
      </div>

      <div className="w-[min(100%,600px)] ">
        <p className="p text-gray-700 text-center">
          {donation.details && donation.details}
        </p>
      </div>
      <button
        className="flex flex-row items-center gap-1 px-4 py-1 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-400 text-gray-950"
        onClick={() => {
          setProjectState({
            ...projectState,
            checkoutState: "donation",
            checkout: {
              ...projectState.checkout,
              uid: profile.id,
              uname: profile.name,
              pid: projectState.project?._id,
              pname: projectState.project?.name,
              amount: false,
              details: donation?.details,
              operation: "donation",
            },
          });
        }}
      >
        <p className="small-p-16">
          {language === "english"
            ? "Donate"
            : language === "francais" && "Donner"}
        </p>
        <i className="icon-20">
          <FiChevronRight />{" "}
        </i>
      </button>
    </div>
  );
}

export default CardDonation;
