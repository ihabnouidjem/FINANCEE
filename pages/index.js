import Banner from "@/components/Banner";
import HomeCampaigns from "@/components/HomeCampaigns";
import HomeHWW from "@/components/HomeHWW";
import HomePayment from "@/components/HomePayment";
import HomeProjects from "@/components/HomeProjects";
import HomeWeProvide from "@/components/HomeWeProvide";
import { setCategories } from "@/features/categoriesSlice";
import { scrollPage } from "@/features/pageSlice";
import { setProfile } from "@/features/profileSlice";
import { setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const homeContext = createContext();

function Home({ profile, promoted, latest, banner, categories }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [homeState, setHomeState] = useState({ promoted, latest, banner });

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  useEffect(() => {
    setHomeState({
      ...homeState,
      promoted: promoted,
      latest: latest,
      banner: banner,
    });
  }, [promoted, banner]);
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
  useEffect(() => {
    const scrollPos = () => {
      dispatch(scrollPage(window.scrollY));
    };
    scrollPos();

    document.addEventListener("scroll", scrollPos);
    return () => document.removeEventListener("scroll", scrollPos);
  }, []);
  return (
    <div className="min-h-screen">
      <homeContext.Provider
        value={{
          banner: homeState.banner,
          promoted: homeState.promoted,
          latest: homeState.latest,
        }}
      >
        <Banner />
        <HomeProjects />
        <HomeCampaigns />
        {/* <HomePayment /> */}
        <HomeWeProvide />
        <HomeHWW />
      </homeContext.Provider>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const profile = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/profile/${session.user.id}`
    ).then((data) => data.json());

    const promoted = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/projects/promoted`
    ).then((data) => data.json());

    const latest = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/projects/latest`
    ).then((data) => data.json());

    const banner = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/global/banner`
    ).then((data) => data.json());

    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const data = await Promise.all([
      profile,
      promoted,
      latest,
      banner,
      categories,
    ]);
    return {
      props: {
        profile: data[0],
        promoted: data[1],
        latest: data[2],
        banner: data[3],
        categories: data[4],
      },
    };
  } else {
    //no session here

    const promoted = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/projects/promoted`
    ).then((data) => data.json());

    const latest = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/projects/latest`
    ).then((data) => data.json());

    const banner = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/global/banner`
    ).then((data) => data.json());

    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const data = await Promise.all([promoted, latest, banner, categories]);
    return {
      props: {
        promoted: data[0],
        latest: data[1],
        banner: data[2],
        categories: data[3],
      },
    };
  }
}
