import Link from "next/link";
import React, { useContext, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { BsHouse, BsPlus, BsX } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { HiOutlineBars2 } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { stateContext } from "@/pages/_app";
import Image from "next/image";
import ProfileNav from "./ProfileNav";

function Header() {
  const { data: session, token, status } = useSession();

  const { myProfile, myCategories, nav, setNav, navStatus } =
    useContext(stateContext);

  const [categories, setCategories] = useState([
    "science & technology",
    "art & creativity",
    "biotech & healthcare",
    "sports",
    "education",
  ]);
  const [profileNav, setProfileNav] = useState({ status: false });
  return (
    <div className="header-container">
      <div className="header">
        <button
          className="header-menu"
          onClick={
            () => {
              nav.status
                ? setNav({ ...nav, state: "navOut" })
                : setNav({ status: true, state: "navIn" });
            }
            //
          }
        >
          <i className="icon-32">{nav.status ? <BsX /> : <HiOutlineBars2 />}</i>
        </button>
        <Link href={"/"}>
          {" "}
          <h4 className="h4 linear-financee">FINANCEE</h4>
        </Link>

        <div className="flex-row">
          <ul className="header-nav">
            <Link href="/" className="header-nav-item black-80">
              <i className="btn-32">
                <BsHouse />
              </i>
              <h6 className="h6">Home</h6>
            </Link>
            <Link href="/projects" className="header-nav-item black-80">
              <i className="btn-32">
                <FaRegLightbulb />
              </i>
              <h6 className="h6">Projects</h6>
            </Link>
            {/* <Link href="/profile" className="header-nav-item black-80">
              <i className="btn-32">
                <GoPerson />
              </i>
              <h6 className="h6">Profile</h6>
            </Link> */}
          </ul>
          {status === "authenticated" ? (
            <div className="header-addproject-container">
              <div
                className="header-profile-image"
                onClick={() => {
                  setProfileNav({ ...profileNav, status: !profileNav.status });
                }}
              >
                {session && (
                  <Image
                    src={session.user.image}
                    alt={""}
                    width={100}
                    height={100}
                  ></Image>
                )}
                <div
                  className={`${profileNav.status && "show-header-profileNav"}`}
                >
                  <ProfileNav />
                </div>

                {/* <div className="header-addproject-container">
              <Link
                href="/api/auth/signout"
                onClick={(e) => {
                  signOut();
                }}
              >
                <button className="header-logout hover-text-btn">
                  <i className="icon-32">
                    <IoLogOutOutline />
                  </i>
                </button>
              </Link>
            </div> */}
              </div>
            </div>
          ) : (
            <div className="header-addproject-container ">
              <Link
                href="/api/auth/signin"
                onClick={(e) => {
                  signIn();
                }}
              >
                {/* <button className="header-add-project  hover-text-btn">
                  <p className="h6 black-90">Add project</p>
                </button> */}
                <button className="header-add-project-btn">
                  <i className="icon-32">
                    <BsPlus />
                  </i>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          navStatus.status
            ? "header-categories show-headerNav"
            : "header-categories hide-headerNav"
        }
      >
        {myCategories
          ? myCategories.map(({ _id, status, category }) => {
              return (
                <Link
                  key={_id}
                  href={`/projects/categories/${category}`}
                  className="black-70"
                >
                  {status && (
                    <p className="p  fit-width">{category && category}</p>
                  )}
                </Link>
              );
            })
          : categories.map((category) => {
              return (
                <Link
                  key={categories.indexOf(category)}
                  href={`/projects/categories/${category}`}
                  className="black-70"
                >
                  <p className="p  fit-width">{category && category}</p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default Header;
