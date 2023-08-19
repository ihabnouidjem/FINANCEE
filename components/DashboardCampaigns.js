import { dashboardContext } from "@/pages/dashboard";
import Image from "next/image";
import React, { useContext, useRef } from "react";
import DashboardNewCampaign from "./DashboardNewCampaign";

function DashboardCampaigns() {
  const { dashboardState, deleteCampaign } = useContext(dashboardContext);
  return (
    <div className="w-full h-full flex flex-col pb-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden gap-6">
      <div className="min-h-[96px] w-full flex items-center flex-wrap gap-4">
        <h4 className="h4 text-zinc-50">CAMPAIGNS</h4>
        <h4 className="light-h4 text-yellow-300">
          {dashboardState.campaigns?.length}
        </h4>
      </div>
      <DashboardNewCampaign />
      <div className="w-full flex flex-col gap-4">
        {dashboardState.campaigns &&
          dashboardState.campaigns.length > 0 &&
          dashboardState.campaigns.map(({ _id, image }) => {
            return (
              <div className="w-full flex flex-col gap-2" key={_id}>
                <Image
                  className="w-full rounded-lg sm:rounded-xl"
                  src={image}
                  width={2000}
                  height={700}
                  alt="image"
                />
                <button
                  className="px-3 py-2 bg-red-600 ml-auto rounded-lg"
                  onClick={() => {
                    deleteCampaign(_id, {
                      msg: `${dashboardState.profile?.name} deleted a campaign`,
                    });
                  }}
                >
                  <h6 className="small-h6 text-zinc-50">Delete</h6>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DashboardCampaigns;
