import React, { createContext, useState } from "react";
import "@/styles/global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/app/store";
import Popups from "@/components/Popups";
import axios from "axios";
import { useRouter } from "next/router";

export const appContext = createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  //--------------------------------------------------
  const router = useRouter();
  const [projectState, setProjectState] = useState({
    status: "edit",
    project: {},
    newDonation: { status: true },
    checkoutState: false,
    checkout: {
      uid: "",
      uname: "",
      pid: "",
      pname: "",
      amount: "",
      details: "",
      image: "",
      operation: "",
    },
  });

  const setItems = (field, item, newItem) => {
    if (field === "donation" && item === "details") {
      setProjectState({
        ...projectState,
        newDonation: { ...projectState.newDonation, details: newItem },
      });
    } else if (field === "donation" && item === "amount") {
      setProjectState({
        ...projectState,
        newDonation: { ...projectState.newDonation, min_amount: newItem },
      });
    }
  };

  const postItem = async (path, item, notification) => {
    // console.log("_app", path, item);
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }${path}`,
        item
      )
      .then((res) => {
        if (path !== "/api/transactions")
          setProjectState({ ...projectState, project: res.data });
      });
  };
  if (["/dashboard"].includes(router.pathname)) {
    return (
      <>
        <SessionProvider session={session}>
          <Provider store={store}>
            <appContext.Provider
              value={{
                projectState: projectState,
                setProjectState: setProjectState,
                setItems: setItems,
                postItem: postItem,
              }}
            >
              <Component {...pageProps} />
            </appContext.Provider>
          </Provider>
        </SessionProvider>
      </>
    );
  } else {
    return (
      <>
        <SessionProvider session={session}>
          <Provider store={store}>
            <appContext.Provider
              value={{
                projectState: projectState,
                setProjectState: setProjectState,
                setItems: setItems,
                postItem: postItem,
              }}
            >
              <Header />
              {/* <Popups /> */}
              <Component {...pageProps} />
              <Footer />
            </appContext.Provider>
          </Provider>
        </SessionProvider>
      </>
    );
  }
}
