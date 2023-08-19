import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import ActivitiesForm from "./ActivitiesForm";
import CardDonation from "./CardDonation";
import CardGift from "./CardGift";
import CardInvest from "./CardInvest";

function ProjectActivities({ project, projectStatus }) {
  const language = useSelector((state) => state.language?.language);

  return (
    <div className="w-full flex flex-col items-center gap-2 py-6 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)]  ">
        <h5 className="w-full h5 text-gray-950 text-center">
          {language === "english"
            ? "FINANCE ACTIVITIES"
            : language === "francais" && "ACTIVITÉS FINANCIÈRES"}
        </h5>
      </div>
      <div className="w-[min(100%,1400px)] flex flex-col lg:flex-row gap-3 sm:gap-4 xl:gap-8 ">
        {project.donation?.status && project.donation?.details && (
          <CardDonation donation={project.donation} />
        )}

        {project.gift?.status && project.gift?.details && (
          <CardGift gift={project.gift} />
        )}
        {project.investment?.status && project.investment?.details && (
          <CardInvest investment={project.investment} />
        )}
      </div>
    </div>
  );
}

export default ProjectActivities;
