import React, { useContext } from "react";
import {
  BsCheck,
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsInstagram,
} from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";

function ProfileSocial({
  social,
  newFacebook,
  setNewFacebook,
  prflFacebook,
  newInstagram,
  setNewInstagram,
  prflInstagram,
  newTwitter,
  setNewTwitter,
  prflTwitter,
  newYoutube,
  setNewYoutube,
  prflYoutube,
  modifyItem,
  setModifyItem,
  session,
  addPrflItem,
  updateProfile,
}) {
  const { myProfile } = useContext(stateContext);

  if (
    (social === "facebook" && prflFacebook && !modifyItem.facebook) ||
    (social === "instagram" && prflInstagram && !modifyItem.instagram) ||
    (social === "twitter" && prflTwitter && !modifyItem.twitter) ||
    (social === "youtube" && prflYoutube && !modifyItem.youtube)
  ) {
    return (
      <div className="profile-forms-container-row">
        <p className="p black-50">
          {social === "facebook"
            ? `facebook | ${prflFacebook}`
            : social === "instagram"
            ? `instagram | ${prflInstagram}`
            : social === "twitter"
            ? `twitter | ${prflTwitter}`
            : social === "youtube" && `youtube | ${prflYoutube}`}
        </p>
        <div className="profile-form-buttons">
          <button
            className="profile-form-button"
            onClick={() => {
              social === "facebook"
                ? setModifyItem({ ...modifyItem, facebook: true })
                : social === "instagram"
                ? setModifyItem({ ...modifyItem, instagram: true })
                : social === "twitter"
                ? setModifyItem({ ...modifyItem, twitter: true })
                : social === "youtube" &&
                  setModifyItem({ ...modifyItem, youtube: true });
            }}
          >
            <i className="icon-24 black-90">
              <AiTwotoneEdit />
            </i>
            <p className="small-p black-90">modify</p>
          </button>
          <button
            className="profile-form-button"
            onClick={() => {
              updateProfile(session?.user.id);
              social === "facebook"
                ? addPrflItem(
                    session?.user.id,
                    { facebook: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : "user"
                      } deleted there facebook`,
                      item: "facebook",
                    }
                  )
                : social === "instagram"
                ? addPrflItem(
                    session?.user.id,
                    { instagram: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : "user"
                      } deleted there instagram`,
                      item: "instagram",
                    }
                  )
                : social === "twitter"
                ? addPrflItem(
                    session?.user.id,
                    { twitter: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : "user"
                      } deleted there twitter`,
                      item: "twitter",
                    }
                  )
                : social === "youtube" &&
                  addPrflItem(
                    session?.user.id,
                    { youtube: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : "user"
                      } deleted there youtube`,
                      item: "youtube",
                    }
                  );
            }}
          >
            <i className="icon-24 black-90">
              <AiOutlineDelete />
            </i>
            <p className="small-p black-90">delete</p>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-form">
        <button>
          <i className="icon-32 black-90">
            {social === "facebook" ? (
              <BsFacebook />
            ) : social === "instagram" ? (
              <BsInstagram />
            ) : social === "twitter" ? (
              <BsTwitter />
            ) : (
              social === "youtube" && <BsYoutube />
            )}
          </i>
        </button>
        <input
          onChange={(e) => {
            social === "facebook"
              ? setNewFacebook({ facebook: `${e.target.value}` })
              : social === "instagram"
              ? setNewInstagram({ instagram: `${e.target.value}` })
              : social === "twitter"
              ? setNewTwitter({ twitter: `${e.target.value}` })
              : social === "youtube" &&
                setNewYoutube({ youtube: `${e.target.value}` });
          }}
          className="profile-form-input"
          placeholder={
            social === "facebook"
              ? "Facebook"
              : social === "instagram"
              ? "Instagram"
              : social === "twitter"
              ? "Twitter"
              : social === "youtube" && "Youtube"
          }
        />
        <div className="profile-form-buttons">
          <button
            onClick={
              social === "facebook"
                ? () => {
                    setModifyItem({ ...modifyItem, facebook: false });
                    if (newFacebook) {
                      addPrflItem(session?.user.id, newFacebook, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : "user"
                        } modified there facebook`,
                        item: "facebook",
                      });
                    }
                    setNewFacebook();
                    updateProfile(session?.user.id);
                  }
                : social === "instagram"
                ? () => {
                    setModifyItem({ ...modifyItem, instagram: false });
                    if (newInstagram) {
                      addPrflItem(session?.user.id, newInstagram, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : "user"
                        } modified there instagram`,
                        item: "instagram",
                      });
                    }
                    setNewInstagram();
                    updateProfile(session?.user.id);
                  }
                : social === "twitter"
                ? () => {
                    setModifyItem({ ...modifyItem, twitter: false });
                    if (newTwitter) {
                      addPrflItem(session?.user.id, newTwitter, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : "user"
                        } modified there twitter`,
                        item: "twitter",
                      });
                    }
                    setNewTwitter();
                    updateProfile(session?.user.id);
                  }
                : social === "youtube" &&
                  (() => {
                    setModifyItem({ ...modifyItem, youtube: false });
                    if (newYoutube) {
                      addPrflItem(session?.user.id, newYoutube, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : "user"
                        } modified there youtube`,
                        item: "youtube",
                      });
                    }
                    setNewYoutube();
                    updateProfile(session?.user.id);
                  })
            }
            className="profile-form-button"
          >
            <i className="icon-24 black-90">
              <BsCheck />
            </i>
            <p className="small-p black-90">apply</p>
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileSocial;
