import { projectContext } from "@/pages/profile/[projectId]";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProfileProject({ project }) {
  return (
    <Link
      href={`/profile/${project.insertedID}`}
      className="profileProject-cart"
    >
      <div className="profileProject-cart-img">
        <Image
          src={
            // project.projectImage
            //   ? project.projectImage
            //   :
            "/exeption/profileImage.png"
          }
          alt=""
          width={400}
          height={400}
        />
      </div>
      <h6 className="h6 black-80">{project.projectName}</h6>
    </Link>
  );
}

export default ProfileProject;
