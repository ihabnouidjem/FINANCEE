import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import ActivityForm from "./ActivityForm";
import ProjectInput from "./ProjectInput";
import ProjectTextarea from "./ProjectTextarea";

function ActivitiesForm({ projectStatus, project }) {
  const language = useSelector((state) => state.language?.language);
  const { projectState, postItem } = useContext(appContext);
  const [activitiesState, setActivitiesState] = useState({
    state_donation: false,
    donation: {},
    newDonationStatus: {},
    reload_donation: true,
    state_gift: false,
    gift: {},
    newGiftStatus: {},
    reload_gift: true,
    state_investment: false,
    investment: {},
    newInvestmentStatus: {},
    reload_investment: true,
  });

  useEffect(() => {
    if (project) {
      setActivitiesState({
        ...activitiesState,
        id: project._id,
        state_donation: project.donation?.status,
        donation: project.donation,
        reload_donation: false,
        state_gift: project.gift?.status,
        gift: project.gift,
        reload_gift: false,
        state_investment: project.investment?.status,
        investment: project.investment,
        reload_investment: false,
        newDonationStatus: {
          status: !project.donation?.status,
          min_amount: project.donation?.min_amount,
          details: project.donation?.details,
        },
        newGiftStatus: {
          status: !project.gift?.status,
          min_amount: project.gift?.min_amount,
          details: project.gift?.details,
        },
        newInvestmentStatus: {
          status: !project.investment?.status,
          min_amount: project.investment?.min_amount,
          details: project.investment?.details,
        },
      });
    }
  }, [project]);
  console.log("activitiesform", activitiesState);
  return (
    <div className="w-full flex flex-col items-center gap-2 py-6 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] p-3 shadow-md sm:p-4 rounded-xl sm:rounded-2xl flex flex-col gap-3 sm:gap-4 xl:gap-8 ">
        <div className="w-[min(100%,1400px)]  ">
          <h5 className="w-full h5 text-gray-950 text-center">
            {language === "english"
              ? "FINANCE ACTIVITIES"
              : language === "francais" && "ACTIVITÉS FINANCIÈRES"}
          </h5>
        </div>
        {""}
        <div className="w-full flex flex-col items-center gap-4 p-2 rounded-lg bg-slate-50">
          <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-4">
            <button className="w-[calc(100%-48px)] flex flex-row items-center gap-1 text-slate-800">
              {activitiesState.reload_donation ? (
                <i className="icon-20 animate-loading">
                  <AiOutlineLoading />
                </i>
              ) : (
                <i
                  className="icon-20"
                  onClick={() => {
                    postItem(`/api/profile/projects/${project._id}`, {
                      donation: activitiesState.newDonationStatus,
                    });
                    setActivitiesState({
                      ...activitiesState,
                      activitiesState,
                      reload_donation: true,
                    });
                  }}
                >
                  {!activitiesState.donation?.status ? (
                    <BsCircle />
                  ) : (
                    <BsCheckCircleFill />
                  )}
                </i>
              )}

              <h6 className="small-h6 overflow-hidden text-ellipsis whitespace-nowrap">
                {language === "english"
                  ? "Donation-based crowdfunding"
                  : language === "francais" && "Financement basé sur les dons"}
              </h6>
            </button>
            <i
              className="icon-20 text-slate-800"
              onClick={() => {
                if (activitiesState.donation?.status) {
                  setActivitiesState({
                    ...activitiesState,
                    state_donation: !activitiesState.state_donation,
                  });
                }
              }}
            >
              {activitiesState.state_donation ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </i>
          </div>
          {activitiesState.state_donation && (
            <ActivityForm
              textarea={{
                type: "text",
                name: ["DETAILS", "DÉTAILS"],
                placeholder: ["Details", "Détails"],
              }}
              input={{
                type: "number",
                name: ["MIN AMOUNT (DZD)", "MONTANT MIN (DA)"],
                placeholder: ["Minimum amount", "Montant min"],
              }}
              items={{
                values: [false, activitiesState.donation?.details],
                field: "donation",
                items: ["details", "min_amount"],
                id: activitiesState.id,
              }}
            />
          )}
        </div>

        {""}
        <div className="w-full flex flex-col items-center gap-4 p-2 rounded-lg bg-slate-50">
          <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-4">
            <button className="w-[calc(100%-48px)] flex flex-row items-center gap-1 text-slate-800">
              {activitiesState.reload_gift ? (
                <i className="icon-20 animate-loading">
                  <AiOutlineLoading />
                </i>
              ) : (
                <i
                  className="icon-20"
                  onClick={() => {
                    postItem(`/api/profile/projects/${project._id}`, {
                      gift: activitiesState.newGiftStatus,
                    });
                    setActivitiesState({
                      ...activitiesState,
                      activitiesState,
                      reload_gift: true,
                    });
                  }}
                >
                  {!activitiesState.gift?.status ? (
                    <BsCircle />
                  ) : (
                    <BsCheckCircleFill />
                  )}
                </i>
              )}

              <h6 className="small-h6 overflow-hidden text-ellipsis whitespace-nowrap">
                {" "}
                {language === "english"
                  ? "Reward-based crowdfunding"
                  : language === "francais" &&
                    "Crowdfunding basé sur les récompenses"}
              </h6>
            </button>
            <i
              className="icon-20 text-slate-800"
              onClick={() => {
                if (activitiesState.gift?.status) {
                  setActivitiesState({
                    ...activitiesState,
                    state_gift: !activitiesState.state_gift,
                  });
                }
              }}
            >
              {activitiesState.state_gift ? <FiChevronUp /> : <FiChevronDown />}
            </i>
          </div>
          {activitiesState.state_gift && (
            <ActivityForm
              textarea={{
                type: "text",
                name: ["DETAILS", "DÉTAILS"],
                placeholder: ["Details", "Détails"],
              }}
              input={{
                status: true,
                type: "number",
                name: ["MIN AMOUNT (DZD)", "MONTANT MIN (DA)"],
                placeholder: ["Minimum amount", "Montant min"],
              }}
              items={{
                values: [
                  activitiesState.gift?.min_amount,
                  activitiesState.gift?.details,
                ],
                field: "gift",
                items: ["details", "min_amount"],
                id: activitiesState.id,
              }}
            />
          )}
        </div>
        {""}
        <div className="w-full flex flex-col items-center gap-4 p-2 rounded-lg bg-slate-50">
          <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-4">
            <button className=" w-[calc(100%-48px)] flex flex-row items-center gap-1 text-slate-800">
              {activitiesState.reload_investment ? (
                <i className="icon-20 animate-loading">
                  <AiOutlineLoading />
                </i>
              ) : (
                <i
                  className="icon-20"
                  onClick={() => {
                    postItem(`/api/profile/projects/${project._id}`, {
                      investment: activitiesState.newInvestmentStatus,
                    });
                    setActivitiesState({
                      ...activitiesState,
                      activitiesState,
                      reload_investment: true,
                    });
                  }}
                >
                  {!activitiesState.investment?.status ? (
                    <BsCircle />
                  ) : (
                    <BsCheckCircleFill />
                  )}
                </i>
              )}

              <h6 className="small-h6 overflow-hidden text-ellipsis whitespace-nowrap">
                {" "}
                {language === "english"
                  ? "Investment Financing"
                  : language === "francais" &&
                    "Financement des investissements"}
              </h6>
            </button>
            <i
              className="icon-20 text-slate-800"
              onClick={() => {
                if (activitiesState.investment?.status) {
                  setActivitiesState({
                    ...activitiesState,
                    state_investment: !activitiesState.state_investment,
                  });
                }
              }}
            >
              {activitiesState.state_investment ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </i>
          </div>
          {activitiesState.state_investment && (
            <ActivityForm
              textarea={{
                type: "text",
                name: ["DETAILS", "DÉTAILS"],
                placeholder: ["Details", "Détails"],
              }}
              input={{
                status: true,
                type: "number",
                name: ["MIN AMOUNT (DZD)", "MONTANT MIN (DA)"],
                placeholder: ["Minimum amount", "Montant min"],
              }}
              items={{
                values: [
                  activitiesState.investment?.min_amount,
                  activitiesState.investment?.details,
                ],
                field: "investment",
                items: ["details", "min_amount"],
                id: activitiesState.id,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivitiesForm;
