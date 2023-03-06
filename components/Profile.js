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

function ProfileUser() {
  const { reload } = useContext(stateContext);
  const {
    sessionState,
    myProfile,
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
  } = useContext(profileContext);
  return (
    <div className="profile">
      <Head>
        <title>FINANCEE | {sessionState?.user.name}</title>
        <meta name="description" content="FINANCEE profile page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* {reload.status && (
        <div className={"reloading"}>
          <div className="reloading-icons">
            <i className="icon-40 reloading-icon-1 black-70">
              <AiOutlineLoading3Quarters />
            </i>
            <i className="icon-32 reloading-icon-2 black-70">
              <AiOutlineLoading />
            </i>
          </div>
        </div>
      )} */}

      <div className="profile-user">
        <div className="profile-user-img">
          {sessionState && (
            <Image
              src={sessionState.user.image}
              alt={""}
              width={100}
              height={100}
            ></Image>
          )}
        </div>
        <h5 className="h5 black-90">{`${sessionState?.user.name}`}</h5>
        {/* <button
          className="profile-delete"
          onClick={() =>
            deleteProject(session?.user.id, { id: `${session?.user.id}` })
          }
        >
          <h6 className="h6 red-pink">delete</h6>
        </button> */}
      </div>
      <div className={"profile-project"}>
        {myProfile.adminMSG?.status && (
          <ProfileMSG message={myProfile.adminMSG} type="blueMSG" />
        )}
        {myProfile.adminMassMSG?.status && (
          <ProfileMSG message={myProfile.adminMassMSG} type="blackMSG" />
        )}
        {myProfile.statusMSG?.status && (
          <ProfileMSG
            message={myProfile.statusMSG}
            type={
              myProfile.status === "blocked" || myProfile.status === "declined"
                ? "redMSG"
                : "greenMSG"
            }
          />
        )}

        <ProfileHeader
          newHeader={newHeader}
          setNewHeader={setNewHeader}
          prflHeader={myProfile.header}
          modifyItem={modifyItem}
          setModifyItem={setModifyItem}
          session={session}
          addPrflItem={addPrflItem}
          updateProfile={updateProfile}
        />
        <div className="profile-progress-bar">
          <div className="profile-progress-items">
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <BsFillSuitHeartFill />
              </i>
              <h6 className="h6 black-80">{`${
                myProfile.likes ? myProfile.likes : 0
              } likes`}</h6>
            </div>
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <GiMoneyStack />
              </i>
              <h6 className="h6 black-80">{`${
                myProfile.raised ? myProfile.raised : 0
              } DA raised`}</h6>
            </div>
          </div>
          <div className="profile-progress-items">
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <FaDonate />
              </i>
              <h6 className="h6 black-80">{`${
                myProfile.donators ? myProfile.donators : 0
              } donators`}</h6>
            </div>
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <BsEye />
              </i>
              <h6 className="h6 black-80">{`${
                myProfile.views ? myProfile.views : 0
              } views`}</h6>
            </div>
          </div>
        </div>
        <ProfileDescription
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          prflDescription={myProfile?.description}
          modifyItem={modifyItem}
          setModifyItem={setModifyItem}
          session={session}
          addPrflItem={addPrflItem}
          updateProfile={updateProfile}
        />
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"IMAGE"}</h6>
        </div>
        <ProfileImage />
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"AMOUNT NEEDED"}</h6>
        </div>
        <ProfileElement
          item={"amount"}
          newItem={newFunds}
          setNewItem={setNewFunds}
          prflItem={myProfile.funds}
          modifyItem={modifyItem}
          setModifyItem={setModifyItem}
          session={session}
          addPrflItem={addPrflItem}
          updateProfile={updateProfile}
        />
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"CATEGORY"}</h6>
        </div>
        <ProfileCategory myProfile={myProfile} />
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
            item={"phone"}
            newItem={newPhone}
            setNewItem={setNewPhone}
            prflItem={myProfile.phone}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
          <ProfileElement
            item={"email"}
            newItem={newEmail}
            setNewItem={setNewEmail}
            prflItem={myProfile.bussinessEmail}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
        </div>
        <div className="profile-text-container">
          <h6 className="h6 black-70 text-center">{"PAYMENT INFO"}</h6>
        </div>
        <div className="profile-forms-container">
          <ProfileElement
            item={"ccp"}
            newItem={newCcp}
            setNewItem={setNewCcp}
            prflItem={myProfile.ccp}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
          <ProfileElement
            item={"key"}
            newItem={newKey}
            setNewItem={setNewKey}
            prflItem={myProfile.key}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
          <ProfileElement
            item={"paypal"}
            newItem={newPaypal}
            setNewItem={setNewPaypal}
            prflItem={myProfile.paypal}
            modifyItem={modifyItem}
            setModifyItem={setModifyItem}
            session={session}
            addPrflItem={addPrflItem}
            updateProfile={updateProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
