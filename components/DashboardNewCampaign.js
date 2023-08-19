import React, { useContext, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { dashboardContext } from "@/pages/dashboard";
import Image from "next/image";

function DashboardNewCampaign() {
  const { postItem, dashboardState } = useContext(dashboardContext);
  const [campaign, setCampaign] = useState({
    status: "select",
    newCamp: null,
    newCampURL: null,
  });

  const imageInputRef = useRef(null);

  const uploadNewImage = () => {
    setCampaign({ ...campaign, status: "uploading" });
    if (campaign.newCamp) {
      const id = Date.now();
      const imgRef = ref(storage, `campaigns/${id}/campaignImage`);
      uploadBytes(imgRef, campaign.newCamp).then((res) => {
        console.log("projectInput", "image posted in firebase");
        const newImgRef = ref(storage, `campaigns/${id}/campaignImage`);
        getDownloadURL(newImgRef).then((url) => {
          postItem(
            `/api/admin/campaigns`,
            { image: url },
            {
              msg: `${dashboardState.profile.name} added a new campaign (url : ${url})`,
            }
          );
          setCampaign({ ...campaign, status: "select" });
          console.log("projectInput", "image posted in db");
        });
      });
    }
  };

  return (
    <div className="w-full flex flex-row justify-end gap-2">
      {campaign.status === "select" && (
        <>
          <button
            className="px-3 py-1 rounded-md bg-blue-600"
            onClick={() => {
              imageInputRef.current.click();
            }}
          >
            <p className="small-h6 text-zinc-50">Add Campaign</p>
          </button>
          <input
            ref={imageInputRef}
            className="hidden"
            onChange={(e) => {
              setCampaign({
                ...campaign,
                status: "showcase",
                newCamp: e.target.files[0],
                newCampURL: URL.createObjectURL(e.target.files[0]),
              });
            }}
            type="file"
          />
        </>
      )}

      {campaign.status === "uploading" && (
        <div className="mx-auto p-2 bg-white rounded-full shadow-lg">
          <i className="icon-20 animate-loading">
            <AiOutlineLoading />
          </i>
        </div>
      )}

      {campaign.status === "showcase" && (
        <div className="w-full flex flex-row justify-center flex-wrap gap-4">
          {campaign.newCampURL && (
            <Image
              className="w-full rounded-xl"
              src={campaign.newCampURL}
              alt="new image"
              height={500}
              width={2000}
            />
          )}
          <button
            className="px-3 py-1 rounded-lg bg-black50 ml-auto"
            onClick={() => {
              setCampaign({
                ...campaign,
                status: "select",
                newCamp: null,
                newCampURL: null,
              });
              imageInputRef.current.value = null;
            }}
          >
            <p className="small-h6 text-white">Cancel</p>
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-white"
            onClick={() => {
              uploadNewImage();
            }}
          >
            <p className="small-h6 text-gray-900">Apply</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardNewCampaign;
