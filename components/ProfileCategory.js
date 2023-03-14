import { profileContext } from "@/pages/profile";
import { projectContext } from "@/pages/profile/[projectId]";
import { stateContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

function ProfileCategory(
  {
    // myProfile
  }
) {
  const [changeCategory, setChangeCategory] = useState({
    status: false,
    newCategory: { category: "" },
  });
  const [filteredCategories, setFilteredCategories] = useState([]);

  const { session, projectState } = useContext(projectContext);
  const { addPrjctItem, myCategories } = useContext(stateContext);

  useEffect(() => {
    if (projectState.category) {
      setFilteredCategories(
        myCategories.filter((category) => {
          return category.category !== projectState.category;
        })
      );
    } else {
      setFilteredCategories(myCategories);
    }
  }, [projectState, myCategories]);

  return (
    <div className="profileCategory">
      <div className="profileCategory-header">
        {projectState.category && !changeCategory.status ? (
          <p className="p black-50">{`my category : ${projectState.category}`}</p>
        ) : (
          <p className="p black-50">choose category :</p>
        )}
        {projectState.category && !changeCategory.status ? (
          <div
            className="text-icon"
            onClick={() => {
              setChangeCategory({ ...changeCategory, status: true });
            }}
          >
            <i className="icon-24 black-90">
              <AiTwotoneEdit />
            </i>
            <p className="small-p black-90">modify</p>
          </div>
        ) : !changeCategory.status ? (
          <div
            className="text-icon"
            onClick={() => {
              addPrjctItem(projectState._id, changeCategory.newCategory, {
                user: session.user.name,
                id: session.user.id,
                subject: "ADDED",
                msg: `${
                  session.user.name ? session.user.name : session.user.id
                } added a category to ${projectState.projectName}`,
                item: "category",
              });
              setChangeCategory({
                status: false,
                newCategory: { category: "" },
              });
            }}
          >
            <i className="icon-24 black-90">
              <IoAddOutline />
            </i>
            <p className="small-p black-90">add</p>
          </div>
        ) : (
          changeCategory.status && (
            <div
              className="text-icon"
              onClick={() => {
                if (changeCategory.status) {
                  addPrjctItem(projectState._id, changeCategory.newCategory, {
                    user: session.user.name,
                    id: session.user.id,
                    subject: "MODIFIED",
                    msg: `${
                      session.user.name ? session.user.name : session.user.id
                    } modified ${projectState.projectName}'s category`,
                    item: "category",
                  });
                  setChangeCategory({
                    status: false,
                    newCategory: { category: "" },
                  });
                }
              }}
            >
              <i className="icon-24 black-90">
                <BsCheck />
              </i>
              <p className="small-p black-90">apply</p>
            </div>
          )
        )}
      </div>
      {(changeCategory.status || !projectState.category) && (
        <div className="profileCategory-categories">
          {filteredCategories.map((category) => {
            if (category.status) {
              return (
                <button
                  key={category._id}
                  className={"profileCategory-category"}
                >
                  <p
                    onClick={() => {
                      setChangeCategory({
                        ...changeCategory,
                        newCategory: { category: `${category.category}` },
                      });
                    }}
                    className="p black-50"
                  >
                    {category.category}
                  </p>
                </button>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default ProfileCategory;
