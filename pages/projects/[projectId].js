import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import {
  BsEye,
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsInstagram,
  BsFillSuitHeartFill,
} from "react-icons/bs";
import { FaShare, FaDonate } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { MdContentCopy } from "react-icons/md";
import { FcDonate } from "react-icons/fc";
import { stateContext } from "../_app";
import Head from "next/head";

function ProjectId({ oneProject, pid, approved }) {
  const [currScroll, setCurrScroll] = useState(0);
  const [currScrollDist, setCurrScrollDist] = useState(0);

  const { navStatus, setNavStatus, increaseField } = useContext(stateContext);

  const {
    id,
    header,
    description,
    projectImg,
    facebook,
    instagram,
    twitter,
    youtube,
    bussinessEmail,
    phone,
    ccp,
    key,
    paypal,
    raised,
    donators,
    funds,
    likes,
    views,
  } = oneProject;

  // increase views

  useEffect(() => {
    const increaseViews = async () => {
      let currViews = await views;
      currViews++;
      increaseField(
        pid,
        { views: currViews }
        // {
        //   user: header,
        //   id: id,
        //   subject: "INCREASED",
        //   msg: `${header ? header : "user"}'s views increased to ${currViews}`,
        //   item: "views",
        // }
      );
    };
    increaseViews();
  }, []);
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

  return (
    <div className="projectPage">
      <Head>
        <title>FINANCEE | {header}</title>
        <meta name="description" content="FINANCEE project page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="projectPage-header">
        <div className="profile-progress-bar">
          <div className="profile-progress-items">
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <BsFillSuitHeartFill />
              </i>
              <h6 className="h6 black-80">{`${likes ? likes : 0} likes`}</h6>
            </div>
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <GiMoneyStack />
              </i>
              <h6 className="h6 black-80">{`${
                raised ? raised : 0
              } DA raised`}</h6>
            </div>
          </div>
          <div className="profile-progress-items">
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <FaDonate />
              </i>
              <h6 className="h6 black-80">{`${
                donators ? donators : 0
              } donators`}</h6>
            </div>
            <div className="profile-progress-item">
              <i className="icon-40 black-80">
                <BsEye />
              </i>
              <h6 className="h6 black-80">{`${views ? views : 0} views`}</h6>
            </div>
          </div>
        </div>
        <div className="projectPage-header-head">
          <h4 className="h4 black-90">{header}</h4>
        </div>
        <div className="projectPage-p-container">
          <p className="p black-50 text-center">
            {description}
            {/* To get around on a daily basis, to earn money or to order your
            meals, YASSIR is the application that meets your needs. */}
          </p>
        </div>
        <div className="projectPage-header-info">
          <div className="projectPage-header-img">
            <Image
              src={
                projectImg && projectImg !== ""
                  ? projectImg
                  : "/exeption/profileImage.png"
              }
              alt=""
              height={400}
              width={400}
            />
          </div>
          <div className="projectPage-project-footer">
            <div
              className="projectPage-project-footer-icon"
              onClick={() => {
                increaseField(
                  pid,
                  { likes: likes + 1 }
                  // {
                  //   user: header,
                  //   id: id,
                  //   subject: "INCREASED",
                  //   msg: `${header ? header : "user"}'s likes increased to ${
                  //     likes + 1
                  //   }`,
                  //   item: "views",
                  // }
                );
              }}
            >
              <button className="">
                <i className="icon-32 red-heart">
                  <BsFillSuitHeartFill />
                </i>
              </button>{" "}
              <p className="small-p black text-center fit-width">like</p>
            </div>
            <div className="projectPage-project-footer-icon">
              <button className="">
                <i className="icon-32 black">
                  <FaShare />
                </i>
              </button>{" "}
              <p className="small-p black text-center fit-width">share</p>
            </div>
            <div className="projectPage-project-footer-icon">
              <button className="">
                <i className="icon-32 black">
                  <FcDonate />
                </i>
              </button>{" "}
              <p className="small-p black text-center fit-width">donate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="projectPage-project">
        {(facebook || instagram || twitter || youtube) && (
          <div className="projectPage-p-container">
            <h6 className="h6 black-70 text-center">SOCIAL MEDIA</h6>
          </div>
        )}

        <div className="projectPage-social-icons">
          {facebook && (
            <button className="">
              <i className="icon-32 black-90">
                <BsFacebook />
              </i>
            </button>
          )}
          {twitter && (
            <button className="">
              <i className="icon-32 black-90">
                <BsTwitter />
              </i>
            </button>
          )}
          {youtube && (
            <button className="">
              <i className="icon-32 black-90">
                <BsYoutube />
              </i>
            </button>
          )}
          {instagram && (
            <button className="">
              <i className="icon-32 black-90">
                <BsInstagram />
              </i>
            </button>
          )}
        </div>
        {(bussinessEmail || phone) && (
          <div className="projectPage-p-container">
            <h6 className="h6 black-70 text-center">CONTACT INFO</h6>
          </div>
        )}
        <div className="projectPage-contact">
          {phone && (
            <div className="projectPage-contact-info-container">
              <p className="p black-70 text-center">{phone}</p>
              <button className="">
                <i className="icon-32 black-90">
                  <MdContentCopy />
                </i>
              </button>
            </div>
          )}
          {bussinessEmail && (
            <div className="projectPage-contact-info-container">
              <p className="p black-70 text-center">{bussinessEmail}</p>
              <button className="">
                <i className="icon-32 black-90">
                  <MdContentCopy />
                </i>
              </button>
            </div>
          )}
        </div>
        {((ccp && key) || paypal) && (
          <div className="projectPage-p-container">
            <h6 className="h6 black-70 text-center">PAYMENT INFO</h6>
          </div>
        )}

        <div className="projectPage-payment-info-container">
          {ccp && key && (
            <div className="projectPage-details-container">
              <h6 className="h6 black-70 fit-width">ccp:</h6>
              <p className="p black-50 fit-width">{ccp}</p>
            </div>
          )}
          {ccp && key && (
            <div className="projectPage-details-container">
              <h6 className="h6 black-70 fit-width">key:</h6>
              <p className="p black-50 fit-width">{key}</p>
            </div>
          )}
          {paypal && (
            <div className="projectPage-details-container">
              <h6 className="h6 black-70 fit-width">paypal:</h6>
              <p className="p black-50 fit-width">{paypal}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectId;

export async function getServerSideProps(req, res) {
  const { projectId } = req.query;
  const oneProject = await fetch(
    `https://financee.onrender.com/api/projects/${projectId}`
  ).then((data) => {
    return data.json();
  });
  // if (oneProject.status === "approved" || oneProject.status === "recommended") {
  return {
    props: {
      approved: true,
      oneProject,
      pid: projectId,
    },
  };
  // }
}
