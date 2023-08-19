import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function ProfileNav() {
  const language = useSelector((state) => state.language?.language);
  const status = useSelector((state) => state.profile?.status);
  const projects = useSelector((state) => state.profile?.projects);

  return (
    <div className="w-full flex flex-col gap-2">
      <Link
        href={`/profile`}
        className="w-[calc(50%-4px)] p-2 rounded-lg xl:rounded-xl bg-gray-950 "
      >
        <h6 className="h6 text-gray-50 w-full text-center text-ellipsis whitespace-nowrap overflow-hidden">
          PROFILE
        </h6>
      </Link>
      {status === "entrepreneur" && (
        <>
          <div className="w-full flex flex-wrap gap-2 py-2 border-t border-b border-gray-400">
            {projects && projects.length > 0 ? (
              <h6 className="h6 w-full">PROJECTS</h6>
            ) : (
              <h6 className="h6 w-full">No Projects yet</h6>
            )}

            {projects &&
              projects.map(({ insertedID, name }) => {
                return (
                  <Link
                    key={insertedID}
                    href={`/profile/${insertedID}`}
                    className="w-[calc(50%-4px)] p-2 rounded-lg xl:rounded-xl bg-gray-50 "
                  >
                    <h6 className="h6 text-gray-950 w-full text-center text-ellipsis whitespace-nowrap overflow-hidden">
                      {name}
                    </h6>
                  </Link>
                );
              })}
            <Link
              href={`/profile/new`}
              className="w-[calc(50%-4px)] p-2 rounded-lg xl:rounded-xl bg-gray-50 "
            >
              <h6 className="h6 text-gray-950 w-full text-center text-ellipsis whitespace-nowrap overflow-hidden">
                ADD PROJECT
              </h6>
            </Link>
          </div>
        </>
      )}

      <Link
        href={`/api/auth/signout`}
        className="w-[calc(50%-4px)] p-2 rounded-lg xl:rounded-xl bg-gray-50 "
        onClick={() => signOut()}
      >
        <h6 className="h6 text-gray-950 w-full text-center text-ellipsis whitespace-nowrap overflow-hidden">
          LOGOUT
        </h6>
      </Link>
    </div>
  );
}

export default ProfileNav;
