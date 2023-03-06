import { profileContext } from "@/pages/profile";
import { stateContext } from "@/pages/_app";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai";
import { BsCheck, BsX } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

function ProfileImage() {
  const [newImg, setNewImg] = useState({
    status: false,
    img: {},
    path: "",
    objectURL: "",
  });

  const { myProfile, addImage } = useContext(stateContext);
  const { session } = useContext(profileContext);
  // console.log(newImg);
  return (
    <div className="profileImage">
      <div className="profileImage-image">
        <Image
          src={
            newImg.objectURL !== ""
              ? `${newImg.objectURL}`
              : !myProfile.projectImg || myProfile.projectImg === ""
              ? "/exeption/profileImage.png"
              : myProfile.projectImg && `${myProfile.projectImg}`
          }
          alt=""
          height={400}
          width={400}
        ></Image>
      </div>
      <div className="profileImage-update-container">
        {newImg.status && (
          <div className="profileImage-input">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setNewImg({
                    ...newImg,
                    img: e.target.files[0],
                    path: `/projects`,
                    objectURL: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
            />
          </div>
        )}

        <div className="profile-form-buttons">
          {(myProfile.projectImg === "" || !myProfile.projectImg) &&
          !newImg.status ? (
            <button
              className="profile-form-button"
              onClick={() => {
                setNewImg({ ...newImg, status: true });
              }}
            >
              <i className="icon-24 black-90">
                <IoAddOutline />
              </i>
              <p className="small-p black-90">add</p>
            </button>
          ) : !(myProfile.projectImg === "" || !myProfile.projectImg) &&
            !newImg.status ? (
            <>
              <button
                className="profile-form-button"
                onClick={() => {
                  setNewImg({ ...newImg, status: true });
                }}
              >
                <i className="icon-24 black-90">
                  <AiTwotoneEdit />
                </i>
                <p className="small-p black-90">modify</p>
              </button>
              <button className="profile-form-button">
                <i className="icon-24 black-90">
                  <AiOutlineDelete />
                </i>
                <p className="small-p black-90">delete</p>
              </button>
            </>
          ) : (
            newImg.status && (
              <button
                className="profile-form-button"
                onClick={() => {
                  if (session && newImg.img && newImg.path !== "") {
                    addImage(session.user?.id, newImg.img, newImg.path, {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "MODIFIED",
                      msg: `${
                        myProfile.header ? myProfile.header : "user"
                      } modified there project image`,
                      item: "image",
                    });
                    setNewImg({
                      status: false,
                      img: {},
                      path: "",
                      objectURL: "",
                    });
                  }
                }}
              >
                <i className="icon-24 black-90">
                  <BsCheck />
                </i>
                <p className="small-p black-90">apply</p>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
