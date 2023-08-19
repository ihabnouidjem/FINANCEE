import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectTextarea from "./ProjectTextarea";

function ProjectDescription({ project, projectStatus }) {
  const language = useSelector((state) => state.language.language);
  const [descriptionState, setDescriptionState] = useState({
    loading: false,
    description: "",
    id: null,
  });

  useEffect(() => {
    if (project) {
      setDescriptionState({
        ...descriptionState,
        description: project?.description,
        id: project?._id,
      });
    }
  }, [project]);
  return (
    <div className="w-full flex flex-col items-center gap-4 py-6 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] shadow-md flex flex-col gap-2 items-center justify-center p-3 rounded-xl sm:p-4 sm:rounded-2xl">
        <h5 className="w-full h5 text-gray-950 text-center">
          {language === "english"
            ? `ABOUT ${project?.name}`
            : language === "francais" && `A PROPOS ${project?.name}`}
        </h5>
        {projectStatus === "showcase" ? (
          <p className="p text-center text-gray-700">{project?.description}</p>
        ) : (
          <ProjectTextarea
            textarea={{
              type: "text",
              name: ["DESCRIPTION", "DESCRIPTION"],
              placeholder: ["Description", "Description"],
              remove: true,
            }}
            item={{
              value: descriptionState.description,
              item: "description",
              id: descriptionState.id,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectDescription;
