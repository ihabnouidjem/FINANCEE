import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProfileProjectCard({ project }) {
  return (
    <Link
      href={`/profile/${project.insertedID}`}
      className="w-[min(100%,332px)] sm:w-[332px] p-4 flex flex-col gap-1 rounded-lg bg-white shadow-md"
    >
      <div className="w-full h-[200px]">
        <Image
          className="w-full h-full flex items-center justify-center object-cover"
          src={project.image ? `${project.image}` : "/exeptions/people.jpg"}
          alt="project"
          height={200}
          width={300}
        />
      </div>
      <h6 className="h6 text-gray-900 w-full">
        {project.name && project.name}
      </h6>
    </Link>
  );
}

export default ProfileProjectCard;
