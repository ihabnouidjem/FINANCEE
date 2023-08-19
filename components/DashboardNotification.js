import { dashboardContext } from "@/pages/dashboard";
import React, { useContext } from "react";
import { BsBell, BsX, BsXLg } from "react-icons/bs";

function DashboardNotification({ notification }) {
  const { _id, msg } = notification;
  const { setDashboardState, dashboardState, deleteNotification } =
    useContext(dashboardContext);
  return (
    <div className="w-full flex flex-row gap-2 p-2 rounded-lg sm:p-3 sm:rounded-xl bg-zinc-800 text-zinc-50">
      <i className="icon-24">
        <BsBell />
      </i>

      <p className="w-full p">{msg}</p>
      <i
        className="icon-24"
        onClick={() => {
          deleteNotification(_id);
        }}
      >
        <BsX />
      </i>
    </div>
  );
}

export default DashboardNotification;
