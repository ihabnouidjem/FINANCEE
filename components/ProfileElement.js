import React, { useContext, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";
import { projectContext } from "@/pages/profile/[projectId]";

function ProfileElement({ element, profileElement, session, project }) {
  const { myProfile, addPrflItem, addPrjctItem } = useContext(stateContext);
  // const { projectState } = useContext(projectContext);

  const [newElement, setNewElement] = useState({
    status: false,
    state: "empty",
    element: "",
  });
  // console.log(profileElement, newElement);
  if (profileElement && !newElement.status) {
    return (
      <div className="profile-forms-container-row">
        <p className="p black-50">
          {element === "amount"
            ? `${element} | ${profileElement} DA`
            : `${element} | ${profileElement} `}
        </p>
        <div className="profile-form-buttons">
          <button
            className="profile-form-button"
            onClick={() => {
              setNewElement({ ...newElement, status: true });
            }}
          >
            <i className="icon-24 black-90">
              <AiTwotoneEdit />
            </i>
            <p className="small-p black-90">modify</p>
          </button>
          <button
            className="profile-form-button"
            onClick={() => {
              element === "amount"
                ? addPrjctItem(
                    project._id,
                    { amount: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        session.user?.name
                          ? session.user?.name
                          : session.user?.id
                      } deleted ${projectState.projectName}'s amount`,
                      item: "amount",
                    }
                  )
                : element === "phone"
                ? addPrflItem(
                    session.user?.id,
                    { phone: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        session.user?.name
                          ? session.user?.name
                          : session.user?.id
                      } deleted there phone`,
                      item: "phone",
                    }
                  )
                : element === "email"
                ? addPrflItem(
                    session.user?.id,
                    { businessEmail: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        session.user?.name
                          ? session.user?.name
                          : session.user?.id
                      } deleted there email`,
                      item: "email",
                    }
                  )
                : element === "ccp"
                ? addPrflItem(
                    session.user?.id,
                    { ccp: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        session.user?.name
                          ? session.user?.name
                          : session.user?.id
                      } deleted there ccp`,
                      item: "ccp",
                    }
                  )
                : element === "key"
                ? addPrflItem(
                    session.user?.id,
                    { key: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        session.user?.name
                          ? session.user?.name
                          : session.user?.id
                      } deleted there key`,
                      item: "key",
                    }
                  )
                : element === "paypal" &&
                  addPrflItem(
                    session.user?.id,
                    { paypal: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        session.user?.name
                          ? session.user?.name
                          : session.user?.id
                      } deleted there paypal`,
                      item: "paypal",
                    }
                  );
            }}
          >
            <i className="icon-24 black-90">
              <AiOutlineDelete />
            </i>
            <p className="small-p black-90">delete</p>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-form">
        <input
          onChange={(e) => {
            if (e.target.value !== "") {
              setNewElement({
                ...newElement,
                status: true,
                state: "filled",
                element: `${e.target.value}`,
              });
            } else {
              setNewElement({
                ...newElement,
                state: "empty",
                element: `${e.target.value}`,
              });
            }
          }}
          className="profile-form-input"
          placeholder={`${element}`}
        />
        <div className="profile-form-buttons">
          <button
            onClick={
              element === "amount"
                ? () => {
                    if (newElement.status && newElement.state === "filled") {
                      addPrjctItem(
                        project._id,
                        { amount: newElement.element },
                        {
                          user: session.user.name,
                          id: session.user.id,
                          subject: "MODIFIED",
                          msg: `${
                            session.user?.name
                              ? session.user?.name
                              : session.user?.id
                          } modified ${project.projectName} amount`,
                          item: "amount",
                        }
                      );
                    }
                    setNewElement({
                      status: false,
                      state: "empty",
                      element: "",
                    });
                  }
                : element === "phone"
                ? () => {
                    if (newElement.status && newElement.state === "filled") {
                      addPrflItem(
                        session?.user.id,
                        { phone: newElement.element },
                        {
                          user: session.user.name,
                          id: session.user.id,
                          subject: "MODIFIED",
                          msg: `${
                            session.user?.name
                              ? session.user?.name
                              : session.user?.id
                          } modified there phone`,
                          item: "phone",
                        }
                      );
                    }
                    setNewElement({
                      status: false,
                      state: "empty",
                      element: "",
                    });
                  }
                : element === "email"
                ? () => {
                    if (newElement.status && newElement.state === "filled") {
                      addPrflItem(
                        session?.user.id,
                        { businessEmail: newElement.element },
                        {
                          user: session.user.name,
                          id: session.user.id,
                          subject: "MODIFIED",
                          msg: `${
                            session.user?.name
                              ? session.user?.name
                              : session.user?.id
                          } modified there email`,
                          item: "email",
                        }
                      );
                    }
                    setNewElement({
                      status: false,
                      state: "empty",
                      element: "",
                    });
                  }
                : element === "ccp"
                ? () => {
                    if (newElement.status && newElement.state === "filled") {
                      addPrflItem(
                        session?.user.id,
                        { ccp: newElement.element },
                        {
                          user: session.user.name,
                          id: session.user.id,
                          subject: "MODIFIED",
                          msg: `${
                            session.user?.name
                              ? session.user?.name
                              : session.user?.id
                          } modified there ccp`,
                          item: "ccp",
                        }
                      );
                    }
                    setNewElement({
                      status: false,
                      state: "empty",
                      element: "",
                    });
                  }
                : element === "key"
                ? () => {
                    if (newElement.status && newElement.state === "filled") {
                      addPrflItem(
                        session?.user.id,
                        { key: newElement.element },
                        {
                          user: session.user.name,
                          id: session.user.id,
                          subject: "MODIFIED",
                          msg: `${
                            session.user?.name
                              ? session.user?.name
                              : session.user?.id
                          } modified there key`,
                          item: "key",
                        }
                      );
                    }
                    setNewElement({
                      status: false,
                      state: "empty",
                      element: "",
                    });
                  }
                : element === "paypal" &&
                  (() => {
                    if (newElement.status && newElement.state === "filled") {
                      addPrflItem(
                        session?.user.id,
                        { paypal: newElement.element },
                        {
                          user: session.user.name,
                          id: session.user.id,
                          subject: "MODIFIED",
                          msg: `${
                            session.user?.name
                              ? session.user?.name
                              : session.user?.id
                          } modified there paypal`,
                          item: "paypal",
                        }
                      );
                    }
                    setNewElement({
                      status: false,
                      state: "empty",
                      element: "",
                    });
                  })
            }
            className="profile-form-button"
          >
            <i className="icon-24 black-90">
              <BsCheck />
            </i>
            <p className="small-p black-90">apply</p>
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileElement;
