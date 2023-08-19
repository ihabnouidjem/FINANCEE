import ActivitiesForm from "@/components/ActivitiesForm";
import ProjectActivities from "@/components/ProjectActivities";
import ProjectBanner from "@/components/ProjectBanner";
import ProjectDescription from "@/components/ProjectDescription";
import ProjectDonate from "@/components/ProjectDonate";
import ProjectUpdates from "@/components/ProjectUpdates";
import { setCategories } from "@/features/categoriesSlice";
import { scrollPage } from "@/features/pageSlice";
import { setProfile } from "@/features/profileSlice";
import { setProject } from "@/features/projectSlice";
import { removeSession, setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FiChevronLeft, FiEdit3 } from "react-icons/fi";
import { HiEye } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { appContext } from "../_app";

function ProfileProject({ profile, categories, project }) {
  const { data: session, status } = useSession();
  const language = useSelector((state) => state.language?.language);
  const user = useSelector((state) => state.session?.session);
  const dispatch = useDispatch();
  const { projectState, setProjectState } = useContext(appContext);

  useEffect(() => {
    setProjectState({ ...projectState, project: project });
  }, [project]);
  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  useEffect(() => {
    if (profile) {
      dispatch(
        setProfile({
          profile: profile,
          projects: profile.projects,
          status: profile.status,
        })
      );
    }
  }, [profile]);
  useEffect(() => {
    if (session) {
      dispatch(setSession(session.user));
    } else {
      dispatch(removeSession());
    }
  }, [session]);
  useEffect(() => {
    const scrollHor = () => {
      dispatch(scrollPage(window.scrollY));
    };
    scrollHor();

    document.addEventListener("scroll", scrollHor);
    return () => document.removeEventListener("scroll", scrollHor);
  }, []);
  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-row items-center h-[40px] sm:h-[48px] px-4 sm:px-8 xl:px-16 border-b border-gray-400 sticky top-[56px] sm:top-[64px] bg-white z-30">
        <h5 className="h5 text-gray-950">{user?.name}</h5>
        <div className="ml-auto flex flex-row items-center gap-2">
          <button
            className="h-8 w-8 gap-1 flex flex-row items-center justify-center bg-slate-100 rounded-full"
            onClick={() => {
              if (projectState.status === "edit") {
                setProjectState({ ...projectState, status: "showcase" });
              } else if (projectState.status === "showcase") {
                setProjectState({ ...projectState, status: "edit" });
              }
            }}
          >
            <i className="icon-20 text-gray-800 rounded-full">
              {projectState.status === "edit" ? <HiEye /> : <FiEdit3 />}
            </i>
          </button>
          <Link
            href="/profile"
            className="px-4 h-8 rounded-full bg-slate-100 text-gray-800 flex flex-row items-center"
          >
            <i className="icon-20">
              <FiChevronLeft />
            </i>
            <p className="small-h6">
              {language === "english"
                ? "PROFILE"
                : language === "francais" && "PROFIL"}
            </p>
          </Link>
        </div>
      </div>
      <ProjectBanner
        project={projectState.project}
        projectStatus={projectState.status}
      />
      <ProjectDescription
        project={projectState.project}
        projectStatus={projectState.status}
      />
      {projectState.status === "showcase" ? (
        <ProjectActivities
          project={projectState.project}
          projectStatus={projectState.status}
        />
      ) : (
        projectState.status === "edit" && (
          <ActivitiesForm
            project={projectState.project}
            projectStatus={projectState.status}
          />
        )
      )}
      {(projectState.project?.updates || projectState.status === "edit") && (
        <ProjectUpdates
          project={projectState.project}
          projectStatus={projectState.status}
        />
      )}
    </div>
  );
}

export default ProfileProject;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { projectId } = await context.params;
  if (session) {
    const profile = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/profile/${session.user.id}`
    ).then((data) => data.json());

    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const project = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/profile/projects/${projectId}`
    ).then((data) => data.json());

    const data = await Promise.all([profile, categories, project]);
    return {
      props: {
        profile: data[0],
        categories: data[1],
        project: data[2],
      },
    };
  } else {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }
}
