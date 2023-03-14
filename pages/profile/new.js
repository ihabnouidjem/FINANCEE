import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useContext, useEffect, useState, useRef } from "react";

function New() {
  const projectNameRef = useRef(null);
  const projectDescRef = useRef(null);
  const projectAmountRef = useRef(null);
  const { data: session, status } = useSession();

  const [newProject, setNewProject] = useState({
    status: false,
    state: "empty",
    project: {
      uid: session?.user.id,
      uname: session?.user.name,
      projectName: "",
      description: "",
      amount: null,
    },
  });

  const addNewProject = async (project) => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NODE_ENV === "production" && "http://localhost:3000"
        }/api/projects/test`,
        project
      )
      .then((res) => {
        setNewProject({
          status: false,
          state: "empty",
          project: {
            uid: session?.user.id,
            projectName: "",
            description: "",
            amount: null,
          },
        });

        projectNameRef.current.value = "";
        projectDescRef.current.value = "";
        projectAmountRef.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (
      newProject.state === "empty" &&
      newProject.project.projectName !== "" &&
      newProject.project.description !== "" &&
      newProject.project.amount !== "" &&
      newProject.project.amount
    ) {
      setNewProject({ ...newProject, state: "filled" });
    } else if (
      newProject.state === "filled" &&
      (newProject.project.projectName === "" ||
        newProject.project.description === "" ||
        newProject.project.amount === "")
    ) {
      setNewProject({ ...newProject, state: "empty" });
    }
  }, [newProject]);

  useEffect(() => {
    setNewProject({
      ...newProject,
      project: { ...newProject.project, uid: session?.user.id },
    });
  }, [session]);

  return (
    <div className="newProject">
      <Head>
        <title>FINANCEE | {session?.user.name}</title>
        <meta name="description" content="FINANCEE profile page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="profile-user">
        {/* <div className="profile-user-img">
          {session && (
            <Image
              src={session.user.image}
              alt={""}
              width={100}
              height={100}
            ></Image>
          )}
        </div> */}
        <h5 className="h5 black-90">{`${session?.user.name}`}</h5>
      </div>
      <div className="newProject-form">
        <div className="newProject-form-header">
          <h5 className="h5 black-90">NEW PROJECT</h5>
        </div>
        <div className="newProject-form-input">
          <input
            ref={projectNameRef}
            type="text"
            placeholder="project name"
            onChange={(e) => {
              setNewProject({
                ...newProject,
                project: {
                  ...newProject.project,
                  projectName: `${e.target.value}`,
                },
              });
            }}
          />
        </div>
        <div className="newProject-form-ta-input">
          <textarea
            ref={projectDescRef}
            type="text"
            placeholder="project description"
            onChange={(e) => {
              setNewProject({
                ...newProject,
                project: {
                  ...newProject.project,
                  description: `${e.target.value}`,
                },
              });
            }}
          ></textarea>
        </div>
        <div className="newProject-form-input">
          <input
            ref={projectAmountRef}
            type="number"
            placeholder="needed amount"
            onChange={(e) => {
              setNewProject({
                ...newProject,
                project: { ...newProject.project, amount: e.target.value },
              });
            }}
          />
        </div>
        <div className="newProject-form-buttons">
          <button className="newProject-text-btn hover-text-btn">
            <h6 className="h6 black-80">cancel</h6>
          </button>
          <button
            className="newProject-text-btn hover-text-btn"
            onClick={() => {
              if (newProject.state === "filled") {
                addNewProject(newProject.project);
              }
            }}
          >
            <h6 className="h6 black-80">apply</h6>
          </button>
        </div>
      </div>
    </div>
  );
}

export default New;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
