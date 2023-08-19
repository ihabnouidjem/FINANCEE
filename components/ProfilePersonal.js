import React from "react";
import ProfileInput from "./ProfileInput";
import ProfileInputPMNT from "./profileInputPMNT";

function ProfilePersonal() {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-6 px-4 sm:px-8 xl:px-16">
      <div className="w-full flex flex-wrap items-center">
        <h5 className="h5 text-gray-950">PERSONAL INFOS</h5>
        <button className="ml-auto flex flex-row items-center p-1 rounded-full bg-gray-200">
          <div className="small-p-16 text-white bg-gray-800 rounded-full px-2 py-[2px]">
            showcase
          </div>
          <div className="small-p-16 text-gray-800 rounded-full px-2 py-[2px]">
            edit
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="w-[min(100%,1000px)]">
          <h6 className="h6 w-full text-center text-gray-800">PAYMENT INFO</h6>
        </div>
        <ProfileInputPMNT
          input={{ type: ["key", "ccp"], placeholder: ["key", "ccp"] }}
        />
      </div>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="w-[min(100%,1000px)]">
          <h6 className="h6 w-full text-center text-gray-800">SOCIAL MEDIA</h6>
        </div>
        <ProfileInput
          input={{ type: "facebook", placeholder: "Enter facebook" }}
        />
        <ProfileInput
          input={{ type: "instagram", placeholder: "Enter instagram" }}
        />
        <ProfileInput
          input={{ type: "twitter", placeholder: "Enter twitter" }}
        />
        <ProfileInput
          input={{ type: "youtube", placeholder: "Enter youtube" }}
        />
      </div>
    </div>
  );
}

export default ProfilePersonal;
