import React from "react";
import axios from "axios";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsX } from "react-icons/bs";

function AdminNotification({ _id, user, id, item, subject, msg }) {
  const deleteNotification = (nid) => {
    axios
      .delete(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NODE_ENV === "production" &&
              "https://financee.onrender.com"
        }/api/admin/notifications/${nid}`
      )
      .then((res) => console.log(res));
  };

  return (
    <div className="admin-notification">
      <i
        className={
          subject !== "DELETED" ? "icon-24 black-90" : "icon-24 red-heart"
        }
      >
        {" "}
        <IoMdNotificationsOutline />
      </i>

      <div className="admin-notification-text">
        <p className="p black-50">
          <span className="h6 black-70">
            {subject && `${item} ${subject} : `}
          </span>
          {msg && msg}
        </p>
      </div>
      <div className="text-icon" onClick={() => deleteNotification(_id)}>
        <i className="icon-24 black-90">
          <BsX />
        </i>
        <p className="small-p">delete</p>
      </div>
    </div>
  );
}

export default AdminNotification;
