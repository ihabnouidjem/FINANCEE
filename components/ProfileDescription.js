import React, { useContext } from "react";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";

function ProfileDescription({
  newDescription,
  setNewDescription,
  prflDescription,
  modifyItem,
  setModifyItem,
  session,
  addPrflItem,
  updateProfile,
}) {
  const { myProfile } = useContext(stateContext);

  return (
    <div className="profile-forms-container">
      {prflDescription && !modifyItem.description ? (
        <>
          <div className="profile-text-container">
            <p className="p black-50 text-center">{`${prflDescription}`}</p>
          </div>
          <div className="profile-form-buttons">
            <button
              className="profile-form-button"
              onClick={() =>
                setModifyItem({ ...modifyItem, description: true })
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
              !prflDescription
                ? "profile-form-textarea empty-fieled"
                : "profile-form-textarea"
            }
            placeholder="description"
            onChange={(e) => {
              setNewDescription({ description: `${e.target.value}` });
            }}
          ></textarea>
          <div className="profile-form-ta-buttons">
            <button
              className="profile-form-button"
              onClick={() => {
                setModifyItem({ ...modifyItem, description: false });
                if (newDescription) {
                  addPrflItem(session?.user.id, newDescription, {
                    user: session.user.name,
                    id: session.user.id,
                    subject: "MODIFIED",
                    msg: `${
                      myProfile.header ? myProfile.header : myProfile.id
                    } modified there description`,
                    item: "description",
                  });
                }
                setNewDescription();
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
