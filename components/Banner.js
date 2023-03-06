import { homeContext } from "@/pages";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useContext } from "react";
import { FaShare } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

function Banner() {
  const { recommended, currentBanner, setCurrentBanner } =
    useContext(homeContext);
  // const { id, header, description } = currentBanner;
  // console.log(recommended);
  useEffect(() => {
    setCurrentBanner(
      recommended[Math.floor(Math.random() * recommended.length)]
    );
  }, [recommended]);
  useEffect(() => {
    if (recommended.length > 1 && currentBanner !== {}) {
      const interval = setInterval(() => {
        let randomBannerList = recommended.filter((project) => {
          return project._id !== currentBanner._id;
        });
        setCurrentBanner(
          randomBannerList[Math.floor(Math.random() * randomBannerList.length)]
        );
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentBanner, recommended]);

  return (
    <div className="banner">
      <div className="banner-img-container">
        <Image
          src={
            currentBanner?.projectImg
              ? currentBanner?.projectImg
              : "/exeption/profileImage.png"
          }
          alt=""
          width={2000}
          height={1500}
        />
      </div>
      <div className="banner-info">
        <div className="banner-info-item">
          <h1 className="h1 white">
            {currentBanner?.header && currentBanner?.header}
          </h1>
        </div>
        <div className="banner-info-item">
          <h5 className="h5 white">
            {currentBanner?.description
              ? currentBanner?.description
              : ` To get around on a daily basis, to earn money or to order your
            meals, YASSIR is the application that meets your needs.`}
          </h5>
        </div>
        <div className="banner-buttons">
          <button className="banner-share">
            <h6 className="h6 white">share</h6>
            <i className="icon-32 white">
              <FaShare />
            </i>
          </button>
          <Link
            href={`/projects/${currentBanner?.id}`}
            className="banner-donate"
          >
            <h6 className="h6 white">donate now</h6>
            <i className="icon-32 white">
              <HiArrowLongRight />
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
