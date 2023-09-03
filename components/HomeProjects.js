import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import ProjectCard from "./ProjectCard";
import { homeContext } from "@/pages";

function HomeProjects() {
  const language = useSelector((state) => state.language?.language);
  const { promoted, latest } = useContext(homeContext);
  const [projectsState, setProjectsState] = useState({
    status: "loading",
    currOption: "recommendations",
    promoted: [],
    currPromoted: [],
    latest: [],
    currLatest: [],
  });
  useEffect(() => {
    if (promoted?.length > 0) {
      let randomPromoted =
        Math.floor(Math.random() * (promoted.length / 4)) * 4;
      let randomLatest = Math.floor(Math.random() * (promoted.length / 4)) * 4;
      setProjectsState({
        ...projectsState,
        status: "filled",
        currOption: "recommendations",
        promoted: promoted,
        currPromoted: promoted.slice(randomPromoted, randomPromoted + 4),
        latest: latest,
        currLatest: latest.slice(randomLatest, randomLatest + 4),
      });
    } else {
      // let randomPromoted =
      // Math.floor(Math.random() * (promoted.length / 4)) * 4;
      let randomLatest = Math.floor(Math.random() * (promoted.length / 4)) * 4;
      setProjectsState({
        ...projectsState,
        status: "filled",
        currOption: "latest",
        // promoted: promoted,
        // currPromoted: promoted.slice(randomPromoted, randomPromoted + 4),
        latest: latest,
        currLatest: latest.slice(randomLatest, randomLatest + 4),
      });
    }
  }, [promoted, latest]);
  return (
    <div className="relative z-10 w-full flex flex-col items-center bg-white gap-4 py-8 px-4 sm:px-8 xl:px-16 ">
      <div className="w-[min(100%,1400px)] flex flex-wrap">
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <h4 className="h4 text-gray-900">
            {language === "english"
              ? "PROJECTS"
              : language === "francais" && "PROJETS"}
          </h4>
          <select
            className=" border border-gray-400 rounded-md bg-white outline-none small-p-16 h-[32px] sm:h-[40px]"
            onChange={(e) => {
              setProjectsState({
                ...projectsState,
                currOption: e.target.value,
              });
            }}
          >
            {projectsState.currPromoted?.length > 0 && (
              <option className="small-p-16" value="recommendations">
                {language === "english"
                  ? "Recommendations"
                  : language === "francais" && "Recommandations"}
              </option>
            )}
            {projectsState.currLatest?.length > 0 && (
              <option className="small-p-16" value="latest">
                {language === "english"
                  ? "Latest"
                  : language === "francais" && "Le plus récent"}
              </option>
            )}

            {/* <option className="small-p-16" value="All">
              {language === "english"
                ? "All"
                : language === "francais" && "Tout"}
            </option> */}
          </select>
        </div>
        <Link
          className="flex flex-row items-center gap-2 ml-auto text-yellow-500"
          href="/"
        >
          <h6 className="p hidden sm:block">
            {language === "english"
              ? "View all"
              : language === "francais" && "Voir tout"}
          </h6>
          <i className="icon-32">
            <BsArrowRight />
          </i>
        </Link>
      </div>

      <div className="w-[min(100%,1400px)] grid grid-cols-repCards gap-6">
        {projectsState.status === "filled" &&
        projectsState.currOption === "recommendations"
          ? projectsState.currPromoted?.map((project) => {
              return <ProjectCard key={project._id} project={project} />;
            })
          : projectsState.status === "filled" &&
            projectsState.currOption === "latest" &&
            projectsState.currLatest?.map((project) => {
              return <ProjectCard key={project._id} project={project} />;
            })}
      </div>
    </div>
  );
}

export default HomeProjects;
