import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useSelector } from "react-redux";

function ProjectDonate() {
  const language = useSelector((state) => state.language?.language);
  const scrollY = useSelector((state) => state.page?.scrollY);
  return (
    <div
      className={`bg-white w-full flex flex-row items-center justify-end h-[40px] gap-4 px-4 sm:h-[48px] sm:gap-8 sm:px-8 xl:px-16 sticky top-[56px] sm:top-[64px] z-30 ${
        scrollY > 500 && "border-b border-gray-400"
      }`}
    >
      <Link
        href="#projectactivities"
        className="flex flex-row items-center gap-1 px-4 py-1 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-400 text-gray-950"
      >
        <p className="small-p-16">
          {language === "english"
            ? "Donate"
            : language === "francais" && "Donner"}
        </p>
        {/* <i className="icon-20">
          <FiChevronRight />{" "}
        </i> */}
      </Link>
    </div>
  );
}

export default ProjectDonate;
