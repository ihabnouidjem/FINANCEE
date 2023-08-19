import { appContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";

function ProjectTextarea({ input, textarea, items }) {
  const language = useSelector((state) => state.language?.language);
  const { postItem } = useContext(appContext);
  const [formState, setFormState] = useState({
    ta_status: "edit",
    inp_status: "edit",
    ta_reload: false,
    inp_reload: false,
    ta_value: null,
    inp_value: null,
    newItem: { status: true },
  });
  console.log("activityform", formState);
  const changeNewDetail = (e) => {
    setFormState({
      ...formState,
      newItem: { ...formState.newItem, status: true, details: e.target.value },
    });
  };
  const changeNewMinamount = (e) => {
    setFormState({
      ...formState,
      newItem: {
        ...formState.newItem,
        status: true,
        min_amount: e.target.value,
      },
    });
  };
  useEffect(() => {
    if (items?.values[0] && items?.values[1]) {
      setFormState({
        ...formState,
        inp_reload: false,
        ta_reload: false,
        inp_status: "showcase",
        ta_status: "showcase",
        inp_value: items.values[0],
        ta_value: items.values[1],
        newItem: {
          ...formState.newItem,
          min_amount: items?.values[0],
          details: items?.values[1],
        },
      });
    } else if (items?.values[0]) {
      setFormState({
        ...formState,
        inp_reload: false,
        inp_status: "showcase",
        inp_value: items.values[0],
        newItem: { ...formState.newItem, details: items?.values[0] },
      });
    } else if (items?.values[1]) {
      setFormState({
        ...formState,
        ta_reload: false,
        ta_status: "showcase",
        ta_value: items.values[1],
        newItem: { ...formState.newItem, min_amount: items?.values[1] },
      });
    } else {
      setFormState({
        ...formState,
        inp_reload: false,
        ta_reload: false,
        inp_status: "edit",
        ta_status: "edit",
        inp_value: null,
        ta_value: null,
      });
    }
  }, [items]);
  return (
    <div className="w-full flex flex-col items-center gap-3">
      {input.status && (
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
            {formState.inp_status === "edit" ? (
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
                    changeNewMinamount(e);
                  }}
                />
              </div>
            ) : (
              formState.inp_status === "showcase" && (
                <div
                  className="w-full h-10 sm:h-12 flex items-center px-2 overflow-hidden"
                  onClick={() => {
                    setFormState({ ...formState, inp_status: "edit" });
                  }}
                >
                  <p className="p text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap">
                    {formState.inp_value}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
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
        {formState.ta_status === "edit" ? (
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
        ) : (
          formState.ta_status === "showcase" && (
            <div
              className="w-full flex items-center p-2 border-b border-gray-500 overflow-hidden"
              onClick={() => {
                setFormState({ ...formState, ta_status: "edit" });
              }}
            >
              <p className="p text-gray-700">{formState.ta_value}</p>
            </div>
          )
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-end">
        {formState.inp_status === "showcase" &&
        formState.ta_status === "showcase" ? (
          <>
            <button
              className="u-text-icon"
              onClick={() => {
                setFormState({
                  ...formState,
                  inp_status: "edit",
                  ta_status: "edit",
                });
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
          (formState.inp_status === "edit" ||
            formState.ta_status === "edit") && (
            <>
              <button
                className="u-text-icon"
                onClick={() => {
                  if (items.values[0] && items.values[1]) {
                    setFormState({
                      ...formState,
                      inp_status: "showcase",
                      ta_status: "showcase",
                      newItem: {},
                    });
                  } else if (items.values[0]) {
                    setFormState({
                      ...formState,
                      inp_status: "showcase",
                      newItem: {},
                    });
                  } else if (items.values[1]) {
                    setFormState({
                      ...formState,
                      ta_status: "showcase",
                      newItem: {},
                    });
                  } else {
                    setFormState({
                      ...formState,
                      inp_status: "edit",
                      ta_status: "edit",
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
                  if (formState.newItem) {
                    if (items.field === "donation") {
                      postItem(`/api/profile/projects/${items.id}`, {
                        donation: formState.newItem,
                      });
                    } else if (items.field === "gift") {
                      postItem(`/api/profile/projects/${items.id}`, {
                        gift: formState.newItem,
                      });
                    } else if (items.field === "investment") {
                      postItem(`/api/profile/projects/${items.id}`, {
                        investment: formState.newItem,
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
          )
        )}
      </div>
    </div>
  );
}

export default ProjectTextarea;
