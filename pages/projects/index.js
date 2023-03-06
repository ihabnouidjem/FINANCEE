import Project from "@/components/Project";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { BsX, BsSearch } from "react-icons/bs";
import { stateContext } from "@/pages/_app";
import axios from "axios";
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai";
import Head from "next/head";

function Projects({ allProjects }) {
  const { data: session, status } = useSession();
  const { projects, setProjects } = useContext(stateContext);
  const { navStatus, setNavStatus } = useContext(stateContext);

  const [currScroll, setCurrScroll] = useState(0);
  const [currScrollDist, setCurrScrollDist] = useState(0);
  const [loading, setLoading] = useState({ loading: false });
  const [search, setSearch] = useState({
    status: false,
    currHeader: "",
    header: "",
    noMatch: false,
    empty: true,
    projects: [],
  });

  const searchInputRef = useRef(null);

  const clearSearchFilter = () => {
    setProjects(allProjects);
    setSearch({
      ...search,
      status: false,
      currHeader: "",
      header: "",
      noMatch: false,
      empty: true,
    });
  };
  const searchProjects = (projectName) => {
    setLoading({ ...loading, loading: true });
    setSearch({
      ...search,
      status: true,
      currHeader: search.header,
      empty: true,
    });
    searchInputRef.current.value = "";
    axios
      .post(`https://financee.onrender.com/api/projects/search`, {
        header: `${projectName}`,
      })
      .then(async (res) => {
        await setProjects(res.data);
        setLoading({ ...loading, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(search);
  };

  useEffect(() => {
    if (allProjects) {
      setProjects(allProjects);
    }
  }, []);

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
        <title>FINANCEE | projects</title>
        <meta name="description" content="FINANCEE projects page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="projectsPage-filter">
        <div className="projectsPage-filter-search">
          <h4 className="h4 black-90">filter</h4>
          <div className="filter-search">
            <input
              ref={searchInputRef}
              type={"text"}
              placeholder="search projects"
              className="filter-search-input"
              onChange={(e) =>
                setSearch({ ...search, empty: false, header: e.target.value })
              }
            />
            {searchInputRef.current?.value && !search.empty && (
              <button
                className="search-btn exit-search-btn"
                onClick={() => {
                  setSearch({ ...search, empty: true });
                  searchInputRef.current.value = "";
                }}
              >
                <i className="icon-32 black-90">
                  <BsX />
                </i>
              </button>
            )}

            <button
              className="search-btn"
              onClick={() => {
                searchInputRef.current?.value &&
                  !search.empty &&
                  searchProjects(search?.header);
              }}
            >
              <i className="icon-32 black-90">
                <BsSearch />
              </i>
            </button>
          </div>
        </div>
        {/* <div className="projectsPage-searching">
            <h6 className="h6 black-90">Searching ...</h6>
          </div> */}
        {loading.loading ? (
          <div className={"reloading"}>
            <div className="reloading-icons">
              <i className="icon-40 reloading-icon-1 black-70">
                <AiOutlineLoading3Quarters />
              </i>
              <i className="icon-32 reloading-icon-2 black-70">
                <AiOutlineLoading />
              </i>
            </div>
          </div>
        ) : (
          search.status && (
            <div className="projectsPage-search-status">
              <h6 className="h6 black-90">
                {projects.length !== 0
                  ? `results for ${search.currHeader}:`
                  : `no match for ${search.currHeader}`}
              </h6>
              <button
                className="projectsPage-search-btn"
                onClick={() => clearSearchFilter()}
              >
                <h6 className="h6 black-90">clear filter</h6>
              </button>
            </div>
          )
        )}
      </div>
      {!loading.loading && (
        <div className="projectsPage-projects">
          {projects
            ? projects.map(
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
      )}
    </main>
  );
}

export default Projects;

export async function getServerSideProps() {
  const projects = await fetch(
    `https://financee.onrender.com/api/projects`
  ).then((data) => {
    return data.json();
  });
  const allProjects = await projects.filter((project) => {
    return project.status === "approved" || project.status === "recommended";
  });

  return {
    props: {
      allProjects,
    },
  };
}
