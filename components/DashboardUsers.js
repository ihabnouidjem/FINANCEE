import DashboardUser from "@/components/DashboardUser";
import React from "react";

function DashboardUsers({ users, heading }) {
  return (
    <div className="w-full h-full flex flex-col pb-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden gap-6">
      <div className="min-h-[96px] w-full flex items-center flex-wrap gap-4">
        <h4 className="h4 text-zinc-50">{heading}</h4>
        <h4 className="light-h4 text-yellow-300">{users?.length}</h4>
      </div>
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        {users && users.length > 0 ? (
          users.map((user) => {
            return <DashboardUser key={user._id} user={user} />;
          })
        ) : (
          <h6 className="w-full h6 text-zinc-100">No USERS</h6>
        )}
      </div>
    </div>
  );
}

export default DashboardUsers;
