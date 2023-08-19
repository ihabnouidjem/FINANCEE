import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { HiOutlineXMark } from "react-icons/hi2";
import { useRouter } from "next/router";
import Link from "next/link";

function ProjectsFilter() {
  const router = useRouter();
  const language = useSelector((state) => state.language?.language);
  const categories = useSelector((state) => state.categories.categories);
  const [filter, setFilter] = useState({ search: "" });
  const searchRef = useRef(null);
  return (
    <div className={"w-full flex flex-col items-center gap-3"}>
      <div className="w-full flex flex-row items-center gap-3 sm:gap-6">
        <h4 className="h4 text-gray-950">
          {language === "english"
            ? "filter"
            : language === "francais" && "filtre"}
        </h4>
        <div className="w-full border border-gray-400   overflow-hidden flex flex-row items-center  rounded-lg gap-2 px-3 h-10 xl:gap-4 xl:px-4 xl:h-12 xl:rounded-xl">
          <input
            className="p w-full h-full border-none outline-none "
            ref={searchRef}
            onChange={(e) => {
              setFilter({ ...filter, search: e.target.value });
            }}
            type="text"
            placeholder={
              language === "english"
                ? "Search projects"
                : language === "francais" && "Rechercher des projets"
            }
          />
          {filter.search && filter.search.length > 0 && (
            <>
              <i
                className="h-[28] w-[28] text-[26px] flex items-center justify-center text-gray-700 hover:text-gray-950 active:scale-75 transition duration-50"
                onClick={() => {
                  setFilter({ ...filter, search: "" });
                  searchRef.current.value = "";
                }}
              >
                <HiOutlineXMark />
              </i>
              <div className="w-[1px] bg-gray-400 h-[24px] xl:h-[28px]"></div>
            </>
          )}
          <Link href={`/projects/search/${filter.search}`}>
            <i className="h-[28] w-[28] text-[26px] flex items-center justify-center text-gray-700 hover:text-gray-950 active:scale-75 transition duration-50">
              <BsSearch />
            </i>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-2 sm:gap-3">
        {categories?.map(({ _id, category }) => {
          return (
            <Link
              key={_id}
              className="bg-gray-100 px-4  py-1 rounded-full hover:bg-gray-300"
              href={`/projects/category/${category[0]}`}
            >
              <p className="p text-gray-900">
                {language === "english"
                  ? category[0]
                  : language === "francais" && category[1]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsFilter;
