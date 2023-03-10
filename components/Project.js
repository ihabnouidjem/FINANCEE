import Image from "next/image";
import Link from "next/link";
import React from "react";

function Project({
  _id,
  uid,
  projectName,
  description,
  raised,
  donators,
  projectImg,
}) {
  return (
    <Link href={`/projects/${_id}`} className="project">
      <div className="description"></div>
      <div className="project-img">
        <Image
          src={
            projectImg
            // !projectImg || projectImg === ""
            //   ? "/yassir-banner.jpeg"
            //   : `projectImg`
          }
          alt=""
          width={400}
          height={400}
        />
      </div>
      <div className="project-info">
        <h6 className="h6 black-90">{projectName}</h6>
        <div className="project-processbar"></div>
        <div className="project-p-items">
          <p className="p black-70">Raised:</p>
          <p className="p black-70">{raised}</p>
        </div>
        <div className="project-p-items">
          <p className="p black-70">donators</p>
          <p className="p black-70">{donators}</p>
        </div>
      </div>
    </Link>
  );
}

export default Project;
