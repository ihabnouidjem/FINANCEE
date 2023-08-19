import { dashboardContext } from "@/pages/dashboard";
import React, { useContext } from "react";
import DashboardNotification from "./DashboardNotification";

function DashboardNotifications({ notifications }) {
  const { deleteNotifications } = useContext(dashboardContext);

  return (
    <div className="w-full h-full flex flex-col pb-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden gap-6">
      <div className="min-h-[96px] w-full flex items-center flex-wrap gap-4">
        <h4 className="h4 text-zinc-50">NOTIFICATIONS</h4>
        <h4 className="light-h4 text-yellow-300">{notifications?.length}</h4>
      </div>
      {notifications.length > 1 && (
        <div className="w-full flex flex-row justify-end">
          <button
            className="px-3 py-[2px] rounded-lg bg-red-100"
            onClick={() => {
              deleteNotifications();
            }}
          >
            <h6 className="small-h6 text-red-700">Delete all</h6>
          </button>
        </div>
      )}
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        {notifications && notifications.length ? (
          notifications.map((notification) => {
            return (
              <DashboardNotification
                key={notification._id}
                notification={notification}
              />
            );
          })
        ) : (
          <h6 className="w-full h6 text-zinc-100">No NOTIFICATION</h6>
        )}
      </div>
    </div>
  );
}

export default DashboardNotifications;
