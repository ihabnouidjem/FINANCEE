import React, { createContext, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import ProfileMSG from "@/components/ProfileMSG";
import ProfileHeader from "@/components/ProfileHeader";
import { stateContext } from "../_app";
import axios from "axios";
import { BsEye, BsFillSuitHeartFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
import ProfileDescription from "@/components/ProfileDescription";
import ProfileImage from "@/components/ProfileImage";
import ProfileElement from "@/components/ProfileElement";
import ProfileCategory from "@/components/ProfileCategory";

export const projectContext = createContext();

function ProfileUser({ project, pid }) {
  const { data: session, status } = useSession();

  const { reload, setReload } = useContext(stateContext);

  const [projectState, setProjectState] = useState(project);

  useEffect(() => {
    setProjectState(project);
  }, [project]);
  useEffect(() => {
    if (reload.status && reload.function === "updateProject") {
      axios
        .get(
          `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NODE_ENV === "production" &&
                "https://financee-nu.vercel.app"
          }/api/projects/test/${pid}`
        )
        .then((res) => {
          setProjectState(res.data);
          setReload({
            status: false,
            function: "",
            uid: "",
            path: "",
          });
        });
    }
  }, [reload]);
  return (
    <projectContext.Provider value={{ session, projectState }}>
      <Head>
        <title>FINANCEE | {projectState?.projectName}</title>
        <meta name="description" content="FINANCEE profile/project page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!projectState ? (
        <div className="profile">
          <h6 className="h6 black-70">loading ...</h6>
        </div>
      ) : (
        <div className="profile">
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
            {/* remove this ----------------------------------------------------- */}
            {/* <button
          className="profile-delete"
          onClick={() =>
            deleteProject(session?.user.id, { id: `${session?.user.id}` })
          }
        >
          <h6 className="h6 red-pink">delete</h6>
        </button> */}
          </div>
          {/* remove this ------------------------------------- */}
          {/* <div className="profile-projects">
        <div className="profile-projects-header">
          <h5 className="h5 black-90">MY PROJECTS</h5>
          <Link
            href={"/profile/new"}
            className={`profile-text-btn linear-gold`}
          >
            <h6 className="h6 white">New Project</h6>
          </Link>
        </div>
      </div> */}
          <div className={"profile-project"}>
            {/* remove this ---------------------------------------------- */}
            {/* {projectState.adminMSG?.status && (
          <ProfileMSG message={projectState.adminMSG} type="blueMSG" />
        )}
        {projectState.adminMassMSG?.status && (
          <ProfileMSG message={projectState.adminMassMSG} type="blackMSG" />
        )} */}

            {projectState.statusMSG?.status && (
              <ProfileMSG
                message={projectState?.statusMSG}
                type={
                  projectState.status === "blocked" ||
                  projectState.status === "declined"
                    ? "redMSG"
                    : "greenMSG"
                }
                pid={projectState?._id}
              />
            )}

            <ProfileHeader />
            <div className="profile-progress-bar">
              <div className="profile-progress-items">
                <div className="profile-progress-item">
                  <i className="icon-40 black-80">
                    <BsFillSuitHeartFill />
                  </i>
                  <h6 className="h6 black-80">{`${
                    projectState.likes ? projectState.likes : 0
                  } likes`}</h6>
                </div>
                <div className="profile-progress-item">
                  <i className="icon-40 black-80">
                    <GiMoneyStack />
                  </i>
                  <h6 className="h6 black-80">{`${
                    projectState.raised ? projectState.raised : 0
                  } DA raised`}</h6>
                </div>
              </div>
              <div className="profile-progress-items">
                <div className="profile-progress-item">
                  <i className="icon-40 black-80">
                    <FaDonate />
                  </i>
                  <h6 className="h6 black-80">{`${
                    projectState.donators ? projectState.donators : 0
                  } donators`}</h6>
                </div>
                <div className="profile-progress-item">
                  <i className="icon-40 black-80">
                    <BsEye />
                  </i>
                  <h6 className="h6 black-80">{`${
                    projectState.views ? projectState.views : 0
                  } views`}</h6>
                </div>
              </div>
            </div>
            <ProfileDescription />
            <div className="profile-text-container">
              <h6 className="h6 black-70 text-center">{"IMAGE"}</h6>
            </div>
            <ProfileImage />
            <div className="profile-text-container">
              <h6 className="h6 black-70 text-center">{"AMOUNT NEEDED"}</h6>
            </div>
            <ProfileElement
              element={"amount"}
              profileElement={projectState.amount}
              session={session}
              project={projectState}
            />
            <div className="profile-text-container">
              <h6 className="h6 black-70 text-center">{"CATEGORY"}</h6>
            </div>
            <ProfileCategory />
          </div>{" "}
        </div>
      )}
    </projectContext.Provider>
  );
}

export default ProfileUser;

export async function getServerSideProps(context) {
  const { projectId } = await context.params;

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile/new`}`,
        peranent: false,
      },
    };
  }

  const profile = await fetch(
    `https://financee-nu.vercel.app/api/profile/${session?.user.id}`
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));

  var projectAllowed = true;

  await profile.projects?.map((project) => {
    if (project.insertedID === projectId) {
      projectAllowed = false;
    }
  });
  console.log(session, projectAllowed, profile);

  if (projectAllowed) {
    return {
      redirect: {
        destination: `/profile`,
        peranent: false,
      },
    };
  }

  const project = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NODE_ENV === "production" &&
          "https://financee-nu.vercel.app"
    }/api/projects/test/${projectId}`
  ).then((data) => {
    return data.json();
  });
  return {
    props: {
      project,
      pid: projectId,
    },
  };
}
