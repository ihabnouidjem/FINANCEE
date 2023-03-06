import axios from "axios";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/banner.css";
import "@/styles/homeProjects.css";
import "@/styles/project.css";
import "@/styles/campaigns.css";
import "@/styles/payment.css";
import "@/styles/howwework.css";
import "@/styles/footer.css";
import "@/styles/projectsPage.css";
import "@/styles/projectPage.css";
import "@/styles/profile.css";
import "@/styles/admin.css";
import "@/styles/about.css";
import "@/styles/nav.css";
import Footer from "@/components/Footer";
import { useState, useEffect, createContext } from "react";
import Nav from "@/components/nav";

export const stateContext = createContext();

export default function App({ Component, pageProps }) {
  const [UID, setUID] = useState();
  const [reload, setReload] = useState({
    status: false,
    function: "",
    uid: "",
    path: "",
  });
  const [nav, setNav] = useState({ status: false, state: "" });
  const [navStatus, setNavStatus] = useState({
    status: true,
    horScroll: 0,
    prevHorScroll: 0,
    distScrolled: 0,
  });
  const [prflStatusMSG, setPrflStatusMSG] = useState({
    header: "",
    msg: "",
    details: "",
  });
  const [adminMSG, setAdminMSG] = useState({
    status: false,
    type: "mass",
    destinationId: "",
    destinationName: "",
    subject: "",
    msg: "",
    details: "",
  });
  const [myCategories, setMyCategories] = useState([]);
  const [myProfile, setMyProfile] = useState({});
  const [categories, setCategories] = useState([]);

  const [prflLikes, setPrflLikes] = useState();
  const [prflRaised, setPrflRaised] = useState();
  const [prflDonators, setPrflDonators] = useState();
  const [prflViews, setPrflViews] = useState();
  const [prflHeader, setPrflHeader] = useState();
  const [prflDescription, setPrflDescription] = useState();
  const [prflFunds, setPrflFunds] = useState();
  const [prflFacebook, setPrflFacebook] = useState();
  const [prflTwitter, setPrflTwitter] = useState();
  const [prflYoutube, setPrflYoutube] = useState();
  const [prflInstagram, setPrflInstagram] = useState();
  const [prflPhone, setPrflPhone] = useState();
  const [prflEmail, setPrflEmail] = useState();
  const [prflCcp, setPrflCcp] = useState();
  const [prflKey, setPrflKey] = useState();
  const [prflPaypal, setPrflPaypal] = useState();
  const [allProjects, setAllProjects] = useState();
  const [projects, setProjects] = useState([]);

  // functions
  const fetchMyProfile = async (UID) => {
    axios
      .get(`https://financee.onrender.com/api/profile/${UID}`)
      .then((res) => {
        setMyProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addPrflItem = async (uid, item, notification) => {
    await axios
      .put(`https://financee.onrender.com/api/profile/${uid}`, { item: item })
      .then((res) => {
        setReload({
          status: true,
          function: "updateProfile",
          uid: `${uid}`,
          path: "",
        });
      })
      .catch((err) => console.log(err));
    if (notification) {
      // console.log(notification);
      axios.post(
        `https://financee.onrender.com/api/admin/notifications`,
        notification
      );
    }
  };
  const addImage = async (uid, img, path, notification) => {
    let body = new FormData();
    body.append("uid", uid);
    body.append("img", img);
    body.append("path", path);
    axios
      .post(`https://financee.onrender.com/api/images/${uid}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setReload({
          status: true,
          function: "updateProfile",
          uid: `${uid}`,
          path: "",
        });
      })
      .catch((err) => console.log(err));
    if (notification) {
      // console.log(notification);
      axios.post(
        `https://financee.onrender.com/api/admin/notifications`,
        notification
      );
    }
  };
  const increaseField = async (pid, item) => {
    await axios
      .put(`https://financee.onrender.com/api/projects/${pid}`, { item: item })
      .then((res) => {
        setReload({
          status: true,
          function: "updateProject",
          uid: `${pid}`,
          path: "",
        });
      })
      .catch((err) => console.log(err));
    // if (notification) {
    //   console.log(notification, reload);
    //   axios.post(`https://financee.onrender.com/api/admin/notifications`, notification);
    // }
  };
  const deleteProject = (uid, item) => {
    axios
      .delete(`https://financee.onrender.com/api/profile/${uid}`, {
        item: item,
      })
      .then((res) => {
        setReload(true);
      })
      .catch((err) => console.log(err));
  };
  const updateProfile = (uid) => {
    axios
      .get(`https://financee.onrender.com/api/profile/${uid}`)
      .then((res) => {
        setMyProfile(res.data);
        setReload({
          status: false,
          function: "",
          uid: ``,
          path: "",
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`https://financee.onrender.com/api/categories`)
      .then((res) => {
        console.log(res.data);
        setMyCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log("reloading ...", reload, myProfile);
    if (reload.status) {
      if (reload.function === "updateProfile") {
        updateProfile(UID);
      }
      setReload(false);
    }
  }, [reload, UID]);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <stateContext.Provider
          value={{
            reload,
            nav,
            setNav,
            myCategories,
            setMyCategories,
            navStatus,
            projects,
            allProjects,
            adminMSG,
            prflStatusMSG,
            prflLikes,
            prflRaised,
            prflDonators,
            prflViews,
            prflHeader,
            prflDescription,
            prflFunds,
            prflFacebook,
            prflTwitter,
            prflYoutube,
            prflInstagram,
            prflPhone,
            prflEmail,
            prflCcp,
            prflKey,
            prflPaypal,
            myProfile,
            categories,

            setCategories,
            setNavStatus,
            setProjects,
            setAllProjects,
            setAdminMSG,
            setPrflStatusMSG,
            setPrflLikes,
            setPrflRaised,
            setPrflDonators,
            setPrflViews,
            setPrflHeader,
            setPrflDescription,
            setPrflFunds,
            setPrflFacebook,
            setPrflTwitter,
            setPrflYoutube,
            setPrflInstagram,
            setPrflPhone,
            setPrflEmail,
            setPrflCcp,
            setPrflKey,
            setPrflPaypal,
            addPrflItem,
            addImage,
            increaseField,
            deleteProject,
            updateProfile,
            setMyProfile,
            setUID,
          }}
        >
          <Header />
          {nav.status && <Nav />}
          <Component {...pageProps} />
          <Footer />
        </stateContext.Provider>
      </SessionProvider>
    </>
  );
}
