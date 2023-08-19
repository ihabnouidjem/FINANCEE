import ProfilePersonal from "@/components/ProfilePersonal";
import ProfileProjects from "@/components/ProfileProjects";
import { setCategories } from "@/features/categoriesSlice";
import { setProfile } from "@/features/profileSlice";
import { removeSession, setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileTransactions from "./ProfileTransactions";
import Transaction from "./Transaction";

function ProfileInvestor() {
  const user = useSelector((state) => state.session?.session);
  const transactions = useSelector((state) => state.profile?.transactions);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-around h-[40px] sm:h-[48px] px-4 sm:px-8 xl:px-16 border-b border-gray-400 sticky top-[56px] sm:top-[64px] bg-white z-30">
        <h5 className="h5 text-gray-950">{user?.name}</h5>
      </div>
      {/* <ProfileProjects projects={myProjectsState} /> */}
      {/* <ProfilePersonal /> */}
      <ProfileTransactions transactions={transactions} />
    </>
  );
}

export default ProfileInvestor;
