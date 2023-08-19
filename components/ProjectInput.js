import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";

function ProjectInput({ input, item }) {
  const language = useSelector((state) => state.language.language);
  const { setItems, postItem } = useContext(appContext);
  const [inputState, setInputState] = useState({
    status: "edit",
    newItem: {},
    reload: false,
    value: null,
  });

  const changeNewItem = (e) => {
    if (item.item === "name") {
      setInputState({ ...inputState, newItem: { name: e.target.value } });
    } else if (item.item === "amount") {
      setInputState({ ...inputState, newItem: { amount: e.target.value } });
    }
  };
  useEffect(() => {
    if (item?.value) {
      setInputState({
        ...inputState,
        reload: false,
        status: "showcase",
        value: item.value,
      });
    } else {
      setInputState({
        ...inputState,
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
          {input.name && language === "english"
            ? input?.name[0]
            : input.name && language === "francais" && input?.name[1]}
        </h6>
        <i className="icon-20 animate-loading">
          {inputState.reload && <AiOutlineLoading />}
        </i>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center gap-1">
        {inputState.status === "edit" ? (
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
                if (item.type === "global") {
                  setItems(item.field, item.item, e.target.value);
                } else {
                  changeNewItem(e);
                }
              }}
            />
          </div>
        ) : (
          inputState.status === "showcase" && (
            <div
              className="w-full h-10 sm:h-12 flex items-center px-2 border-b sm:border-none border-gray-500 overflow-hidden"
              onClick={() => {
                setInputState({ ...inputState, status: "edit" });
              }}
            >
              <p className="p text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap">
                {inputState.value}
              </p>
            </div>
          )
        )}

        <div className="w-full sm:w-auto flex flex-row items-center justify-end">
          {inputState.status === "showcase" ? (
            <>
              <button
                className="u-text-icon"
                onClick={() => {
                  setInputState({ ...inputState, status: "edit" });
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
              {input.remove && (
                <button className="u-text-icon">
                  <i className="icon-24">
                    <AiOutlineDelete />
                  </i>
                  <p className="small-p">
                    {language === "english"
                      ? "remove"
                      : language === "francais" && "suppr"}
                  </p>
                </button>
              )}
            </>
          ) : (
            inputState.status === "edit" && (
              <>
                <button
                  className="u-text-icon"
                  onClick={() => {
                    if (item.value) {
                      setInputState({
                        ...inputState,
                        status: "showcase",
                        newItem: {},
                      });
                    } else {
                      setInputState({
                        ...inputState,
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
                    {language === "english"
                      ? "cancel"
                      : language === "francais" && "annuler"}
                  </p>
                </button>
                <button
                  className="u-text-icon"
                  onClick={() => {
                    if (inputState.newItem) {
                      postItem(
                        `/api/profile/projects/${item.id}`,
                        inputState.newItem
                      );
                      setInputState({
                        ...inputState,
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
                    {language === "english"
                      ? "apply"
                      : language === "francais" && "mettre"}
                  </p>
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectInput;
