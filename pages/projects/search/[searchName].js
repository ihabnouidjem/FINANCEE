import ProjectsContainer from "@/components/ProjectsContainer";
import ProjectsFilter from "@/components/ProjectsFilter";
import { setCategories } from "@/features/categoriesSlice";
import { setProfile } from "@/features/profileSlice";
import { removeSession, setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Projects({ profile, projects, categories }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const [projectsState, setProjectsState] = useState({
    type: "search",
    search: "",
    projects: [],
  });

  useEffect(() => {
    setProjectsState({
      ...projectsState,
      search: router.query?.searchName,
      projects: projects,
    });
  }, [projects, router]);
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
    } else {
    }
  }, [profile]);
  useEffect(() => {
    if (session) {
      dispatch(setSession(session.user));
    } else {
      dispatch(removeSession());
    }
  }, [session]);
  return (
    <div className="min-h-screen w-full">
      <div className=" py-6 px-4 sm:px-8 xl:px-16">
        <ProjectsFilter />
      </div>
      <ProjectsContainer projects={projectsState} />
    </div>
  );
}

export default Projects;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { searchName } = await context.params;

  if (session) {
    const profile = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "domain here"
          : "http://localhost:3000"
      }/api/profile/${session.user.id}`
    ).then((data) => data.json());

    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const projects = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/projects/search/${searchName}`
    ).then((data) => data.json());

    const data = await Promise.all([profile, categories, projects]);
    return {
      props: {
        profile: data[0],
        categories: data[1],
        projects: data[2],
      },
    };
  } else {
    //no session here
    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const projects = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/projects/search/${searchName}`
    ).then((data) => data.json());

    const data = await Promise.all([categories, projects]);
    return {
      props: {
        categories: data[0],
        projects: data[1],
      },
    };
  }
}
