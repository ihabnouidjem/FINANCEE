import React, { useContext } from "react";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";

function ProfileHeader({
  newHeader,
  setNewHeader,
  prflHeader,
  modifyItem,
  setModifyItem,
  session,
  addPrflItem,
  updateProfile,
}) {
  const { myProfile } = useContext(stateContext);
  return (
    <div className="profile-forms-container">
      {prflHeader && !modifyItem.header ? (
        <>
          <div className="profile-text-container">
            <h4 className="h4 black-90 text-center">{`${prflHeader}`}</h4>
          </div>
          <div className="profile-form-buttons">
            <button
              className="profile-form-button"
              onClick={() => setModifyItem({ ...modifyItem, header: true })}
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
              setNewHeader({ header: `${e.target.value}` });
            }}
            className={
              !prflHeader
                ? "profile-form-input empty-fieled"
                : "profile-form-input"
            }
            placeholder={`${"header ..."}`}
          />
          <div className="profile-form-buttons">
            <button
              onClick={() => {
                setModifyItem({ ...modifyItem, header: false });
                if (newHeader) {
                  addPrflItem(session?.user.id, newHeader, {
                    user: session.user.name,
                    id: session.user.id,
                    subject: "MODIFIED",
                    msg: `${
                      myProfile.header ? myProfile.header : myProfile.id
                    } modified there header`,
                    item: "header",
                  });
                }
                setNewHeader();
                updateProfile(session?.user.id);
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
