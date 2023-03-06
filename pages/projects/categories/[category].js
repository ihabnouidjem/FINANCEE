import Project from "@/components/Project";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { BsX, BsSearch } from "react-icons/bs";
import { stateContext } from "@/pages/_app";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

function CategoryProjects({ categoryProjects, category }) {
  const { navStatus, setNavStatus } = useContext(stateContext);

  const [projectsByCategory, setProjectsByCategory] = useState([]);
  const [currScroll, setCurrScroll] = useState(0);
  const [currScrollDist, setCurrScrollDist] = useState(0);

  useEffect(() => {
    setProjectsByCategory(categoryProjects);
  }, [categoryProjects]);
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
    <main className="main-projects">
      <Head>
        <title>FINANCEE | {category}</title>
        <meta name="description" content="FINANCEE projects page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="projectsPage-categories-header">
        <h5 className="h5 black-90">{category}</h5>
        <button className="projectsPage-categories-btn">
          <Link href={"/projects"}>
            <h6 className="h6 black-90"> all projects</h6>
          </Link>
        </button>
      </div>
      {projectsByCategory.length === 0 && (
        <div className="projectsPage-categories-text-container">
          <h6 className="h6 black-70 text-center">{`No project in ${category} category`}</h6>
        </div>
      )}

      <div className="projectsPage-projects">
        {projectsByCategory
          ? projectsByCategory.map(
              ({
                _id,
                id,
                header,
                description,
                raised,
                donators,
                projectImg,
              }) => {
                return (
                  <Project
                    key={_id}
                    id={id}
                    header={header}
                    description={description}
                    raised={raised}
                    donators={donators}
                    projectImg={
                      projectImg && projectImg !== ""
                        ? projectImg
                        : "/exeption/profileImage.png"
                    }
                  />
                );
              }
            )
          : "loading"}
      </div>
    </main>
  );
}

export default CategoryProjects;

export async function getServerSideProps(req, res) {
  const { category } = await req.query;
  const catProjects = await fetch(
    `http://localhost:3000/api/projects/categories/${category}`
  ).then((data) => {
    return data.json();
  });

  const categoryProjects = await catProjects.filter((project) => {
    return project.status === "approved" || project.status === "recommended";
  });

  return {
    props: {
      categoryProjects: categoryProjects,
      category: `${category}`,
    },
  };
}
