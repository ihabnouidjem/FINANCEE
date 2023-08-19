import { setProfile } from "@/features/profileSlice";
import { removeSession, setSession } from "@/features/sessionSlice";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

function New({ profile }) {
  const { data: session, status } = useSession();
  const language = useSelector((state) => state.language?.language);
  const user = useSelector((state) => state.session?.session);
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);

  const [newProject, setNewProject] = useState({
    msg: {
      type: "Note",
      details:
        "details details details details details details details details details",
    },
    project: {
      uid: user.id,
      uname: user.name,
      uemail: user.email,
      uimage: user.image,
      name: "",
      description: "",
      amount: "",
    },
  });

  const postProject = async (project, path, profile, notification) => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "domain here"
            : "http://localhost:3000"
        }${path}`,
        project
      )
      .then((res) => {
        axios
          .post(
            `${
              process.env.NODE_ENV === "production"
                ? "domain here"
                : "http://localhost:3000"
            }/api/profile/${profile.id}`,
            {
              projects: [
                ...profile.projects,
                {
                  insertedID: res.data?.insertedId,
                  name: project.name,
                  description: project.description,
                  amount: project.amount,
                },
              ],
            }
          )
          .then((res) => {
            if (res.data) {
              dispatch(
                setProfile({
                  profile: res.data,
                  projects: res.data.projects,
                  status: res.data.status,
                })
              );
              nameRef.current.value = "";
              descriptionRef.current.value = "";
              amountRef.current.value = "";
            }
          });
      });
  };

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
    } else {
      dispatch(removeSession());
    }
  }, [session]);
  useEffect(() => {
    if (user) {
      setNewProject({
        ...newProject,
        project: {
          ...newProject.project,
          uid: user.id,
          uname: user.name,
          uemail: user.email,
          uimage: user.image,
        },
      });
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <div className="w-full flex flex-row items-center justify-between h-[40px] sm:h-[48px] px-4 sm:px-8 xl:px-16 border-b border-gray-400 sticky top-[56px] sm:top-[64px] bg-white z-30">
        <h5 className="h5 text-gray-950">{user?.name}</h5>
        <Link
          href="/profile"
          className="px-4 py-1 rounded-lg bg-slate-100 text-gray-800 flex flex-row items-center"
        >
          <i className="icon-20">
            <FiChevronLeft />
          </i>
          <p className="small-h6">PROFILE</p>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-4 items-center py-6 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1000px)] flex flex-col gap-1 items-center">
          <h5 className="h5 text-gray-900 w-full">
            {language === "english" ? "NEW PROJECT" : "NOUVEAU PROJET"}
          </h5>
          <div className="w-full rounded-md ">
            <p className="p text-gray-700 w-full">
              <span className="h6 text-gray-800">{`${newProject.msg.type}: `}</span>
              {newProject.msg.details}
            </p>
          </div>
        </div>

        <div className="w-[min(100%,1000px)] flex flex-col items-center gap-1">
          <h6 className="h6 text-gray-800 w-full">Project Name</h6>
          <div className="w-full h-10 sm:h-12 border border-gray-500 rounded-xl sm:rounded-2xl px-2 overflow-hidden ">
            <input
              className="p w-full h-full"
              ref={nameRef}
              onChange={(e) => {
                setNewProject({
                  ...newProject,
                  project: { ...newProject.project, name: e.target.value },
                });
              }}
              type="text"
              placeholder="Project Name"
            />
          </div>
        </div>

        <div className="w-[min(100%,1000px)] flex flex-col items-center gap-1">
          <h6 className="h6 text-gray-800 w-full">Project Description</h6>
          <div className="w-full h-[128px] sm:h-[136px] border border-gray-500 rounded-xl sm:rounded-2xl px-2 overflow-hidden ">
            <textarea
              className="p w-full h-full"
              ref={descriptionRef}
              onChange={(e) => {
                setNewProject({
                  ...newProject,
                  project: {
                    ...newProject.project,
                    description: e.target.value,
                  },
                });
              }}
              placeholder="Description here ..."
            ></textarea>
          </div>
        </div>

        <div className="w-[min(100%,1000px)] flex flex-col items-center gap-1">
          <h6 className="h6 text-gray-800 w-full">Amount Needed</h6>
          <div className="w-full h-10 sm:h-12 border border-gray-500 rounded-xl sm:rounded-2xl px-2 overflow-hidden ">
            <input
              className="p w-full h-full"
              ref={amountRef}
              onChange={(e) => {
                setNewProject({
                  ...newProject,
                  project: { ...newProject.project, amount: e.target.value },
                });
              }}
              type="text"
              placeholder="Amount Needed"
            />
          </div>
        </div>

        <div className="w-[min(100%,1000px)] flex flex-row justify-end gap-3 sm:gap-4">
          <button
            className="px-6 py-2 rounded-2xl hover:bg-slate-100"
            onClick={() => {
              setNewProject({
                ...newProject,
                project: {
                  ...newProject.project,
                  name: "",
                  description: "",
                  amount: "",
                },
              });
              nameRef.current.value = "";
              descriptionRef.current.value = "";
              amountRef.current.value = "";
            }}
          >
            <h6 className="h6 text-gray-800">cancel</h6>
          </button>
          <button
            className="px-6 py-2 rounded-2xl hover:bg-slate-100"
            onClick={() => {
              if (profile)
                postProject(newProject.project, "/api/projects", profile);
            }}
          >
            <h6 className="h6 text-gray-800">submit</h6>
          </button>
        </div>
      </div>
    </div>
  );
}

export default New;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const profile = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "domain here"
          : "http://localhost:3000"
      }/api/profile/${session.user.id}`
    ).then((data) => data.json());
    return {
      props: {
        profile,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }
}
