import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";

function UpdatesForm({
  input,
  textarea,
  items,
  updatesList,
  setUpdatesStatus,
}) {
  const language = useSelector((state) => state.language?.language);
  const { postItem } = useContext(appContext);
  const [formState, setFormState] = useState({
    ta_reload: false,
    inp_reload: false,
    newItem: {},
  });
  const changeNewTitle = (e) => {
    setFormState({
      ...formState,
      newItem: {
        ...formState.newItem,
        title: e.target.value,
      },
    });
  };
  const changeNewDetail = (e) => {
    setFormState({
      ...formState,
      newItem: { ...formState.newItem, details: e.target.value },
    });
  };
  useEffect(() => {
    setFormState({
      ta_reload: false,
      inp_reload: false,
      newItem: {},
    });
  }, [updatesList]);
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-row items-center">
          <h6 className="h6 text-gray-800 w-full">
            {input.name && language === "english"
              ? input?.name[0]
              : input.name && language === "francais" && input?.name[1]}
          </h6>
          <i className="icon-20 animate-loading">
            {formState.inp_reload && <AiOutlineLoading />}
          </i>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center gap-1">
          <div className="w-full h-10 sm:h-12 px-2 border border-gray-500 rounded-xl overflow-hidden">
            <input
              className="h-full w-full p outline-none bg-transparent"
              type={input?.type}
              placeholder={
                language === "english"
                  ? input?.placeholder[0]
                  : language === "francais" && input?.placeholder[1]
              }
              onChange={(e) => {
                changeNewTitle(e);
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-row items-center">
          <h6 className="h6 text-gray-800 w-full">
            {textarea.name && language === "english"
              ? textarea?.name[0]
              : textarea.name && language === "francais" && textarea?.name[1]}
          </h6>
          <i className="icon-20 animate-loading">
            {formState.ta_reload && <AiOutlineLoading />}
          </i>
        </div>
        <div className="w-full h-[128px] sm:h-[136px] px-2 border border-gray-500 rounded-xl overflow-hidden">
          <textarea
            className="h-full w-full p outline-none bg-transparent"
            type={textarea?.type}
            placeholder={
              language === "english"
                ? textarea?.placeholder[0]
                : language === "francais" && textarea?.placeholder[1]
            }
            onChange={(e) => {
              changeNewDetail(e);
            }}
          ></textarea>
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-end">
        <>
          <button
            className="u-text-icon"
            onClick={() => {
              setUpdatesStatus();
              setFormState({
                ...formState,
                ta_reload: false,
                inp_reload: false,
                newItem: {},
              });
            }}
          >
            <i className="icon-24">
              <HiOutlineXMark />
            </i>
            <p className="small-p">
              {" "}
              {language === "english"
                ? "cancel"
                : language === "francais" && "annuler"}
            </p>
          </button>
          <button
            className="u-text-icon"
            onClick={() => {
              if (formState.newItem?.title && formState.newItem?.details) {
                if (updatesList && updatesList.length > 0) {
                  postItem(`/api/profile/projects/${items.id}`, {
                    updates: [...updatesList, formState.newItem],
                  });
                } else {
                  postItem(`/api/profile/projects/${items.id}`, {
                    updates: [formState.newItem],
                  });
                }

                setFormState({
                  ...formState,
                  newItem: {},
                  inp_reload: true,
                  ta_reload: true,
                });
              }
            }}
          >
            <i className="icon-24">
              <IoMdCheckmark />
            </i>
            <p className="small-p">
              {" "}
              {language === "english"
                ? "apply"
                : language === "francais" && "mettre"}
            </p>
          </button>
        </>
      </div>
    </div>
  );
}

export default UpdatesForm;
