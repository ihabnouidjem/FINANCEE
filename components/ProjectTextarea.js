import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";

function ProjectTextarea({ textarea, item }) {
  const language = useSelector((state) => state.language?.language);
  const { setItems, postItem } = useContext(appContext);
  const [textareaState, setTextareaState] = useState({
    status: "edit",
    newItem: {},
    reload: false,
    value: null,
  });
  const changeNewItem = (e) => {
    if (item.item === "description") {
      setTextareaState({
        ...textareaState,
        newItem: { description: e.target.value },
      });
    }
  };
  useEffect(() => {
    if (item?.value) {
      setTextareaState({
        ...textareaState,
        reload: false,
        status: "showcase",
        value: item.value,
      });
    } else {
      setTextareaState({
        ...textareaState,
        reload: false,
        status: "edit",
        value: null,
      });
    }
  }, [item]);
  return (
    <div className="w-full flex flex-col items-center gap-1">
      <div className="w-full flex flex-row items-center">
        <h6 className="h6 text-gray-800 w-full">
          {textarea.name && language === "english"
            ? textarea?.name[0]
            : textarea.name && language === "francais" && textarea?.name[1]}
        </h6>
        <i className="icon-20 animate-loading">
          {textareaState.reload && <AiOutlineLoading />}
        </i>
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        {textareaState.status === "edit" ? (
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
                // if (item.type === "global") {
                //   setItems(item.field, item.item, e.target.value);
                // } else {
                //   changeNewItem(e);
                // }
                setItems(item.field, item.item, e.target.value);
              }}
            ></textarea>
          </div>
        ) : (
          textareaState.status === "showcase" && (
            <div
              className="w-full flex items-center p-2 border-b border-gray-500 overflow-hidden"
              onClick={() => {
                setTextareaState({ ...textareaState, status: "edit" });
              }}
            >
              <p className="p text-gray-700">{item.value}</p>
            </div>
          )
        )}
        {item.type !== "global" && (
          <div className="w-full flex flex-row items-center justify-end">
            {textareaState.status === "showcase" ? (
              <>
                <button
                  className="u-text-icon"
                  onClick={() => {
                    setTextareaState({ ...textareaState, status: "edit" });
                  }}
                >
                  <i className="icon-24">
                    <FiEdit3 />
                  </i>
                  <p className="small-p">
                    {language === "english"
                      ? "edit"
                      : language === "francais" && "mod"}
                  </p>
                </button>
                {textarea.remove && (
                  <button className="u-text-icon">
                    <i className="icon-24">
                      <AiOutlineDelete />
                    </i>
                    <p className="small-p">
                      {" "}
                      {language === "english"
                        ? "remove"
                        : language === "francais" && "suppr"}
                    </p>
                  </button>
                )}
              </>
            ) : (
              textareaState.status === "edit" && (
                <>
                  <button
                    className="u-text-icon"
                    onClick={() => {
                      if (item.value) {
                        setTextareaState({
                          ...textareaState,
                          status: "showcase",
                          newItem: {},
                        });
                      } else {
                        setTextareaState({
                          ...textareaState,
                          status: "edit",
                          newItem: {},
                        });
                      }
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
                      if (textareaState.newItem) {
                        postItem(
                          `/api/profile/projects/${item.id}`,
                          textareaState.newItem
                        );
                        setTextareaState({
                          ...textareaState,
                          newItem: {},
                          reload: true,
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
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectTextarea;
