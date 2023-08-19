import { dashboardContext } from "@/pages/dashboard";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  BsBell,
  BsCheckCircle,
  BsClock,
  BsStar,
  BsXCircle,
} from "react-icons/bs";
import { FaProjectDiagram, FaRegComments } from "react-icons/fa";
import { IoIosPeople, IoMdLogOut } from "react-icons/io";
import { MdBlock, MdOutlineCampaign } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";

function DashboardNav() {
  const { dashboardState, setDashboardState } = useContext(dashboardContext);
  return (
    <div
      className={`min-w-[280px] w-[min(280px,100%)] sm:min-w-[300px] sm:w-[300px] lg:min-w-[324px] lg:w-[324px] flex flex-col h-full pl-3 sm:pl-8 xl:pl-16 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden `}
    >
      <Link href="/" className="w-full min-h-[96px] flex items-center px-6 ">
        <h4 className="h4 text-gray-950 linear-yellow">FINANCEE</h4>
      </Link>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "dashboard" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "dashboard"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <AiOutlineDashboard />
        </i>
        <h6 className="med-h6">Dashboard</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "notifications" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "notifications"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <BsBell />
        </i>
        <h6 className="med-h6">Notifications</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "projects" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "projects"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <FaProjectDiagram />
        </i>
        <h6 className="med-h6">Projects</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "pending" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "pending"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <BsClock />
        </i>
        <h6 className="med-h6">Pending</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "approved" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "approved"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <BsCheckCircle />
        </i>
        <h6 className="med-h6">Approved</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "declined" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "declined"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <BsXCircle />
        </i>
        <h6 className="med-h6">Declined</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "promoted" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "promoted"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <BsStar />
        </i>
        <h6 className="med-h6">Promoted</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "blocked" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "blocked"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <MdBlock />
        </i>
        <h6 className="med-h6">Blocked</h6>
      </button>
      <button
        onClick={() => setDashboardState({ ...dashboardState, page: "users" })}
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "users" ? "bg-yellow-400" : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <IoIosPeople />
        </i>
        <h6 className="med-h6">Users</h6>
      </button>
      <button
        onClick={() => setDashboardState({ ...dashboardState, page: "admins" })}
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "admins"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <IoIosPeople />
        </i>
        <h6 className="med-h6">Admins</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "entrepreneurs" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "entrepreneurs"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <IoIosPeople />
        </i>
        <h6 className="med-h6">Entrepreneurs</h6>
      </button>
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "campaigns" })
        }
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "campaigns"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <MdOutlineCampaign />
        </i>
        <h6 className="med-h6">Campaigns</h6>
      </button>
      {/* <button
      onClick={()=>setDashboardState({...dashboardState, page:"messages"})}
       className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800">
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "messages"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <FaRegComments />
        </i>
        <h6 className="med-h6">Messages</h6>
      </button> */}
      <button
        onClick={() =>
          setDashboardState({ ...dashboardState, page: "settings" })
        }
        className=" w-full min-h-[56px] mt-auto flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full ${
            dashboardState.page === "settings"
              ? "bg-yellow-400"
              : "bg-transparent"
          } `}
        >
          {""}
        </div>
        <i className="icon-24">
          <IoSettingsOutline />
        </i>
        <h6 className="med-h6">Settings</h6>
      </button>
      <Link
        href="/api/auth/signout"
        onClick={() => signOut()}
        className=" w-full min-h-[56px] flex flex-row items-center gap-6  overflow-hidden text-zinc-800"
      >
        <div
          className={`w-[4px] h-full bg-transparent
           `}
        >
          {""}
        </div>
        <i className="icon-24">
          <IoMdLogOut />
        </i>
        <h6 className="h6">Logout</h6>
      </Link>
    </div>
  );
}

export default DashboardNav;
