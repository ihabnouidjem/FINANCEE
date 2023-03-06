import { stateContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import AdminProject from "./adminProject";

function AdminProjects({ filteredProjects }) {
  return (
    <div className="admin-projects-list">
      {filteredProjects &&
        filteredProjects.map(
          ({
            _id,
            id,
            header,
            status,
            description,
            likes,
            views,
            raised,
            donators,
          }) => {
            return (
              <AdminProject
                key={_id}
                id={id}
                header={header}
                status={status}
                description={description}
                likes={likes}
                views={views}
                donators={donators}
                donations={raised}
              />
            );
          }
        )}
    </div>
  );
}

export default AdminProjects;
