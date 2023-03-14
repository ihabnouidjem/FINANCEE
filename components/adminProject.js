import React, { useState, useContext } from "react";
import { BsCheck, BsX, BsFillSuitHeartFill, BsEye } from "react-icons/bs";
import { BiLike, BiBlock, BiMessageRounded } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import axios from "axios";
import { stateContext } from "@/pages/_app";

function AdminProject({
  _id,
  uid,
  projectName,
  status,
  description,
  likes,
  views,
  donators,
  donations,
}) {
  // component --------------------------------------------------------------------------------------

  const { reload, setReload, adminMSG, setAdminMSG } = useContext(stateContext);

  const changeStatus = (_id, newStatus) => {
    axios
      .post(`http://localhost:3000/api/admin/projects/${_id}`, {
        newItems: newStatus,
      })
      .then((res) => {
        setReload({ ...reload, status: true, function: "fetchAdminProjects" });
      });
    // console.log(newStatus);
  };

  return (
    <div className="admin-project">
      <div className="admin-project-infos">
        <div className="admin-project-p">
          <p className="p black-50">
            <span className="h6 black-70">{`Start-up : `}</span>
            {`${projectName}`}
          </p>
        </div>
        <div className="admin-project-p">
          <p className="p black-50">
            <span className="h6 black-70">{`Status : `}</span>
            {`${status}`}
          </p>
        </div>
        <div className="admin-project-p">
          <p className="p black-50">
            <span className="h6 black-70">{`Description : `}</span>
            {`${description}`}{" "}
          </p>
        </div>
        <div className="admin-project-icon-p">
          <i className="icon-24 black-90">
            <BsFillSuitHeartFill />
          </i>
          <p className="p black-50">{`${likes}`}</p>
        </div>
        <div className="admin-project-icon-p">
          <i className="icon-24 black-90">
            <BsEye />
          </i>
          <p className="p black-50">{`${views}`}</p>
        </div>
        <div className="admin-project-icon-p">
          <i className="icon-24 black-90">
            <FaDonate />
          </i>
          <p className="p black-50">{`${donators}`}</p>
        </div>
        <div className="admin-project-icon-p">
          <i className="icon-24 black-90">
            <GiMoneyStack />
          </i>
          <p className="p black-50">{`${donations}`}</p>
        </div>
      </div>
      <div className="admin-project-buttons">
        <button
          className="text-icon"
          onClick={() => {
            setAdminMSG({
              ...adminMSG,
              status: true,
              type: "individual",
              destinationId: uid,
              destinationName: projectName,
            });
          }}
        >
          <i className={"icon-24 black-90"}>
            <BiMessageRounded />
          </i>
          <p className={"small-p black-90"}>{"message"}</p>
        </button>
        <button
          className="text-icon"
          onClick={() => {
            changeStatus(_id, { status: "recommended", statusChanged: true });
          }}
        >
          <i
            className={
              status === "recommended"
                ? "icon-24 red-heart"
                : "icon-24 black-90"
            }
          >
            <BiLike />
          </i>
          <p
            className={
              status === "recommended"
                ? "small-p red-heart"
                : "small-p black-90"
            }
          >
            {status === "recommended" ? "recommended" : "recommend"}
          </p>
        </button>
        <button
          className="text-icon"
          onClick={() => {
            changeStatus(_id, { status: "approved", statusChanged: true });
          }}
        >
          <i
            className={
              status === "approved" ? "icon-24 red-heart" : "icon-24 black-90"
            }
          >
            <BsCheck />
          </i>
          <p
            className={
              status === "approved" ? "small-p red-heart" : "small-p black-90"
            }
          >
            {status === "approved" ? "approved" : "approve"}
          </p>
        </button>
        <button
          className="text-icon"
          onClick={() => {
            changeStatus(_id, { status: "declined", statusChanged: true });
          }}
        >
          <i
            className={
              status === "declined" ? "icon-24 red-heart" : "icon-24 black-90"
            }
          >
            <BsX />
          </i>
          <p
            className={
              status === "declined" ? "small-p red-heart" : "small-p black-90"
            }
          >
            {status === "declined" ? "declined" : "decline"}
          </p>
        </button>
        <button
          className="text-icon"
          onClick={() => {
            changeStatus(_id, { status: "blocked", statusChanged: true });
          }}
        >
          <i
            className={
              status === "blocked" ? "icon-24 red-heart" : "icon-24 black-90"
            }
          >
            <BiBlock />
          </i>
          <p
            className={
              status === "blocked" ? "small-p red-heart" : "small-p black-90"
            }
          >
            {status === "blocked" ? "blocked" : "block"}
          </p>
        </button>
      </div>
    </div>
  );
}

export default AdminProject;
