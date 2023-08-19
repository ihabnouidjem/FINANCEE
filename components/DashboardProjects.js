import React from "react";
import DashboardProject from "./DashboardProject";

function DashboardProjects({ heading, projects }) {
  return (
    <div className="w-full h-full flex flex-col pb-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden gap-6">
      <div className="min-h-[96px] w-full flex items-center flex-wrap gap-4">
        <h4 className="h4 text-zinc-50">{heading}</h4>
        <h4 className="light-h4 text-yellow-300">{projects?.length}</h4>
      </div>
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => {
            return <DashboardProject key={project._id} project={project} />;
          })
        ) : (
          <h6 className="w-full h6 text-zinc-100">No PROJECTS</h6>
        )}
      </div>
    </div>
  );
}

export default DashboardProjects;
