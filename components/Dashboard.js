import React from "react";
import DashboardNotification from "./DashboardNotification";
import DashboardProject from "./DashboardProject";

function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col pb-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden gap-6">
      <div className="min-h-[96px] w-full flex items-center">
        <h4 className="h4 w-full text-ellipsis whitespace-nowrap overflow-hidden text-zinc-50">
          DASHBOARD
        </h4>
      </div>
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        <div className="w-full flex items-center">
          <h5 className="h5 w-full text-ellipsis whitespace-nowrap overflow-hidden text-zinc-50">
            Notifications
          </h5>
        </div>
        {/* <DashboardNotification />
        <DashboardNotification /> */}
      </div>
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        <div className="w-full flex items-center">
          <h5 className="h5 w-full text-ellipsis whitespace-nowrap overflow-hidden text-zinc-50">
            Projects
          </h5>
        </div>
        {/* <DashboardProject />
        <DashboardProject /> */}
      </div>
    </div>
  );
}

export default Dashboard;
