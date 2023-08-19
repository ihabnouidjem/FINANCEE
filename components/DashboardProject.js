import { dashboardContext } from "@/pages/dashboard";
import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

function DashboardProject({ project }) {
  const {
    _id,
    uid,
    uname,
    uemail,
    uimage,
    name,
    description,
    amount,
    likes,
    views,
    raised,
    donators,
    status,
    notes,
  } = project;
  const { postItem, dashboardState, setDashboardState } =
    useContext(dashboardContext);
  const [projectState, setProjectState] = useState({
    newNote: "",
    notes: [],
  });

  const noteRef = useRef(null);

  useEffect(() => {
    if (notes) {
      setProjectState({ ...projectState, newNote: "", notes: notes });
    } else {
      setProjectState({ ...projectState, newNote: "", notes: [] });
    }
  }, [project]);

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-lg sm:p-3 sm:rounded-xl bg-zinc-800">
      <div className="w-full flex flex-col gap-[2px]">
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Created by</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{uname}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Name</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{name}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Description</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{description}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Amount</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{amount}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Views</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{views}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Likes</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{likes}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Raised</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{raised}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Donators</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <p className="p w-full text-zinc-100">{donators}</p>
          </div>
        </div>
        {""}
        <div className="flex flex-row gap-3 xl:gap-6">
          <div className="min-w-[96px] lg:min-w-[110px]">
            <h6 className="h6 w-full text-zinc-50">Status</h6>
          </div>
          <p className="p text-zinc-100">-</p>
          <div className="w-full ">
            <h6
              className={`small-h6 max-w-full px-3 py-[4px] w-fit rounded-md ${
                status === "approved"
                  ? "bg-green-600 text-zinc-50"
                  : status === "promoted"
                  ? "bg-yellow-400 text-zinc-900"
                  : (status === "declined" ||
                      status === "blocked" ||
                      status === "pending") &&
                    "bg-red-600 text-zinc-50"
              } }`}
            >
              {status}
            </h6>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-2">
        <div className="w-full h-[48px] p-2 bg-zinc-700 rounded-lg shadow-md">
          {" "}
          <input
            className="w-full h-full bg-transparent p text-zinc-100"
            ref={noteRef}
            onChange={(e) => {
              setProjectState({ ...projectState, newNote: e.target.value });
            }}
            type="text"
            placeholder="Send note"
          />
        </div>
        <button
          className="w-[48px] h-[48px] flex items-center justify-center bg-zinc-700 rounded-lg shadow-md"
          onClick={() => {
            postItem(
              `/api/admin/projects/${_id}`,
              { notes: [...projectState.notes, projectState.newNote] },
              {
                msg: `${dashboardState.profile?.name} sent Note: "${projectState.newNote}" to ${name} (_id:${_id})`,
              }
            );
            noteRef.current.value = "";
          }}
        >
          <i className="icon-24 text-zinc-50">
            <RiSendPlaneFill />
          </i>
        </button>
      </div>
      <div className="w-full flex flex-wrap flex-row justify-center items-center gap-2">
        <button
          className="px-3 py-1 rounded-md bg-zinc-50 text-zinc-800"
          onClick={() => {
            postItem(
              `/api/admin/projects/${_id}`,
              { status: "approved" },
              {
                msg: `${dashboardState.profile?.name} approved the project ${name} (_id:${_id})`,
              }
            );
          }}
        >
          <h6 className="small-h6">Approve</h6>
        </button>
        <button
          className="px-3 py-1 rounded-md bg-zinc-900 text-zinc-50"
          onClick={() => {
            postItem(
              `/api/admin/projects/${_id}`,
              { status: "declined" },
              {
                msg: `${dashboardState.profile?.name} declined the project ${name} (_id:${_id})`,
              }
            );
          }}
        >
          <h6 className="small-h6">Decline</h6>
        </button>
        <button
          className="px-3 py-1 rounded-md bg-zinc-900 text-zinc-50"
          onClick={() => {
            postItem(
              `/api/admin/projects/${_id}`,
              { status: "blocked" },
              {
                msg: `${dashboardState.profile?.name} blocked the project ${name} (_id:${_id})`,
              }
            );
          }}
        >
          <h6 className="small-h6">Block</h6>
        </button>
        <button
          className="px-3 py-1 rounded-md bg-zinc-900 text-zinc-50"
          onClick={() => {
            postItem(
              `/api/admin/projects/${_id}`,
              { status: "promoted" },
              {
                msg: `${dashboardState.profile?.name} promoted the project ${name} (_id:${_id})`,
              }
            );
          }}
        >
          <h6 className="small-h6">Promote</h6>
        </button>
      </div>
    </div>
  );
}

export default DashboardProject;
