import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import HomeProjects from "@/components/HomeProjects";
import Campaigns from "@/components/Campaigns";
import Payment from "@/components/Payment";
import HowWeWork from "@/components/HowWeWork";
import { createContext, useContext, useEffect, useState } from "react";
import { stateContext } from "./_app";

export const homeContext = createContext();

export default function Home(recommendedProjects) {
  const { data: session, status } = useSession();
  const [recommended, setRecommended] = useState([]);
  const [currentBanner, setCurrentBanner] = useState({});
  const [currScroll, setCurrScroll] = useState(0);
  const [currScrollDist, setCurrScrollDist] = useState(0);

  const { navStatus, setNavStatus } = useContext(stateContext);

  useEffect(() => {
    const horizontalScroll = () => {
      setCurrScroll(window.scrollY);
    };
    horizontalScroll();
    document.addEventListener("scroll", horizontalScroll);
    return () => document.removeEventListener("scroll", horizontalScroll);
  }, []);
  useEffect(() => {
    setCurrScrollDist(currScroll - navStatus.horScroll);
    if (currScrollDist >= 0 && currScroll > 400) {
      setNavStatus({
        ...navStatus,
        status: false,
        horScroll: currScroll,
        distScrolled: currScrollDist,
      });
    } else if (currScrollDist < 0 && currScroll > 400) {
      setNavStatus({
        ...navStatus,
        status: true,
        horScroll: currScroll,
        distScrolled: currScrollDist,
      });
    } else if (currScroll <= 400) {
      setNavStatus({
        ...navStatus,
        status: true,
        horScroll: currScroll,
        distScrolled: currScrollDist,
      });
    }
  }, [currScroll]);
  useEffect(() => {
    setRecommended(recommendedProjects.recommendedProjects);
  }, [recommendedProjects]);

  return (
    <>
      <Head>
        <title>FINANCEE</title>
        <meta name="description" content="FINANCEE home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="main">
        <homeContext.Provider
          value={{ recommended, currentBanner, setCurrentBanner }}
        >
          <Banner />
          {recommended.length >= 4 && <HomeProjects />}
          <Campaigns />
          <Payment />
          <HowWeWork />
        </homeContext.Provider>
      </main>

      <div></div>
    </>
  );
}

export async function getServerSideProps() {
  const recommendedProjects = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NODE_ENV === "production" &&
          "https://financee-nu.vercel.app"
    }/api`
  ).then((data) => {
    return data.json();
  });

  return {
    props: {
      recommendedProjects,
    },
  };
}
