import { setCategories } from "@/features/categoriesSlice";
import { setProfile } from "@/features/profileSlice";
import { setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function About({ profile, categories }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

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
    }
  }, [session]);
  return <div className="min-h-screen w-full">About</div>;
}

export default About;

export async function getServerSideProps(context) {
  const session = await getSession(context);
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

    const data = await Promise.all([profile, categories]);
    return {
      props: {
        profile: data[0],
        categories: data[1],
      },
    };
  } else {
    //no session here
  }
}
