import React, { useContext } from "react";
import { BsCheck } from "react-icons/bs";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { stateContext } from "@/pages/_app";

function ProfileElement({
  item,
  newItem,
  setNewItem,
  prflItem,
  modifyItem,
  setModifyItem,
  session,
  addPrflItem,
  updateProfile,
}) {
  const { myProfile } = useContext(stateContext);

  if (
    (item === "amount" && prflItem && !modifyItem.funds) ||
    (item === "phone" && prflItem && !modifyItem.phone) ||
    (item === "email" && prflItem && !modifyItem.email) ||
    (item === "ccp" && prflItem && !modifyItem.ccp) ||
    (item === "key" && prflItem && !modifyItem.key) ||
    (item === "paypal" && prflItem && !modifyItem.paypal)
  ) {
    return (
      <div className="profile-forms-container-row">
        <p className="p black-50">
          {item === "amount"
            ? `${item} | ${prflItem} DA`
            : `${item} | ${prflItem}`}
        </p>
        <div className="profile-form-buttons">
          <button
            className="profile-form-button"
            onClick={() => {
              item === "amount"
                ? setModifyItem({ ...modifyItem, funds: true })
                : item === "phone"
                ? setModifyItem({ ...modifyItem, phone: true })
                : item === "email"
                ? setModifyItem({ ...modifyItem, email: true })
                : item === "ccp"
                ? setModifyItem({ ...modifyItem, ccp: true })
                : item === "key"
                ? setModifyItem({ ...modifyItem, key: true })
                : item === "paypal" &&
                  setModifyItem({ ...modifyItem, paypal: true });
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
              item === "amount"
                ? addPrflItem(
                    session?.user.id,
                    { funds: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : myProfile.id
                      } deleted there amount`,
                      item: "amount",
                    }
                  )
                : item === "phone"
                ? addPrflItem(
                    session?.user.id,
                    { phone: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : myProfile.id
                      } deleted there phone`,
                      item: "phone",
                    }
                  )
                : item === "email"
                ? addPrflItem(
                    session?.user.id,
                    { bussinessEmail: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : myProfile.id
                      } deleted there email`,
                      item: "email",
                    }
                  )
                : item === "ccp"
                ? addPrflItem(
                    session?.user.id,
                    { ccp: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : myProfile.id
                      } deleted there ccp`,
                      item: "ccp",
                    }
                  )
                : item === "key"
                ? addPrflItem(
                    session?.user.id,
                    { key: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : myProfile.id
                      } deleted there key`,
                      item: "key",
                    }
                  )
                : item === "paypal" &&
                  addPrflItem(
                    session?.user.id,
                    { paypal: "" },
                    {
                      user: session.user.name,
                      id: session.user.id,
                      subject: "DELETED",
                      msg: `${
                        myProfile.header ? myProfile.header : myProfile.id
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
            item === "amount"
              ? setNewItem({ funds: `${e.target.value}` })
              : item === "phone"
              ? setNewItem({ phone: `${e.target.value}` })
              : item === "email"
              ? setNewItem({ bussinessEmail: `${e.target.value}` })
              : item === "ccp"
              ? setNewItem({ ccp: `${e.target.value}` })
              : item === "key"
              ? setNewItem({ key: `${e.target.value}` })
              : item === "paypal" &&
                setNewItem({ paypal: `${e.target.value}` });
          }}
          className="profile-form-input"
          placeholder={`${item}`}
        />
        <div className="profile-form-buttons">
          <button
            onClick={
              item === "amount"
                ? () => {
                    setModifyItem({ ...modifyItem, funds: false });
                    if (newItem) {
                      addPrflItem(session?.user.id, newItem, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : myProfile.id
                        } modified there amount`,
                        item: "amount",
                      });
                    }
                    setNewItem();
                    // updateProfile(session?.user.id);
                  }
                : item === "phone"
                ? () => {
                    setModifyItem({ ...modifyItem, phone: false });
                    if (newItem) {
                      addPrflItem(session?.user.id, newItem, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : myProfile.id
                        } modified there phone`,
                        item: "phone",
                      });
                    }
                    setNewItem();
                    // updateProfile(session?.user.id);
                  }
                : item === "email"
                ? () => {
                    setModifyItem({ ...modifyItem, email: false });
                    if (newItem) {
                      addPrflItem(session?.user.id, newItem, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : myProfile.id
                        } modified there email`,
                        item: "email",
                      });
                    }
                    setNewItem();
                    // updateProfile(session?.user.id);
                  }
                : item === "ccp"
                ? () => {
                    setModifyItem({ ...modifyItem, ccp: false });
                    if (newItem) {
                      addPrflItem(session?.user.id, newItem, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : myProfile.id
                        } modified there ccp`,
                        item: "ccp",
                      });
                    }
                    setNewItem();
                    // updateProfile(session?.user.id);
                  }
                : item === "key"
                ? () => {
                    setModifyItem({ ...modifyItem, key: false });
                    if (newItem) {
                      addPrflItem(session?.user.id, newItem, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : myProfile.id
                        } modified there key`,
                        item: "key",
                      });
                    }
                    setNewItem();
                    // updateProfile(session?.user.id);
                  }
                : item === "paypal" &&
                  (() => {
                    setModifyItem({ ...modifyItem, paypal: false });
                    if (newItem) {
                      addPrflItem(session?.user.id, newItem, {
                        user: session.user.name,
                        id: session.user.id,
                        subject: "MODIFIED",
                        msg: `${
                          myProfile.header ? myProfile.header : myProfile.id
                        } modified there paypal`,
                        item: "paypal",
                      });
                    }
                    setNewItem();
                    // updateProfile(session?.user.id);
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
