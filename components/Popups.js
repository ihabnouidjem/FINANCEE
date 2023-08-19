import { pushPop } from "@/features/popupSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopupLanguage from "./PopupLanguage";

function Popups() {
  const popups = useSelector((state) => state.popup?.popups);
  return (
    <div className="w-full fixed left-0 z-50 px-4 top-[56px] sm:top-[64px] sm:px-8 xl:px-16 flex flex-col items-center sm:items-end border">
      {popups?.map((popup) => {
        return (
          <div
            key={popups.indexOf(popup)}
            className={`py-2 ${
              popups.indexOf(popup) === popups.length - 1 && "animate-pop"
            }`}
          >
            {popup.type === "language" && <PopupLanguage />}
          </div>
        );
      })}
    </div>
  );
}

export default Popups;
