import { profileContext } from "@/pages/profile";
import { stateContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { BsX } from "react-icons/bs";

function ProfileMSG({ message, type, pid }) {
  const { data: session, status } = useSession();
  const { myProfile, addPrflItem, addPrjctItem } = useContext(stateContext);
  return (
    <div className="profileMSG">
      <div className={`profileMSG-subject ${type}`}>
        <h6 className="h6 black-70">{message?.subject}</h6>
        <i
          className="icon-24 black-90"
          onClick={
            message.type === "individual"
              ? () => {
                  addPrflItem(session.user?.id, {
                    adminMSG: { ...message, status: false },
                  });
                }
              : message.type === "mass"
              ? () => {
                  addPrflItem(session.user?.id, {
                    adminMassMSG: { ...message, status: false },
                  });
                }
              : message.type === "status" &&
                (() => {
                  addPrjctItem(pid, {
                    statusMSG: { ...message, status: false },
                  });
                })
          }
        >
          <BsX />
        </i>
      </div>
      <div className="profileMSG-msg">
        <p className="p black-70">{message?.msg}</p>
      </div>
      <div className="profileMSG-details">
        <p className="small-p black-70">{message?.details}</p>
      </div>
    </div>
  );
}

export default ProfileMSG;
