import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession, useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { BsEye, BsFillSuitHeartFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
import { stateContext } from "@/pages/_app";
import ProfileDescription from "@/components/ProfileDescription";
import ProfileSocial from "@/components/ProfileSocial";
import ProfileElement from "@/components/ProfileElement";
import ProfileHeader from "@/components/ProfileHeader";
import AdminNotification from "@/components/adminNotification";
import axios from "axios";
import AdminProjects from "@/components/adminProjects";
import AdminMessage from "@/components/adminMessage";
import AdminGlobal from "@/components/adminGlobal";
import ProfileUser from "@/components/Profile";
import Head from "next/head";

export const profileContext = createContext();

function Profile({
  profile,
  admin,
  websiteData,
  allProjects,
  global,
  categories,
}) {
  // component starts here---------------------------------------
  const {
    reload,
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
    deleteProject,
    updateProfile,
    setMyProfile,
    setUID,
  } = useContext(stateContext);
  const { navStatus, setNavStatus } = useContext(stateContext);

  const [currScroll, setCurrScroll] = useState(0);
  const [currScrollDist, setCurrScrollDist] = useState(0);
  const [currNavItem, setCurrNavItem] = useState("notifications");
  const [projects, setProjects] = useState([]);
  const [navItems, setNavItems] = useState([
    "notifications",
    "global",
    "all",
    "recommended",
    "processing",
    "pending",
    "approved",
    "declined",
    "blocked",
    "message",
  ]);
  const [filteredProjects, setFilteredProjects] = useState({
    all: [],
    recommended: [],
    approved: [],
    pending: [],
    processing: [],
    declined: [],
    blocked: [],
  });
  const [sessionStatus, setSessionStatus] = useState("unauthenticated");
  const [sessionState, setSessionState] = useState();
  const [newHeader, setNewHeader] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newFunds, setNewFunds] = useState();
  const [newFacebook, setNewFacebook] = useState();
  const [newTwitter, setNewTwitter] = useState();
  const [newYoutube, setNewYoutube] = useState();
  const [newInstagram, setNewInstagram] = useState();
  const [newPhone, setNewPhone] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newCcp, setNewCcp] = useState();
  const [newKey, setNewKey] = useState();
  const [newPaypal, setNewPaypal] = useState();
  const [modifyItem, setModifyItem] = useState({
    header: false,
    description: false,
    funds: false,
    facebook: false,
    twitter: false,
    youtube: false,
    instagram: false,
    phone: false,
    email: false,
    ccp: false,
    key: false,
    paypal: false,
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    const horizontalScroll = () => {
      setCurrScroll(window.scrollY);
    };
    horizontalScroll();
    document.addEventListener("scroll", horizontalScroll);
    return () => document.removeEventListener("scroll", horizontalScroll);
  }, []);
  useEffect(() => {
    setCurrScrollDist(currScroll - navStatus.horScroll);
    if (currScrollDist >= 0 && currScroll > 400) {
      setNavStatus({
        ...navStatus,
        status: false,
        horScroll: currScroll,
        distScrolled: currScrollDist,
      });
    } else if (currScrollDist < 0 && currScroll > 400) {
      setNavStatus({
        ...navStatus,
        status: true,
        horScroll: currScroll,
        distScrolled: currScrollDist,
      });
    } else if (currScroll <= 400) {
      setNavStatus({
        ...navStatus,
        status: true,
        horScroll: currScroll,
        distScrolled: currScrollDist,
      });
    }
  }, [currScroll]);

  useEffect(() => {
    if (adminMSG.status) {
      setCurrNavItem("message");
    }
  }, [adminMSG]);

  useEffect(() => {
    if (currNavItem !== "message") {
      setAdminMSG({
        status: false,
        type: "mass",
        destinationId: "",
        destinationName: "",
        subject: "",
        msg: "",
        details: "",
      });
    }
  }, [currNavItem]);

  useEffect(() => {
    setProjects(allProjects);
    setFilteredProjects({
      all: allProjects,
      recommended: allProjects?.filter(
        (project) => project.status === "recommended"
      ),
      approved: allProjects?.filter((project) => project.status === "approved"),
      pending: allProjects?.filter((project) => project.status === "pending"),
      processing: allProjects?.filter(
        (project) => project.status === "processing"
      ),
      declined: allProjects?.filter((project) => project.status === "declined"),
      blocked: allProjects?.filter((project) => project.status === "blocked"),
    });
  }, [allProjects]);

  useEffect(() => {
    const secureProfile = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else if (session && !admin) {
        setSessionStatus("authenticated");
        setSessionState(session);
        setPrflLikes(profile?.likes);
        setPrflRaised(profile?.raised);
        setPrflDonators(profile?.donators);
        setPrflViews(profile?.views);
        setPrflHeader(profile?.header);
        setPrflDescription(profile?.description);
        setPrflFunds(profile?.funds);
        setPrflFacebook(profile?.facebook);
        setPrflTwitter(profile?.twitter);
        setPrflYoutube(profile?.youtube);
        setPrflInstagram(profile?.instagram);
        setPrflPhone(profile?.phone);
        setPrflEmail(profile?.bussinessEmail);
        setPrflCcp(profile?.ccp);
        setPrflKey(profile?.key);
        setPrflPaypal(profile?.paypal);

        setMyProfile(profile);
        setUID(session.user.id);

        // if (profile?.status === "processing") {
        //   setPrflStatusMSG({
        //     header: "Profile processing",
        //     msg: `please fill ${
        //       profile?.header
        //         ? "the description field"
        //         : profile?.description
        //         ? "the header field"
        //         : "the header & description fields"
        //     }`,
        //     details:
        //       "the project won't be displayed in the website if it doesn't have a header and a description, please enter them for the project to be approved",
        //   });
        // }
        // if (profile?.status === "pending") {
        //   setPrflStatusMSG({
        //     header: "Project pending",
        //     msg: `please ${"wait until your project gets approved"}`,
        //     details:
        //       "in pending mode we check your project, then approves it or decline it, an aproved project will eventually appear on the website",
        //   });
        // }
      } else if (session && admin) {
        setSessionState(session);
      }
    };
    secureProfile();
  }, [profile]);

  // return-------------------------------------------------------------------------------------------------------------
  {
    if (admin) {
      return (
        <profileContext.Provider value={{ websiteData, allProjects, global }}>
          <div className="admin">
            <Head>
              <title>FINANCEE | admin</title>
              <meta name="description" content="FINANCEE admin page" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <div className="profile-user">
              <div className="profile-user-img">
                {sessionState && (
                  <Image
                    src={sessionState?.user.image}
                    // src={`${session?.user.image}`}
                    alt={""}
                    width={100}
                    height={100}
                  ></Image>
                )}
              </div>
              <h5 className="h5 black-90">{`${sessionState?.user.name}`}</h5>
            </div>
            <div className="admin-nav-header">
              {navItems.map((item) => {
                return (
                  <div className="" key={navItems.indexOf(item)}>
                    <h6
                      onClick={() => {
                        setCurrNavItem(`${item}`);
                      }}
                      className={
                        currNavItem === `${item}`
                          ? "h6 blue-link fit-width"
                          : "h6 black-70 fit-width"
                      }
                    >
                      {item}
                    </h6>
                  </div>
                );
              })}
            </div>
            {currNavItem === "notifications" ? (
              <div className="admin-notifications">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">Notifications</h5>
                  <button className="admin-item-button hover-text-btn">
                    <h6 className="h6 black-90">clear all</h6>
                  </button>
                </div>
                {websiteData?.notifications.map(
                  ({ _id, user, id, item, subject, msg }) => {
                    return (
                      <AdminNotification
                        key={_id}
                        _id={_id}
                        id={id}
                        user={user}
                        item={item}
                        subject={subject}
                        msg={msg}
                      />
                    );
                  }
                )}
              </div>
            ) : currNavItem === "message" ? (
              <AdminMessage />
            ) : currNavItem === "global" ? (
              <AdminGlobal global={global} />
            ) : currNavItem === "processing" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | processing</h5>
                </div>
                <AdminProjects filteredProjects={filteredProjects.processing} />
              </div>
            ) : currNavItem === "pending" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | pending</h5>
                </div>
                <AdminProjects filteredProjects={filteredProjects.pending} />
              </div>
            ) : currNavItem === "all" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | all</h5>
                </div>

                <AdminProjects filteredProjects={filteredProjects.all} />
              </div>
            ) : currNavItem === "declined" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | declined</h5>
                </div>

                <AdminProjects filteredProjects={filteredProjects.declined} />
              </div>
            ) : currNavItem === "blocked" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | blocked</h5>
                </div>

                <AdminProjects filteredProjects={filteredProjects.blocked} />
              </div>
            ) : (
              currNavItem === "recommended" && (
                <div className="admin-projects">
                  <div className="admin-item-header">
                    <h5 className="h5 black-90">PROJECTS | recommended</h5>
                  </div>
                  <AdminProjects
                    filteredProjects={filteredProjects.recommended}
                  />
                </div>
              )
            )}
          </div>
        </profileContext.Provider>
      );
    } else {
      return (
        <profileContext.Provider
          value={{
            sessionState,
            myProfile,
            categories,
            profile,
            prflStatusMSG,
            newHeader,
            setNewHeader,
            newDescription,
            setNewDescription,
            newFunds,
            setNewFunds,
            newFacebook,
            setNewFacebook,
            newInstagram,
            setNewInstagram,
            newTwitter,
            setNewTwitter,
            newYoutube,
            setNewYoutube,
            newEmail,
            setNewEmail,
            newPhone,
            setNewPhone,
            newCcp,
            setNewCcp,
            newKey,
            setNewKey,
            newPaypal,
            setNewPaypal,
            modifyItem,
            setModifyItem,
            session,
            addPrflItem,
            updateProfile,
          }}
        >
          {myProfile && <ProfileUser />}
        </profileContext.Provider>
      );
    }
  }
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `https://financee.onrender.com/api/auth/signin?callbackUrl=${"https://financee.onrender.com/profile"}`,
        peranent: false,
      },
    };
  }
  // process.env.PROFILE_URL

  const categories = await fetch(`https://financee.onrender.com/api/categories`)
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));

  if (session?.user.email === "ihab.financee@gmail.com") {
    const websiteData = await fetch(
      `https://financee.onrender.com/api/admin`
    ).then((data) => {
      return data.json();
    });
    const allProjects = await fetch(
      `https://financee.onrender.com/api/projects`
    ).then((data) => {
      return data.json();
    });
    const global = await fetch(
      `https://financee.onrender.com/api/admin/global`
    ).then((data) => {
      return data.json();
    });
    return {
      props: {
        admin: true,
        websiteData,
        allProjects,
        global,
        categories,
      },
    };
  }

  const form = {
    name: session.user.name,
    email: session.user.email,
    id: session.user.id,
    profileImg: session.user.image,
  };
  const profile = await fetch(
    `https://financee.onrender.com/api/profile/${session.user?.id}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  ).then((data) => {
    return data.json();
  });
  return {
    props: {
      admin: false,
      profile,
      categories,
    },
  };
}
