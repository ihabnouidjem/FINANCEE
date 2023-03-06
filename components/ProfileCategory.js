import { profileContext } from "@/pages/profile";
import { stateContext } from "@/pages/_app";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

function ProfileCategory({ myProfile }) {
  const [changeCategory, setChangeCategory] = useState({
    status: false,
    newCategory: { category: "" },
  });
  const [filteredCategories, setFilteredCategories] = useState([]);

  const { session, categories } = useContext(profileContext);
  const { addPrflItem } = useContext(stateContext);

  useEffect(() => {
    if (myProfile.category) {
      setFilteredCategories(
        categories.filter((category) => {
          return category.category !== myProfile.category;
        })
      );
    } else {
      setFilteredCategories(categories);
    }
  }, [myProfile]);

  return (
    <div className="profileCategory">
      <div className="profileCategory-header">
        {myProfile.category && !changeCategory.status ? (
          <p className="p black-50">{`my category : ${myProfile.category}`}</p>
        ) : (
          <p className="p black-50">choose category :</p>
        )}
        {myProfile.category && !changeCategory.status ? (
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
              addPrflItem(session.user.id, changeCategory.newCategory, {
                user: session.user.name,
                id: session.user.id,
                subject: "ADDED",
                msg: `${
                  myProfile.header ? myProfile.header : myProfile.id
                } added a category`,
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
                  addPrflItem(session.user.id, changeCategory.newCategory, {
                    user: session.user.name,
                    id: session.user.id,
                    subject: "MODIFIED",
                    msg: `${
                      myProfile.header ? myProfile.header : myProfile.id
                    } modified there category`,
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
      {(changeCategory.status || !myProfile.category) && (
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
