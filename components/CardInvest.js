// import { projectContext } from "@/pages/projects/[projectId]";
import { appContext } from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import ProjectInput from "./ProjectInput";
import ProjectTextarea from "./ProjectTextarea";

function CardInvest({ investment }) {
  const language = useSelector((state) => state.language?.language);
  const profile = useSelector((state) => state.profile?.profile);
  const { projectState, setProjectState } = useContext(appContext);

  return (
    <div className="w-full flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md bg-slate-50">
      <div className="w-[min(100%,140px)] aspect-square">
        <Image
          className="w-full h-full flex items-center justify-center object-cover"
          src={`/investment.png`}
          alt="image"
          height={200}
          width={200}
        />
      </div>
      <div className="w-[min(100%,600px)] ">
        <h6 className="h6 text-gray-900 text-center">
          {language === "english"
            ? "INVESTMENT FINANCING"
            : language === "francais" && "FINANCEMENT DES INVESTISSEMENTS"}
        </h6>
      </div>

      <div className="w-[min(100%,600px)] ">
        <p className="p text-gray-700 text-center">
          {investment.details && investment.details}
        </p>
      </div>
      <button
        onClick={() => {
          setProjectState({
            ...projectState,
            checkoutState: "investment",
            checkout: {
              ...projectState.checkout,
              uid: profile.id,
              uname: profile.name,
              pid: projectState.project?._id,
              pname: projectState.project?.name,
              amount: investment.min_amount,
              details: investment?.details,
              operation: "investment",
            },
          });
        }}
        className="flex flex-row items-center gap-1 px-4 py-1 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-400 text-gray-950"
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

export default CardInvest;
