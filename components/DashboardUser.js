import Image from "next/image";
import React, { useContext } from "react";
import { dashboardContext } from "../pages/dashboard";

function DashboardUser({ user }) {
  const { _id, id, name, image, email, phone, baridimob, projects, status } =
    user;
  const { dashboardState, postItem } = useContext(dashboardContext);
  return (
    <div className="w-full flex flex-col gap-4 p-2 rounded-lg sm:p-3 sm:rounded-xl bg-zinc-800">
      <div className="w-full flex flex-row gap-2 items-center">
        <Image
          className="w-[56px] h-[56px] rounded-full flex items-center justify-center object-cover"
          src={image}
          alt="profile img"
          width={300}
          height={300}
        />
        <div className="w-full flex flex-col gap-[2px]">
          <h6 className="h6 text-zinc-50 w-full">{name}</h6>
          <h6 className="small-h6 text-zinc-300 w-full">{id}</h6>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <h6 className="w-full small-h6 text-zinc-50">CONTACT INFO</h6>
        <p className="w-full small-p text-zinc-300 pl-2">{email}</p>
        <p className="w-full small-p text-zinc-300 pl-2">{phone}</p>
      </div>
      {!(status === "admin") && (
        <>
          <div className="flex flex-col gap-1 w-full">
            <h6 className="w-full small-h6 text-zinc-50">PAYMENT INFO</h6>
            <p className="w-full small-p text-zinc-300 pl-2">{baridimob}</p>
          </div>

          {projects && projects.length > 0 && (
            <div className="flex flex-row flex-wrap gap-1 w-full">
              <h6 className="w-full small-h6 text-zinc-50">PROJECTS</h6>
              {projects.map(({ insertedID, name }) => {
                return (
                  <p
                    key={insertedID}
                    className="small-p text-zinc-100 px-3 py-1 rounded-md bg-zinc-700"
                  >
                    {name}
                  </p>
                );
              })}
            </div>
          )}
        </>
      )}
      <div className="w-full flex flex-row justify-end">
        <button
          className={`px-3 py-1 rounded-md ${
            status === "admin"
              ? "bg-red-600 text-zinc-50"
              : "bg-blue-600 text-zinc-50"
          }`}
          onClick={() => {
            if (status !== "admin") {
              postItem(
                `/api/admin/users/${_id}`,
                { status: "admin" },
                {
                  msg: `${dashboardState.profile?.name} promoted "${name}" to admin. (_id:${_id})`,
                }
              );
            } else {
              postItem(
                `/api/admin/users/${_id}`,
                { status: "new" },
                {
                  msg: `${dashboardState.profile?.name} demoted "${name}" to regular user. (_id:${_id})`,
                }
              );
            }
          }}
        >
          <h6 className="small-h6">
            {status === "admin" ? "Remove admin" : "Add to admins"}
          </h6>
        </button>
      </div>
    </div>
  );
}

export default DashboardUser;
