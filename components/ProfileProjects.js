import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProfileProjectCard from "./ProfileProjectCard";

function ProfileProjects({ projects }) {
  return (
    <div className="w-full grid grid-cols-1fr grid-rows-1fr pb-6">
      <div className="w-full h-[500px] col-1/2 row-1/2 z-0">
        <Image
          className="w-full h-full flex items-center justify-center object-cover"
          src={`/exeptions/banner.jpg`}
          alt="profile"
          height={500}
          width={2000}
        />
      </div>
      <div className="w-full pt-[340px] px-4 sm:px-8 xl:px-16 flex flex-col sm:grid sm:grid-cols-repPrflCards gap-8 col-1/2 row-1/2 z-10 [&>*]:mx-auto">
        <Link
          href="/profile/new"
          className="w-[min(100%,332px)] sm:w-[332px] p-4 flex flex-col gap-1 rounded-lg bg-white shadow-md"
        >
          <div className="w-full h-[200px]">
            <Image
              className="w-full h-full flex items-center justify-center object-cover"
              src={`/plus.png`}
              alt="project"
              height={200}
              width={300}
            />
          </div>
          <h6 className="h6 text-gray-900 w-full">PROJECT</h6>
        </Link>
        {projects?.map((project) => {
          return (
            <ProfileProjectCard key={project.insertedID} project={project} />
          );
        })}
      </div>
    </div>
  );
}

export default ProfileProjects;
