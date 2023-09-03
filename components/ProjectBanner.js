import { projectContext } from "@/pages/projects/[projectId]";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsHeart, BsPiggyBank } from "react-icons/bs";
import { HiEye } from "react-icons/hi2";
import { IoIosPeople, IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import ProjectInput from "./ProjectInput";
import ProjectInputIMG from "./ProjectInputIMG";

function ProjectBanner({ projectStatus, project }) {
  const language = useSelector((state) => state.language?.language);
  const scrollY = useSelector((state) => state.page?.scrollY);
  const [bannerState, setBannerState] = useState({
    loading: false,
    status: "fade",
    // status: "showcase-image",
    pid: "",
    name: "",
    amount: 0,
    newImageURL: null,
  });
  const imageInputRef = useRef(null);

  useEffect(() => {
    setBannerState({
      ...bannerState,
      status: "fade",
      pid: project?._id,
      name: project?.name,
      amount: project?.amount,
      newImageURL: null,
    });
  }, [project]);
  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }
  // console.log("projectbanner", bannerState);
  return (
    <div className="w-full grid grid-cols-1fr grid-rows-1fr">
      <div className="w-full h-[500px] col-1/2 row-1/2 z-0">
        <Image
          className="w-full h-full flex items-center justify-center object-cover"
          src={
            bannerState.newImageURL
              ? bannerState.newImageURL
              : project?.image
              ? project?.image
              : `/exeptions/people.jpg`
          }
          alt="project"
          height={500}
          width={2000}
        />
      </div>
      <div
        style={{
          opacity: `${true ? 100 : scrollY < 100 ? `${100 - scrollY}%` : 0}`,
        }}
        className="w-full h-[500px] flex flex-col items-center justify-end col-1/2 row-1/2 z-10 py-4 px-4 sm:px-8 xl:px-16"
      >
        <div
          className={`w-[min(100%,1400px)] flex flex-col items-center p-3 sm:p-4 shadow-lg rounded-xl sm:rounded-2xl ${
            bannerState.status !== "showcase-image" && "bg-white"
          } gap-2`}
        >
          {bannerState.status !== "showcase-image" &&
          projectStatus === "showcase" ? (
            <div className="w-full flex flex-wrap items-center justify-between text-gray-950 border-b border-gray-500 gap-4">
              <h4 className="h4">{project?.name && project?.name}</h4>
              <h3 className="h3 ml-auto">
                <span className="small-p text-blue-500">
                  {language === "english"
                    ? "Seeking"
                    : language === "francais" && "En cherchant"}
                </span>
                {`${nFormatter(project?.amount)} ${
                  language === "english"
                    ? "DZD"
                    : language === "francais" && "DA"
                }`}
              </h3>
            </div>
          ) : (
            bannerState.status !== "showcase-image" &&
            projectStatus === "edit" && (
              <div className="pb-3 sm:pb-4 w-full flex flex-col lg:flex-row items-center text-gray-950 border-b border-gray-500 gap-3 sm:gap-4">
                <ProjectInput
                  input={{
                    type: "text",
                    name: ["PROJECT NAME", "NOM DU PROJET"],
                    placeholder: ["Project Name", "Nom du Projet"],
                    remove: false,
                  }}
                  item={{
                    value: bannerState.name,
                    item: "name",
                    id: bannerState.pid,
                  }}
                />
                <div className="hidden w-[1px] lg:h-[72px] bg-gray-500 lg:block"></div>
                <ProjectInput
                  input={{
                    type: "number",
                    name: ["AMOUNT NEEDED (DZD)", "MONTANT NÉCESSAIRE (DA)"],
                    placeholder: ["Amount needed", "Montant Nécessaire"],
                    remove: false,
                  }}
                  item={{
                    value: bannerState.amount,
                    item: "amount",
                    id: bannerState.pid,
                  }}
                />
              </div>
            )
          )}

          {projectStatus === "showcase" ? (
            <div className="flex flex-wrap items-center justify-center gap-8 w-[min(100%,232px)] sm:w-full sm:gap-4 xl:gap-8">
              <div className="w-[80px] sm:w-[96px] flex flex-col items-center text-gray-900">
                <i className="icon-40">
                  <HiEye />{" "}
                </i>
                <h6 className="h6">
                  {project?.views ? nFormatter(project?.views) : 0}
                </h6>
              </div>
              <div className="w-[80px] sm:w-[96px] flex flex-col items-center text-gray-900">
                <i className="icon-40">
                  <BsHeart />{" "}
                </i>
                <h6 className="h6">
                  {project?.likes ? nFormatter(project?.likes) : 0}
                </h6>
              </div>
              <div className="w-[80px] sm:w-[96px] flex flex-col items-center text-gray-900">
                <i className="icon-40">
                  <BsPiggyBank />{" "}
                </i>
                <h6 className="h6">
                  {project?.raised
                    ? `${nFormatter(project?.raised)} ${
                        language === "english"
                          ? "DZD"
                          : language === "francais" && "DA"
                      }`
                    : `0 ${
                        language === "english"
                          ? "DZD"
                          : language === "francais" && "DA"
                      }`}
                </h6>
              </div>
              <div className="w-[80px] sm:w-[96px] flex flex-col items-center text-gray-900">
                <i className="icon-40">
                  <IoIosPeople />{" "}
                </i>
                <h6 className="h6">
                  {project?.donators ? nFormatter(project?.donators) : 0}
                </h6>
              </div>
            </div>
          ) : (
            <ProjectInputIMG
              project={project}
              bannerState={bannerState}
              setBannerState={setBannerState}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectBanner;
