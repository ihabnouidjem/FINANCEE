import { stateContext } from "@/pages/_app";
import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

function AdminMessage() {
  const { adminMSG, setAdminMSG } = useContext(stateContext);

  const adminMSGIdRef = useRef(null);
  const adminMSGNameRef = useRef(null);
  const adminMSGSubjectRef = useRef(null);
  const adminMSGMessageRef = useRef(null);
  const adminMSGDetailsRef = useRef(null);

  const sendAdminMessage = (adminMSG) => {
    if (adminMSG.subject !== "" && adminMSG.msg !== "") {
      const newMSG = {
        adminMSG: {
          status: true,
          type: "individual",
          subject: `${adminMSG.subject}`,
          msg: `${adminMSG.msg}`,
          details: `${adminMSG.details}`,
        },
      };
      const newMassMSG = {
        adminMassMSG: {
          status: true,
          type: "mass",
          subject: `${adminMSG.subject}`,
          msg: `${adminMSG.msg}`,
          details: `${adminMSG.details}`,
        },
      };
      if (adminMSG.type === "individual") {
        axios
          .post(
            `https://financee.onrender.com/api/admin/projects/${adminMSG.destinationId}`,
            { newItems: newMSG }
          )
          .then((res) => {
            setAdminMSG({
              status: false,
              type: "mass",
              destinationId: "",
              destinationName: "",
              subject: "",
              msg: "",
              details: "",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (adminMSG.type === "mass") {
        axios
          .post(`https://financee.onrender.com/api/admin`, {
            newItems: newMassMSG,
          })
          .then((res) => {
            setAdminMSG({
              status: false,
              type: "mass",
              destinationId: "",
              destinationName: "",
              subject: "",
              msg: "",
              details: "",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="admin-message">
      <div className="admin-item-header">
        <h5 className="h5 black-90">MESSAGE</h5>
      </div>
      {adminMSG.type === "individual" &&
      adminMSG.destinationId !== "" &&
      adminMSG.destinationName !== "" ? (
        <div className="admin-message-form">
          <h6 className="h6 black-70">
            {adminMSG.destinationId !== ""
              ? `DEST ID : ${adminMSG.destinationId}`
              : "destination id"}
          </h6>
          <h6 className="h6 black-70">
            {adminMSG.destinationName !== ""
              ? `DEST NAME : ${adminMSG.destinationName}`
              : "destination id"}
          </h6>
          <h6 className="h6 black-70">subject</h6>
          <div className="admin-message-input-container">
            <input
              ref={adminMSGSubjectRef}
              type="text"
              placeholder="subject"
              onChange={(e) =>
                setAdminMSG({ ...adminMSG, subject: e.target.value })
              }
            />
          </div>
          <h6 className="h6 black-70">message</h6>
          <div className="admin-message-ta-container">
            <textarea
              ref={adminMSGMessageRef}
              type="text"
              placeholder="message"
              onChange={(e) =>
                setAdminMSG({ ...adminMSG, msg: e.target.value })
              }
            ></textarea>
          </div>
          <h6 className="h6 black-70">details</h6>
          <div className="admin-message-ta-container">
            <textarea
              ref={adminMSGDetailsRef}
              type="text"
              placeholder="details"
              onChange={(e) =>
                setAdminMSG({ ...adminMSG, details: e.target.value })
              }
            ></textarea>
          </div>
          <button
            className="admin-send-btn hover-text-btn"
            onClick={() => sendAdminMessage(adminMSG)}
          >
            <h6 className="h6 black-90">send</h6>
            <i className="icon-24 black-90">
              <RiSendPlaneFill />{" "}
            </i>
          </button>
        </div>
      ) : (
        <div className="admin-message-form">
          <h6 className="h6 black-70">{"ALL"}</h6>
          {/* <h6 className="h6 black-70">
              {adminMSG.destinationName !== ""
                ? `DEST NAME : ${adminMSG.destinationName}`
                : "destination id"}
            </h6> */}
          <h6 className="h6 black-70">subject</h6>
          <div className="admin-message-input-container">
            <input
              ref={adminMSGSubjectRef}
              type="text"
              placeholder="subject"
              onChange={(e) =>
                setAdminMSG({ ...adminMSG, subject: e.target.value })
              }
            />
          </div>
          <h6 className="h6 black-70">message</h6>
          <div className="admin-message-ta-container">
            <textarea
              ref={adminMSGMessageRef}
              type="text"
              placeholder="message"
              onChange={(e) =>
                setAdminMSG({ ...adminMSG, msg: e.target.value })
              }
            ></textarea>
          </div>
          <h6 className="h6 black-70">details</h6>
          <div className="admin-message-ta-container">
            <textarea
              ref={adminMSGDetailsRef}
              type="text"
              placeholder="details"
              onChange={(e) =>
                setAdminMSG({ ...adminMSG, details: e.target.value })
              }
            ></textarea>
          </div>
          <button
            className="admin-send-btn hover-text-btn"
            onClick={() => sendAdminMessage(adminMSG)}
          >
            <h6 className="h6 black-90">send</h6>
            <i className="icon-24 black-90">
              <RiSendPlaneFill />{" "}
            </i>
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminMessage;
