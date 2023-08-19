import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function ProjectCard({ project }) {
  const language = useSelector((state) => state.language?.language);
  return (
    <Link
      className="w-[300px] h-[330px] mx-auto"
      href={`/projects/${project._id}`}
    >
      <div className="w-[300px] h-[200px] flex items-center justify-center">
        <Image
          className="w-full h-full flex items-center justify-center object-cover rounded-2xl"
          src={project.image ? `${project.image}` : "/exeptions/banner.jpg"}
          alt="project"
          height={300}
          width={300}
        />
      </div>
      <div className="w-full flex flex-col gap-1 items-center px-3 py-1">
        <h6 className="h6 text-gray-900 w-full text-center">{project.name}</h6>
        <div className="w-full h-3 rounded-full bg-yellow-200 grid-cols-1fr grid-rows-1fr z-10 overflow-hidden">
          <div
            style={{ width: `${project.percentage ? project.percentage : 0}%` }}
            className="h-full bg-yellow-400 col-1/2 row-1/2 z-20"
          >
            {""}
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between text-gray-700">
          <p className="p">
            {language === "english"
              ? "Raised:"
              : language === "francais" && "Collecté:"}
          </p>
          <p className="p">{`${0} DA`}</p>
        </div>
        <div className="w-full flex flex-row items-center justify-between text-gray-700">
          <p className="p">
            {language === "english"
              ? "Backers:"
              : language === "francais" && "Bailleurs:"}
          </p>
          <p className="p">{`${0}`}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
