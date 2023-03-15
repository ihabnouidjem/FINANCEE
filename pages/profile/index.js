import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getSession,
  // getServerSession,
  useSession,
  signIn,
} from "next-auth/react";
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
import axios, { Axios } from "axios";
import AdminProjects from "@/components/adminProjects";
import AdminMessage from "@/components/adminMessage";
import AdminGlobal from "@/components/adminGlobal";
import ProfileUser from "@/components/Profile";
import Head from "next/head";

export const profileContext = createContext();

function Profile({
  profile,
  myProjects,
  admin,
  websiteData,
  allProjects,
  global,
  categories,
}) {
  // component starts here---------------------------------------
  const {
    reload,
    setReload,
    adminMSG,
    prflStatusMSG,
    setAdmin,
    myProfile,
    setAdminMSG,
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
    updateProfile,
    setMyProfile,
    setUID,
  } = useContext(stateContext);
  const { navStatus, setNavStatus } = useContext(stateContext);

  const [currScroll, setCurrScroll] = useState(0);
  const [currScrollDist, setCurrScrollDist] = useState(0);
  const [currNavItem, setCurrNavItem] = useState("notifications");
  const [adminProjects, setAdminProjects] = useState([]);
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
    setAdminProjects(allProjects);
  }, [allProjects]);
  useEffect(() => {
    setFilteredProjects({
      all: adminProjects,
      recommended: adminProjects?.filter(
        (project) => project.status === "recommended"
      ),
      approved: adminProjects?.filter(
        (project) => project.status === "approved"
      ),
      pending: adminProjects?.filter((project) => project.status === "pending"),
      processing: adminProjects?.filter(
        (project) => project.status === "processing"
      ),
      declined: adminProjects?.filter(
        (project) => project.status === "declined"
      ),
      blocked: adminProjects?.filter((project) => project.status === "blocked"),
    });
  }, [adminProjects]);

  useEffect(() => {
    if (reload.status && reload.function === "fetchAdminProjects") {
      axios
        .get(`https://financee-nu.vercel.app/api/projects/test`)
        .then((res) => {
          setAdminProjects(res.data);
          setReload({
            status: false,
            function: "",
            uid: "",
            path: "",
          });
        });
    }
  }, [reload]);

  useEffect(() => {
    setAdmin(admin);
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
      } else if (session && admin) {
        setSessionState(session);
      }
    };
    secureProfile();
  }, [profile, admin, session]);

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
              {/* <div className="profile-user-img">
                {sessionState && (
                  <Image
                    src={sessionState?.user.image}
                    // src={`${session?.user.image}`}
                    alt={""}
                    width={100}
                    height={100}
                  ></Image>
                )}
              </div> */}
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
                  {websiteData && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {websiteData.notifications.length}
                    </h5>
                  )}

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
                  {filteredProjects && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {filteredProjects.processing.length}
                    </h5>
                  )}
                </div>
                <AdminProjects filteredProjects={filteredProjects.processing} />
              </div>
            ) : currNavItem === "pending" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | pending</h5>
                  {filteredProjects && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {filteredProjects.pending.length}
                    </h5>
                  )}
                </div>
                <AdminProjects filteredProjects={filteredProjects.pending} />
              </div>
            ) : currNavItem === "all" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | all</h5>
                  {filteredProjects && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {filteredProjects.all.length}
                    </h5>
                  )}
                </div>

                <AdminProjects filteredProjects={filteredProjects.all} />
              </div>
            ) : currNavItem === "declined" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | declined</h5>
                  {filteredProjects && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {filteredProjects.declined.length}
                    </h5>
                  )}
                </div>

                <AdminProjects filteredProjects={filteredProjects.declined} />
              </div>
            ) : currNavItem === "blocked" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | blocked</h5>
                  {filteredProjects && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {filteredProjects.blocked.length}
                    </h5>
                  )}
                </div>

                <AdminProjects filteredProjects={filteredProjects.blocked} />
              </div>
            ) : currNavItem === "approved" ? (
              <div className="admin-projects">
                <div className="admin-item-header">
                  <h5 className="h5 black-90">PROJECTS | approved</h5>
                  {filteredProjects && (
                    <h5 className="h5 blue-link admin-item-counter">
                      {filteredProjects.approved.length}
                    </h5>
                  )}
                </div>

                <AdminProjects filteredProjects={filteredProjects.approved} />
              </div>
            ) : (
              currNavItem === "recommended" && (
                <div className="admin-projects">
                  <div className="admin-item-header">
                    <h5 className="h5 black-90">PROJECTS | recommended</h5>
                    {filteredProjects && (
                      <h5 className="h5 blue-link admin-item-counter">
                        {filteredProjects.recommended.length}
                      </h5>
                    )}
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
            myProjects,
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
            // addNewProject,
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
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }

  const categories = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NODE_ENV === "production" &&
          "https://financee-nu.vercel.app"
    }/api/categories`
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));

  if (
    session?.user.email === "ihab.financee@gmail.com" ||
    session?.user.email === "saif.financee@gmail.com"
  ) {
    const websiteData = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.NODE_ENV === "production" &&
            "https://financee-nu.vercel.app"
      }/api/admin`
    ).then((data) => {
      return data.json();
    });
    const allProjects = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.NODE_ENV === "production" &&
            "https://financee-nu.vercel.app"
      }/api/projects/test`
    ).then((data) => {
      return data.json();
    });
    const global = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.NODE_ENV === "production" &&
            "https://financee-nu.vercel.app"
      }/api/admin/global`
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
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NODE_ENV === "production" &&
          "https://financee-nu.vercel.app"
    }/api/profile/${session.user?.id}`,

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
  if (profile.projects) {
    var myProjects = profile.projects;
  } else {
    var myProjects = [];
  }

  return {
    props: {
      admin: false,
      profile,
      myProjects: myProjects,
      categories,
    },
  };
}
