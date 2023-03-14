import React, { useContext } from "react";
import Image from "next/image";
import ProfileDescription from "./ProfileDescription";
import ProfileElement from "./ProfileElement";
import ProfileHeader from "./ProfileHeader";
import ProfileSocial from "./ProfileSocial";
import { BsEye, BsFillSuitHeartFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
import { profileContext } from "@/pages/profile";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai";
import { stateContext } from "@/pages/_app";
import ProfileCategory from "./ProfileCategory";
import ProfileMSG from "./ProfileMSG";
import ProfileImage from "./ProfileImage";
import Head from "next/head";
import Link from "next/link";
import ProfileProject from "./ProfileProject";

function ProfileUser() {
  const { reload } = useContext(stateContext);
  const {
    sessionState,
    myProfile,
    // profile,
    // prflStatusMSG,
    // newHeader,
    // setNewHeader,
    // newDescription,
    // setNewDescription,
    // newFunds,
    // setNewFunds,
    newFacebook,
    setNewFacebook,
    newInstagram,
    setNewInstagram,
    newTwitter,
    setNewTwitter,
    newYoutube,
    setNewYoutube,
    // newEmail,
    // setNewEmail,
    // newPhone,
    // setNewPhone,
    // newCcp,
    // setNewCcp,
    // newKey,
    // setNewKey,
    // newPaypal,
    // setNewPaypal,
    modifyItem,
    setModifyItem,
    session,
    addPrflItem,
    updateProfile,
    myProjects,
  } = useContext(profileContext);
  // console.log(myProfile);
  return (
    <div className="profile">
      <Head>
        <title>FINANCEE | {sessionState?.user.name}</title>
        <meta name="description" content="FINANCEE profile page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="profile-user">
        {/* <div className="profile-user-img">
          {sessionState && (
            <Image
              src={sessionState.user.image}
              alt={""}
              width={100}
              height={100}
            ></Image>
          )}
        </div> */}
        <h5 className="h5 black-90">{`${sessionState?.user.name}`}</h5>
      </div>
      {(myProfile.adminMSG?.status || myProfile.adminMassMSG?.status) && (
        <div className="profile-projects-header">
          <h5 className="h5 black-90">MESSAGES</h5>
        </div>
      )}
      {myProfile.adminMSG?.status && (
        <ProfileMSG message={myProfile.adminMSG} type="blueMSG" />
      )}
      {myProfile.adminMassMSG?.status && (
        <ProfileMSG message={myProfile.adminMassMSG} type="blackMSG" />
      )}
      <div className="profile-projects">
        <div className="profile-projects-header">
          <h5 className="h5 black-90">MY PROJECTS</h5>
          <Link
            href={"/profile/new"}
            className={`profile-text-btn linear-gold`}
          >
            <h6 className="h6 white">New Project</h6>
          </Link>
        </div>
        <div className="profile-projects-cards">
          {myProjects?.map((project) => {
            return (
              <ProfileProject key={project.insertedID} project={project} />
            );
          })}
        </div>
      </div>
      <div className="profile-projects-header">
        <h5 className="h5 black-90">MY PROFILE</h5>
      </div>

      <div className={"profile-project"}>
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"SOCIAL MEDIA"}</h6>
        </div>
        <div className="profile-forms-container">
          <ProfileSocial
            social={"facebook"}
            newFacebook={newFacebook}
            setNewFacebook={setNewFacebook}
            prflFacebook={myProfile.facebook}
            newInstagram={newInstagram}
            setNewInstagram={setNewInstagram}
            prflInstagram={myProfile.instagram}
            newTwitter={newTwitter}
            setNewTwitter={setNewTwitter}
            prflTwitter={myProfile.twitter}
            newYoutube={newYoutube}
            setNewYoutube={setNewYoutube}
            prflYoutube={myProfile.youtube}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
          <ProfileSocial
            social={"instagram"}
            newFacebook={newFacebook}
            setNewFacebook={setNewFacebook}
            prflFacebook={myProfile.facebook}
            newInstagram={newInstagram}
            setNewInstagram={setNewInstagram}
            prflInstagram={myProfile.instagram}
            newTwitter={newTwitter}
            setNewTwitter={setNewTwitter}
            prflTwitter={myProfile.twitter}
            newYoutube={newYoutube}
            setNewYoutube={setNewYoutube}
            prflYoutube={myProfile.youtube}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
          <ProfileSocial
            social={"twitter"}
            newFacebook={newFacebook}
            setNewFacebook={setNewFacebook}
            prflFacebook={myProfile.facebook}
            newInstagram={newInstagram}
            setNewInstagram={setNewInstagram}
            prflInstagram={myProfile.instagram}
            newTwitter={newTwitter}
            setNewTwitter={setNewTwitter}
            prflTwitter={myProfile.twitter}
            newYoutube={newYoutube}
            setNewYoutube={setNewYoutube}
            prflYoutube={myProfile.youtube}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
          <ProfileSocial
            social={"youtube"}
            newFacebook={newFacebook}
            setNewFacebook={setNewFacebook}
            prflFacebook={myProfile.facebook}
            newInstagram={newInstagram}
            setNewInstagram={setNewInstagram}
            prflInstagram={myProfile.instagram}
            newTwitter={newTwitter}
            setNewTwitter={setNewTwitter}
            prflTwitter={myProfile.twitter}
            newYoutube={newYoutube}
            setNewYoutube={setNewYoutube}
            prflYoutube={myProfile.youtube}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
        </div>
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"CONTACT INFO"}</h6>
        </div>
        <div className="profile-forms-container">
          <ProfileElement
            element={"phone"}
            profileElement={myProfile.phone}
            session={session}
          />
          <ProfileElement
            element={"email"}
            profileElement={myProfile.businessEmail}
            session={session}
          />
        </div>
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"PAYMENT INFO"}</h6>
        </div>
        <div className="profile-forms-container">
          <ProfileElement
            element={"ccp"}
            profileElement={myProfile.ccp}
            session={session}
          />
          <ProfileElement
            element={"key"}
            profileElement={myProfile.key}
            session={session}
          />
          <ProfileElement
            element={"paypal"}
            profileElement={myProfile.paypal}
            session={session}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
