import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { BsArrowRightShort } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { scrollPage } from "@/features/pageSlice";
import { homeContext } from "@/pages";
import { MdArrowForward } from "react-icons/md";

function Banner() {
  const scrollY = useSelector((state) => state.page?.scrollY);
  const { banner } = useContext(homeContext);
  const [bannerState, setBannerState] = useState({
    status: "loading",
    banner: [],
    currBanner: {},
  });

  const truncate = (str, limite) => {
    return str.length > limite ? `${str.substr(0, limite - 1)}...` : `${str}`;
  };

  useEffect(() => {
    if (banner) {
      setBannerState({
        ...bannerState,
        status: "filled",
        banner: banner,
        currBanner: banner[Math.floor(Math.random() * banner.length)],
      });
    } else {
      setBannerState({ status: "empty" });
    }
  }, [banner]);
  return (
    <div className="w-full">
      <div
        style={{
          height: scrollY > 500 ? `0px` : `${500 - scrollY}px`,
        }}
        className={`w-full flex items-center justify-center fixed z-0 left-0 top-[56px] sm:top-16 bg-zinc-600`}
      >
        {bannerState.status === "filled" && (
          <Image
            className="w-full min-w-[1000px] h-full object-cover flex items-center justify-center"
            src={
              bannerState.status === "filled"
                ? `${bannerState.currBanner?.image}`
                : "/exeptions/banner.jpg"
            }
            alt="banner"
            height={600}
            width={2000}
          />
        )}
      </div>
      <div className="w-full h-[500px] relative z-[10] px-4 sm:px-8 xl:px-16">
        <div className="h-full w-[min(100%,1000px)] flex flex-col justify-end pb-8 xl:pb-16 gap-4">
          {bannerState.status === "filled" && (
            <>
              <h2 className="h2 text-white w-full">
                {bannerState.currBanner?.type === "advertisement" &&
                bannerState.currBanner?.title
                  ? bannerState.currBanner?.title
                  : bannerState.currBanner?.type === "project" &&
                    bannerState.currBanner?.name &&
                    bannerState.currBanner?.name}
              </h2>
              <p className="p text-white w-full">
                {truncate(
                  `${
                    bannerState.currBanner?.type === "advertisement" &&
                    bannerState.currBanner?.details
                      ? bannerState.currBanner?.details
                      : bannerState.currBanner?.type === "project" &&
                        bannerState.currBanner?.description &&
                        bannerState.currBanner?.description
                  }`,
                  200
                )}
              </p>
              {bannerState.currBanner?.type === "advertisement" ? (
                <Link
                  href={bannerState.currBanner?.url}
                  className="w-fit flex flex-row items-center px-4 py-2 rounded-xl bg-white text-gray-950"
                >
                  <p className="p ">
                    {bannerState.currBanner?.button &&
                      bannerState.currBanner?.button}
                  </p>
                  <i className="icon-32">
                    <FiArrowUpRight />{" "}
                  </i>
                </Link>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <button className="w-fit flex flex-row items-center px-4 py-2 gap-2 rounded-xl bg-white text-gray-950">
                    <p className="p">Share</p>
                    <i className="h-8 w-8 text-[26px] flex items-center justify-center">
                      <FaShare />
                    </i>
                  </button>
                  <Link
                    href={`/projects/`}
                    className="w-fit flex flex-row items-center px-4 py-2 gap-2 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-950"
                  >
                    <p className="p">Donate</p>
                    <i className="icon-32">
                      <MdArrowForward />
                    </i>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
