import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi2";

function ProfileInputPMNT({ input }) {
  const [item, setItem] = useState({ newItem: {} });

  const changeItem = (e) => {
    if (input?.type === "facebook") {
      setItem({ ...item, newItem: { facebook: e.target.value } });
    }
  };

  return (
    <div className="w-[min(100%,1000px)] flex flex-col gap-2">
      {true ? (
        <div className="w-full flex flex-row gap-2 sm:gap-3">
          <div className="w-[96px] sm:w-[calc(20%-4px)] overflow-hidden h-[40px] sm:h-[48px] border border-gray-500 rounded-xl px-2">
            <input
              className="h-full w-full bg-transparent outline-none p"
              type="number"
              placeholder={input?.placeholder[0]}
              onChange={(e) => changeItem(e)}
            />
          </div>
          <div className="w-[calc(100%-104px)] sm:w-[calc(80%-4px)] overflow-hidden  h-[40px] sm:h-[48px] border border-gray-500 rounded-xl px-2">
            <input
              className="h-full w-full bg-transparent outline-none p"
              type="number"
              placeholder={input?.placeholder[1]}
              onChange={(e) => changeItem(e)}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-row gap-2 sm:gap-3">
          <div className="flex items-center border-t-transparent w-[96px] sm:w-[calc(20%-4px)] overflow-hidden h-[40px] sm:h-[48px] border-b border-gray-500 px-2">
            <p className="p text-gray-700">{`${input.type[0]} - ${"521"}`}</p>
          </div>
          <div className="flex items-center border-t-transparent w-[calc(100%-104px)] sm:w-[calc(80%-4px)] overflow-hidden  h-[40px] sm:h-[48px] border-b border-gray-500 px-2">
            <p className="p text-gray-700">{`${
              input.type[1]
            } - ${"145236987"}`}</p>
          </div>
        </div>
      )}

      <div className="w-full flex flex-row items-center justify-end gap-2">
        {false ? (
          <button className="w-[50px] flex flex-col items-center text-gray-900">
            <i className="icon-24">
              <HiOutlinePlus />{" "}
            </i>
            <p className="small-p">add</p>
          </button>
        ) : true ? (
          <>
            <button className="w-[50px] flex flex-col items-center text-gray-900">
              <i className="icon-24">
                <FiEdit3 />{" "}
              </i>
              <p className="small-p">modify</p>
            </button>{" "}
            <button className="w-[50px] flex flex-col items-center text-gray-900">
              <i className="icon-24">
                <AiOutlineDelete />{" "}
              </i>
              <p className="small-p">remove</p>
            </button>
          </>
        ) : (
          false && (
            <button className="w-[50px] flex flex-col items-center text-gray-900">
              <i className="icon-24">
                <IoMdCheckmark />{" "}
              </i>
              <p className="small-p">apply</p>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default ProfileInputPMNT;
