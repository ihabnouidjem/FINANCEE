import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectInput from "./ProjectInput";
import ProjectTextarea from "./ProjectTextarea";
import UpdatesForm from "./UpdatesForm";

function ProjectUpdates({ project, projectStatus }) {
  const language = useSelector((state) => state.language.language);
  const [updatesState, setUpdatesState] = useState({
    status: "showcase",
    id: null,
    currUpdate: null,
    updates: [],
  });

  const setUpdatesStatus = () => {
    if (updatesState.status === "update") {
      setUpdatesState({ ...updatesState, status: "showcase" });
    }
  };
  useEffect(() => {
    if (project) {
      setUpdatesState({
        ...updatesState,
        status: "showcase",
        id: project._id,
        updates: project.updates,
        currUpdate: 0,
      });
    }
  }, [project]);
  return (
    <div className="w-full flex flex-col items-center py-6 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] flex flex-col items-center gap-2 bg-white rounded-xl sm:rounded-2xl shadow-md p-4">
        <div className="w-[min(100%,1400px)] ">
          <h5 className="w-full h5 text-center text-gray-950">
            {language === "english"
              ? "PROGRESS"
              : language === "francais" && "PROGRÈS"}{" "}
          </h5>
        </div>
        <div className="w-full flex flex-row items-center overflow-x-scroll u-scrollbar-hidden border-b border-slate-950 py-1 gap-1">
          {/* {updatesState.status === "showcase" ? ( */}
          <>
            {updatesState.updates?.map((update) => {
              return (
                <button
                  onClick={() => {
                    setUpdatesState({
                      ...updatesState,
                      status: "showcase",
                      currUpdate: updatesState.updates?.indexOf(update),
                    });
                  }}
                  key={updatesState.updates?.indexOf(update)}
                  className={
                    (projectStatus === "showcase" ||
                      updatesState.status === "showcase") &&
                    updatesState.currUpdate ===
                      updatesState.updates?.indexOf(update)
                      ? `px-4 py-1 bg-slate-950 text-white rounded-lg`
                      : `px-4 py-1 bg-slate-200 text-slate-950 rounded-lg`
                  }
                >
                  <h6 className="small-h6 w-max">
                    {language === "english" &&
                    (projectStatus === "showcase" ||
                      updatesState.status === "showcase") &&
                    updatesState.currUpdate ===
                      updatesState.updates?.indexOf(update)
                      ? `PHASE ${updatesState.updates?.indexOf(update) + 1}`
                      : language === "english"
                      ? `${updatesState.updates?.indexOf(update) + 1}`
                      : language === "francais" &&
                        (projectStatus === "showcase" ||
                          updatesState.status === "showcase") &&
                        updatesState.currUpdate ===
                          updatesState.updates?.indexOf(update)
                      ? `LA PHASE ${updatesState.updates?.indexOf(update) + 1}`
                      : language === "francais" &&
                        `${updatesState.updates?.indexOf(update) + 1}`}
                  </h6>
                </button>
              );
            })}
            {projectStatus === "edit" && (
              <button
                onClick={() => {
                  setUpdatesState({
                    ...updatesState,
                    status: "update",
                  });
                }}
                className={
                  updatesState.updates?.length === 0 ||
                  updatesState.status === "update"
                    ? `px-4 py-1 bg-slate-950 text-white rounded-lg`
                    : `px-4 py-1 bg-slate-200 text-slate-950 rounded-lg`
                }
              >
                <h6 className="small-h6 w-max">
                  {language === "english"
                    ? "NEW"
                    : language === "francais" && "NOUVELLE"}
                </h6>
              </button>
            )}
          </>
        </div>
        {projectStatus === "showcase" || updatesState.status === "showcase" ? (
          <div className="w-full flex flex-col items-center gap-2 ">
            <div className="w-full">
              <h5 className="w-full h5 text-gray-900">
                {updatesState.updates &&
                  updatesState.updates[updatesState.currUpdate]?.title}
              </h5>
            </div>
            <div className="w-full">
              <p className="w-full p text-gray-700">
                {updatesState.updates &&
                  updatesState.updates[updatesState.currUpdate]?.details}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-2">
            <UpdatesForm
              textarea={{
                type: "text",
                name: ["DETAILS", "DÉTAILS"],
                placeholder: ["Details", "Détails"],
              }}
              input={{
                type: "text",
                name: ["HEADING", "TITRE"],
                placeholder: ["Heading", "Titre"],
              }}
              items={{
                values: [],
                items: ["title", "details"],
                id: updatesState.id,
              }}
              updatesList={updatesState.updates}
              setUpdatesStatus={setUpdatesStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectUpdates;
