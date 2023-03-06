import Head from "next/head";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { stateContext } from "./_app";

function About() {
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
  return (
    <div className="about">
      <Head>
        <title>FINANCEE | about</title>
        <meta name="description" content="FINANCEE about page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="about-not-created-yet">
        <h6 className="h6 black-90">This page is not created yet</h6>
        <Link href="/" className="about-text-btn">
          <h6 className="h6 black-90">home</h6>{" "}
        </Link>
      </div>
    </div>
  );
}

export default About;
