import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth";
import { stateContext } from "@/pages/_app";

function ProfileNav() {
  const { admin, myProfile } = useContext(stateContext);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (!admin) {
      setProjects(myProfile.projects);
    }
  }, [myProfile, admin]);
  return (
    <div className="header-profileNav">
      <Link href={`/profile`} className="header-popup-btn hover-text-btn">
        <h6 className="h6 black-80">PROFILE</h6>
      </Link>
      {!admin && (
        <div className="header-popup-section">
          <h5 className="h5 black-90">PROJECTS</h5>
          {projects?.map((project) => {
            return (
              <Link
                key={project._id}
                href={`/profile/${project.insertedID}`}
                className="header-popup-btn hover-text-btn"
              >
                <h6 className="h6 black-80">{project.projectName}</h6>
              </Link>
            );
          })}
          <Link
            href={`/profile`}
            className="header-popup-gold-btn hover-text-btn linear-gold"
          >
            <h6 className="h6 white">New Project</h6>
          </Link>
        </div>
      )}

      <Link
        href="/api/auth/signout"
        onClick={() => {
          signOut();
        }}
        className="header-popup-ti-btn hover-text-btn"
      >
        <i className="icon-32 black-80">
          <HiOutlineLogout />{" "}
        </i>
        <h6 className="h6 black-80">SignOut</h6>
      </Link>
    </div>
  );
}

export default ProfileNav;
