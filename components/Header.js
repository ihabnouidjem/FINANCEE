import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineBars3 } from "react-icons/hi2";
import { BsHouse, BsQuestionCircle } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import Image from "next/image";
import ProjectsFilter from "./ProjectsFilter";
import { FR, GB } from "country-flag-icons/react/3x2";
import { pushPop, removePop } from "@/features/popupSlice";
import ProfileNav from "./ProfileNav";
import { changeLng } from "@/features/languageSlice";

function Header() {
  const language = useSelector((state) => state.language?.language);
  const session = useSelector((state) => state.session.session);
  const popup = useSelector((state) => state.popup);

  const dispatch = useDispatch();
  return (
    <div className="bg-white sticky top-0 left-0 z-50 flex flex-row items-center justify-between w-full border-b border-gray-400 px-4 h-[56px] sm:px-8 sm:h-[64px] xl:px-16 xl:h-16 ">
      {/* icon-32 */}
      <div className="flex lg:hidden">
        <i className="icon-32 text-gray-600 hover:text-gray-950">
          <HiOutlineBars3 />
        </i>
      </div>

      <Link href="/">
        <h4 className="h4 text-gray-950 linear-yellow">FINANCEE</h4>
      </Link>
      <div className="flex flex-row items-center h-full">
        <nav className="h-full hidden lg:flex flex-row items-center gap-8 px-4">
          <Link
            href="/"
            className={
              "h-full flex flex-row items-center gap-2 text-gray-700 hover:text-gray-950"
            }
          >
            <i className="icon-32">
              <BsHouse />
            </i>
            <h6 className="h6">
              {language === "english"
                ? "HOME"
                : language === "francais" && "ACCUEIL"}
            </h6>
          </Link>
          <div className="h-full group">
            <Link
              href="/projects"
              className={
                "outline-0 h-full flex flex-row items-center gap-2 text-gray-700 hover:text-gray-950"
              }
            >
              <i className="icon-32">
                <FaProjectDiagram />
              </i>
              <h6 className="h6">
                {language === "english"
                  ? "PROJECTS"
                  : language === "francais" && "PROJETS"}
              </h6>
            </Link>
            <div className="hidden md:hover:block md:group-hover:block border-t border-gray-400 bg-white shadow-md fixed p-4 pt-6 rounded-b-2xl z-[51]  w-[calc(100%-32px)] md:top-[63px] md:left-4 xl:w-[calc(100%-96px)] xl:left-12">
              <ProjectsFilter />
            </div>
          </div>

          <Link
            href="/about"
            className={
              "h-full flex flex-row items-center gap-2 text-gray-700 hover:text-gray-950"
            }
          >
            <i className="icon-32">
              <BsQuestionCircle />
            </i>
            <h6 className="h6">
              {language === "english"
                ? "ABOUT"
                : language === "francais" && "A PROPOS"}
            </h6>
          </Link>
        </nav>
        <div className="hidden lg:block bg-gray-400 w-[1px] h-[24px] xl:h-[32px]"></div>
        <div className="h-full flex flex-row items-center gap-4 lg:pl-4">
          <i
            onClick={() => {
              // if (!popup.language) {
              //   dispatch(pushPop({ type: "language" }));
              // } else {
              //   dispatch(
              //     removePop({
              //       type: "language",
              //       data: popup.popups?.filter((item) => {
              //         return item !== { type: "language" };
              //       }),
              //     })
              //   );
              // }
              if (language === "english") {
                dispatch(changeLng("francais"));
              } else if (language === "francais") {
                dispatch(changeLng("english"));
              }
            }}
            className="hidden lg:flex h-8 w-8 text-[30px] items-center justify-center text-gray-700 hover:text-gray-950"
          >
            {/* <MdLanguage />{" "} */}
            {language === "francais" ? (
              <div className="flex h-6 w-6 text-[30px] items-center justify-center">
                <GB />
              </div>
            ) : (
              language === "english" && (
                <div className="flex h-6 w-6 text-[30px] items-center justify-center">
                  <FR />
                </div>
              )
            )}
          </i>
          <div className="h-full flex items-center justify-center group">
            <div className="h-8 w-8 rounded-full flex items-center justify-center">
              {!(session && session.image) ? (
                <i
                  className="icon-32 text-gray-700 hover:text-gray-950"
                  title="SignIn"
                  onClick={() => signIn()}
                >
                  <IoMdLogIn />{" "}
                </i>
              ) : (
                <Link href="/profile">
                  <Image
                    className="w-full h-full rounded-full object-cover"
                    src={session.image}
                    alt="user"
                    height={100}
                    width={100}
                  ></Image>
                </Link>
              )}
            </div>
            <div className="hidden md:hover:block md:group-hover:block border-t border-gray-400 bg-white shadow-md fixed p-4 pt-6 rounded-b-2xl z-[51]  w-[min(calc(100%-32px),600px)] md:top-[63px] md:right-4 xl:w-[min(calc(100%-96px),600px)] xl:right-12">
              <ProfileNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
