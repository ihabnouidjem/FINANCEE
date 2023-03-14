import React, { useContext, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";
import { projectContext } from "@/pages/profile/[projectId]";

function ProfileDescription(
  {
    // newDescription,
    // setNewDescription,
    // projectState.description,
    // modifyItem,
    // setModifyItem,
    // session,
    // addPrflItem,
    // updateProfile,
  }
) {
  const { addPrjctItem } = useContext(stateContext);
  const { session, projectState } = useContext(projectContext);

  const [newDescription, setNewDescription] = useState({
    status: false,
    state: "empty",
    newDesc: { description: "" },
  });
  // console.log(newDescription);
  return (
    <div className="profile-forms-container">
      {projectState.description && !newDescription.status ? (
        <>
          <div className="profile-text-container">
            <p className="p black-50 text-center">{`${projectState.description}`}</p>
          </div>
          <div className="profile-form-buttons">
            <button
              className="profile-form-button"
              onClick={() =>
                setNewDescription({ ...newDescription, status: true })
              }
            >
              <i className="icon-24 black-90">
                <AiTwotoneEdit />
              </i>
              <p className="small-p black-90">modify</p>
            </button>
            {/* <button
              className="profile-form-button"
              onClick={() => {
                addPrflItem(session?.user.id, { description: "" });
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
        <div className="profile-form-description">
          <textarea
            className={
              !projectState.description
                ? "profile-form-textarea empty-fieled"
                : "profile-form-textarea"
            }
            placeholder="description"
            onChange={(e) => {
              if (e.target.value !== "") {
                setNewDescription({
                  ...newDescription,
                  state: "filled",
                  newDesc: { description: `${e.target.value}` },
                });
              } else {
                setNewDescription({
                  ...newDescription,
                  state: "empty",
                  newDesc: { description: `${e.target.value}` },
                });
              }
            }}
          ></textarea>
          <div className="profile-form-ta-buttons">
            <button
              className="profile-form-button"
              onClick={() => {
                if (
                  newDescription.status &&
                  newDescription.state === "filled"
                ) {
                  addPrjctItem(projectState._id, newDescription.newDesc, {
                    user: session.user.name,
                    id: session.user.id,
                    subject: "MODIFIED",
                    msg: `${
                      projectState.uname ? projectState.uname : projectState.uid
                    } modified the description on ${
                      projectState.projectName
                    }'s project`,
                    item: "description",
                  });
                  setNewDescription({
                    status: false,
                    state: "empty",
                    newDesc: { description: "" },
                  });
                } else {
                  setNewDescription({
                    status: false,
                    state: "empty",
                    newDesc: { description: "" },
                  });
                }
                // setModifyItem({ ...modifyItem, description: false });
                // if (newDescription) {
                //   addPrflItem(session?.user.id, newDescription, {
                //     user: session.user.name,
                //     id: session.user.id,
                //     subject: "MODIFIED",
                //     msg: `${
                //       myProfile.header ? myProfile.header : myProfile.id
                //     } modified there description`,
                //     item: "description",
                //   });
                // }
                // setNewDescription();
                // updateProfile(session?.user.id);
              }}
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

export default ProfileDescription;
