import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { appContext } from "@/pages/_app";
import { AiOutlineLoading } from "react-icons/ai";

function ProjectInputIMG({ project, bannerState, setBannerState }) {
  const [imgInputState, setImgInputState] = useState({
    status: "select",
    newImage: null,
  });
  const language = useSelector((state) => state.language.language);
  const { postItem } = useContext(appContext);
  const imageInputRef = useRef(null);

  const uploadNewImage = () => {
    setImgInputState({ ...imgInputState, status: "uploading" });
    if (imgInputState.newImage) {
      const imgRef = ref(storage, `projects/${project?._id}/projectImage`);
      uploadBytes(imgRef, imgInputState.newImage).then((res) => {
        // console.log("projectInput", "image posted in firebase");
        const newImgRef = ref(storage, `projects/${project?._id}/projectImage`);
        getDownloadURL(newImgRef).then((url) => {
          postItem(`/api/profile/projects/${project?._id}`, { image: url });
          setImgInputState({ ...imgInputState, status: "select" });
          // console.log("projectInput", "image posted in db");
        });
      });
    }
  };
  // console.log("projectinputimg", imgInputState);
  return (
    <div className="w-full flex items-center gap-2 ">
      {imgInputState.status === "select" ? (
        <>
          <button
            className="px-3 py-1 rounded-lg bg-slate-100 ml-auto"
            onClick={() => {
              imageInputRef.current.click();
            }}
          >
            <p className="small-h6 text-gray-900">
              {language === "english"
                ? "Select Image"
                : language === "francais" && "Sélectionner une Image"}
            </p>
          </button>
          <input
            ref={imageInputRef}
            className="hidden"
            onChange={(e) => {
              setImgInputState({
                ...imgInputState,
                status: "apply",
                newImage: e.target.files[0],
              });
              setBannerState({
                ...bannerState,
                status: "showcase-image",
                newImageURL: URL.createObjectURL(e.target.files[0]),
              });
            }}
            type="file"
          />
        </>
      ) : imgInputState.status === "uploading" ? (
        <div className="mx-auto p-2 bg-white rounded-full shadow-lg">
          <i className="icon-20 animate-loading">
            <AiOutlineLoading />
          </i>
        </div>
      ) : (
        imgInputState.status === "apply" && (
          <>
            <button
              className="px-3 py-1 rounded-lg bg-black50 ml-auto"
              onClick={() => {
                setImgInputState({
                  ...imgInputState,
                  status: "select",
                  newImage: null,
                });
                setBannerState({
                  ...bannerState,
                  status: "fade",
                  newImageURL: null,
                });
              }}
            >
              <p className="small-h6 text-white">
                {language === "english"
                  ? "Cancel"
                  : language === "francais" && "Annuler"}
              </p>
            </button>
            <button
              className="px-3 py-1 rounded-lg bg-white"
              onClick={() => {
                uploadNewImage();
              }}
            >
              <p className="small-h6 text-gray-900">
                {language === "english"
                  ? "Apply"
                  : language === "francais" && "Metter"}
              </p>
            </button>
          </>
        )
      )}
    </div>
  );
}

export default ProjectInputIMG;
