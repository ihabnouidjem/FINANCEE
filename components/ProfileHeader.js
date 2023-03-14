import React, { useContext, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";
import { projectContext } from "@/pages/profile/[projectId]";

function ProfileHeader(
  {
    // newHeader,
    // setNewHeader,
    // prflHeader,
    // modifyItem,
    // setModifyItem,
    // session,
    // addPrflItem,
    // updateProfile,
  }
) {
  const { projectState } = useContext(projectContext);
  const { addPrjctItem } = useContext(stateContext);
  const [newName, setNewName] = useState({
    status: false,
    state: "empty",
    name: { projectName: "" },
  });

  return (
    <div className="profile-forms-container">
      {projectState?.projectName && !newName.status ? (
        <>
          <div className="profile-text-container">
            <h4 className="h4 black-90 text-center">{`${projectState.projectName}`}</h4>
          </div>
          <div className="profile-form-buttons">
            <button
              className="profile-form-button"
              onClick={() => setNewName({ ...newName, status: true })}
            >
              <i className="icon-24 black-90">
                <AiTwotoneEdit />
              </i>
              <p className="small-p black-90">modify</p>
            </button>
            {/* <button
              className="profile-form-button"
              onClick={() => {
                addPrflItem(session?.user.id, { header: "" });
                updateProfile(session?.user.id);
              }}
            >
              <i className="icon-24 black-90">
                <AiOutlineDelete />
              </i>
              <p className="small-p black-90">delete</p>
            </button> */}
          </div>
        </>
      ) : (
        <div className="profile-form">
          <input
            onChange={(e) => {
              if (e.target.value != "") {
                setNewName({
                  ...newName,
                  state: "filled",
                  name: { projectName: `${e.target.value}` },
                });
              } else {
                setNewName({
                  ...newName,
                  state: "empty",
                  name: { projectName: `${e.target.value}` },
                });
              }
            }}
            className={
              projectState?.projectName
                ? "profile-form-input empty-fieled"
                : "profile-form-input"
            }
            placeholder={`${"project name ..."}`}
          />
          <div className="profile-form-buttons">
            <button
              onClick={() => {
                if (newName.status && newName.state === "filled") {
                  addPrjctItem(projectState._id, newName.name);
                  setNewName({
                    status: false,
                    state: "empty",
                    projectName: { projectName: "" },
                  });
                } else {
                  setNewName({
                    status: false,
                    state: "empty",
                    projectName: { projectName: "" },
                  });
                }
              }}
              className="profile-form-button"
            >
              <i className="icon-24 black-90">
                <BsCheck />
              </i>
              <p className="small-p black-90">apply</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
