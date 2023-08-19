import { dashboardContext } from "@/pages/dashboard";
import React, { useContext, useRef, useState } from "react";
import { BsX } from "react-icons/bs";

function DashboardCategories() {
  const { postCategory, deleteCategory, dashboardState } =
    useContext(dashboardContext);
  const [categories, setCategories] = useState({ newCategory: ["", ""] });
  const enInputRef = useRef(null);
  const frInputRef = useRef(null);
  return (
    <>
      {dashboardState.categories && dashboardState.categories.length > 0 && (
        <div className="w-full flex flex-col gap-4 sm:gap-3">
          <div className="w-full">
            <h5 className="h5 text-zinc-100 w-full">Categories</h5>
          </div>

          <div className="w-full flex flex-row flex-wrap gap-2">
            {dashboardState.categories.map(({ _id, category, status }) => {
              return (
                <div
                  key={_id}
                  className={`flex flex-row items-center gap-2 px-4 py-1 rounded-full ${
                    status ? "bg-zinc-700" : "bg-zinc-800"
                  } text-zinc-50`}
                >
                  <h6 className="small-h6">{`${category[0]} . ${category[1]}`}</h6>
                  <i
                    className="icon-24"
                    onClick={() => {
                      deleteCategory(_id, {
                        msg: `${dashboardState.profile?.name} removed a category (${category[0]} . ${category[1]})`,
                      });
                    }}
                  >
                    <BsX />
                  </i>
                </div>
              );
            })}
          </div>

          <div className="flex flex-row items-center gap-2 flex-wrap">
            <div className="h-12 w-full sm:w-[calc(50%-4px)] px-2 rounded-lg bg-zinc-700 shadow-md">
              <input
                ref={enInputRef}
                className="w-full h-full text-zinc-50 p bg-transparent"
                onChange={(e) => {
                  const newArr = categories.newCategory.map((item, index) => {
                    if (index === 0) return e.target.value;
                    return item;
                  });
                  setCategories({ ...categories, newCategory: [...newArr] });
                }}
                type="text"
                placeholder="English category ..."
              />
            </div>
            <div className="h-12 w-full sm:w-[calc(50%-4px)] px-2 rounded-lg bg-zinc-700 shadow-md">
              <input
                ref={frInputRef}
                className="w-full h-full text-zinc-50 p bg-transparent"
                onChange={(e) => {
                  const newArr = categories.newCategory.map((item, index) => {
                    if (index === 1) return e.target.value;
                    return item;
                  });
                  setCategories({ ...categories, newCategory: [...newArr] });
                }}
                type="text"
                placeholder="French category ..."
              />
            </div>
            <button
              className="ml-auto px-3 py-1 bg-blue-600 rounded-md"
              onClick={() => {
                if (
                  categories.newCategory[0] !== "" &&
                  categories.newCategory[1] !== ""
                ) {
                  postCategory(
                    { category: categories.newCategory, status: true },
                    {
                      msg: `"${dashboardState.profile.name}" added a new category (${categories.newCategory[0]} . ${categories.newCategory[1]})`,
                    }
                  );
                  enInputRef.current.value = "";
                  frInputRef.current.value = "";
                }
              }}
            >
              <h6 className="small-h6 text-zinc-50">Add</h6>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardCategories;
