import Checkout from "@/components/Checkout";
import ProjectActivities from "@/components/ProjectActivities";
import ProjectBanner from "@/components/ProjectBanner";
import ProjectDescription from "@/components/ProjectDescription";
import ProjectDonate from "@/components/ProjectDonate";
import ProjectUpdates from "@/components/ProjectUpdates";
import { setCategories } from "@/features/categoriesSlice";
import { scrollPage } from "@/features/pageSlice";
import { setProfile } from "@/features/profileSlice";
import { removeSession, setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appContext } from "../_app";

// export const projectContext = createContext();

function ProjectPage({ profile, categories, project }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const { projectState, setProjectState } = useContext(appContext);
  // const [projectState, setProjectState] = useState({
  //   status: "showcase",
  //   project: {},

  // });

  useEffect(() => {
    setProjectState({ ...projectState, status: "showcase", project: project });
  }, [project]);
  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  useEffect(() => {
    dispatch(
      setProfile({
        profile: profile,
        projects: profile.projects,
        status: profile.status,
      })
    );
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
    // <projectContext.Provider value={{ projectState, setProjectState }}>
    <div className="w-full min-h-screen">
      <ProjectBanner
        project={projectState.project}
        projectStatus={projectState.status}
      />
      {projectState.status === "showcase" && <ProjectDonate />}
      <ProjectDescription
        project={projectState.project}
        projectStatus={projectState.status}
      />
      <ProjectActivities
        project={projectState.project}
        projectStatus={projectState.status}
      />
      {projectState.project?.updates && (
        <ProjectUpdates
          project={projectState.project}
          projectStatus={projectState.status}
        />
      )}
      {projectState.checkoutState && <Checkout />}
    </div>
    // </projectContext.Provider>
  );
}

export default ProjectPage;

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
      }/api/projects/${projectId}`
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
    //no session here
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
      }/api/projects/${projectId}`
    ).then((data) => data.json());

    const data = await Promise.all([categories, project]);
    return {
      props: {
        categories: data[0],
        project: data[1],
      },
    };
  }
}
