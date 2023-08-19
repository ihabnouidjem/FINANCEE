import { setProfile } from "@/features/profileSlice";
import { createMockUserToken } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfileNewUser() {
  const language = useSelector((state) => state.language?.language);
  const session = useSelector((state) => state.session.session);

  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    entrepreneur: {
      id: session.id,
      name: session.name,
      email: session.email,
      image: session.image,
      projects: [],
      status: "entrepreneur",
    },
    investor: {
      id: session.id,
      name: session.name,
      email: session.email,
      image: session.image,
      status: "investor",
    },
  });

  const createUser = async (user) => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "domain here"
            : "http://localhost:3000"
        }/api/profile`,
        user
      )
      .then((res) => {
        // console.log("profilenewuser, axios", res.data);
        if (res.data) {
          dispatch(
            setProfile({
              profile: res.data,
              projects: res.data.projects,
              status: res.data.status,
            })
          );
        }
      });
  };

  useEffect(() => {
    setNewUser({
      ...newUser,
      entrepreneur: {
        ...newUser.entrepreneur,
        id: session.id,
        name: session.name,
        email: session.email,
        image: session.image,
      },
      investor: {
        ...newUser.investor,
        id: session.id,
        name: session.name,
        email: session.email,
        image: session.image,
      },
    });
  }, [session]);
  // console.log("profilenewuser", newUser.entrepreneur);

  return (
    <div className="w-full px-4 sm:px-8 xl:px-16 py-16 bg-white flex flex-wrap flex-row items-center justify-center gap-6">
      <div className="w-full px-4">
        <h6 className=" text-center h6">
          {language === "english"
            ? "Welcome to the financee family, Choose the type of account you want!"
            : language === "francais" &&
              "Bienvenue dans la famille financee, Choisissez le type de compte que vous souhaitez !"}
        </h6>
      </div>

      <button
        className="w-[min(94%,180px)] sm:w-[min(94%,220px)] py-2 rounded-xl bg-gray-900 shadow-lg"
        onClick={() => {
          createUser(newUser.entrepreneur);
        }}
      >
        <h6 className="h6 text-gray-50 w-full text-center whitespace-nowrap text-ellipsis overflow-hidden">
          {language === "english"
            ? "Entrepreneur"
            : language === "francais" && "Entrepreneur"}
        </h6>
      </button>
      <button
        className="w-[min(94%,180px)] sm:w-[min(94%,220px)] py-2 rounded-xl bg-gray-100 shadow-lg"
        onClick={() => {
          createUser(newUser.investor);
        }}
      >
        <h6 className="h6 text-gray-900 w-full text-center whitespace-nowrap text-ellipsis overflow-hidden">
          {language === "english"
            ? "Investor"
            : language === "francais" && "Investisseur"}
        </h6>
      </button>
    </div>
  );
}

export default ProfileNewUser;
