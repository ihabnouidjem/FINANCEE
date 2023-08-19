import React from "react";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";

function ProjectsContainer({ projects }) {
  const language = useSelector((state) => state.language?.language);

  return (
    <div className="w-full flex flex-col items-center gap-3 py-6 px-4 sm:px-8 xl:px-16">
      <div className="w-full">
        {projects.type === "all" ? (
          <h4 className="h4 text-gray-950">
            {language === "english"
              ? "ALL PROJECTS"
              : language === "francais" && "TOUS LES PROJETS"}
          </h4>
        ) : projects.type === "category" && projects.projects?.length > 0 ? (
          <h4 className="h4 text-gray-950">
            {language === "english"
              ? `${projects.category}`
              : language === "francais" && `${projects.category}`}
          </h4>
        ) : projects.type === "category" && projects.projects?.length === 0 ? (
          <h6 className="h6 text-gray-950">
            {language === "english"
              ? `NO PROJECTS IN: ${projects.category}`
              : language === "francais" &&
                `AUCUN PROJET DANS: ${projects.category}`}
          </h6>
        ) : projects.type === "search" && projects.projects?.length > 0 ? (
          <h4 className="h4 text-gray-950">
            {language === "english"
              ? `RESULTS FOR: ${projects.search}`
              : language === "francais" && `RÉSULTATS POUR: ${projects.search}`}
          </h4>
        ) : (
          projects.type === "search" &&
          projects.projects?.length === 0 && (
            <h6 className="h6 text-gray-950">
              {language === "english"
                ? `NO MATCH FOR: ${projects.search}`
                : language === "francais" &&
                  `PAS DE CORRESPONDANCE POUR: ${projects.search}`}
            </h6>
          )
        )}
      </div>
      <div className="w-full grid grid-cols-repCards gap-6">
        {projects.projects?.map((project) => {
          return <ProjectCard key={project._id} project={project} />;
        })}
      </div>
    </div>
  );
}

export default ProjectsContainer;
