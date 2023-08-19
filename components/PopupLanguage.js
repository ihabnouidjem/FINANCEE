import { FR, GB } from "country-flag-icons/react/3x2";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLng } from "@/features/languageSlice";
import { removePop } from "@/features/popupSlice";

function PopupLanguage() {
  const language = useSelector((state) => state.language?.language);
  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  return (
    <div className="w-[min(500px,calc(100vw-32px))] flex flex-col items-center bg-gray-950 shadow-md p-4 rounded-2xl gap-4">
      <div className="w-full flex flex-row items-center gap-2">
        <p className="p text-white">
          {language === "english"
            ? "Choose language :"
            : language === "francais" && "Choisissez la langue :"}
        </p>
      </div>
      <div className=" w-full flex-col items-center gap-8">
        <div
          onClick={() => {
            if (language !== "english") {
              dispatch(changeLng("english"));
            }
            dispatch(
              removePop({
                type: "language",
                data: popup.popups?.filter(
                  (popup) => popup !== { type: "language" }
                ),
              })
            );
          }}
          className={`w-full flex flex-row items-center rounded-lg py-1 px-4 gap-4 sm:gap-6 ${
            language !== "english" && "hover:bg-gray-900"
          }`}
        >
          <i className="icon-20">
            <GB />{" "}
          </i>
          <p className="p text-white ">English</p>
        </div>
        <div
          //   onClick={() => dispatch(changeLng("francais"))}
          onClick={() => {
            if (language !== "francais") {
              dispatch(changeLng("francais"));
            }
            dispatch(
              removePop({
                type: "language",
                data: popup.popups?.filter((item) => {
                  return item !== { type: "language" };
                }),
              })
            );
          }}
          className={`w-full flex flex-row items-center rounded-lg py-1 px-4 gap-4 sm:gap-6 ${
            language !== "francais" && "hover:bg-gray-900"
          }`}
        >
          <i className="icon-20">
            <FR />{" "}
          </i>
          <p className="p text-white">Français</p>
        </div>
      </div>
    </div>
  );
}

export default PopupLanguage;
