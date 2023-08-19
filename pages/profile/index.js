import { setCategories } from "@/features/categoriesSlice";
import { setProfile } from "@/features/profileSlice";
import { removeSession, setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileEntrepreneur from "@/components/ProfileEntrepreneur";
import ProfileNewUser from "@/components/ProfileNewUser";
import Link from "next/link";
import ProfileInvestor from "@/components/ProfileInvestor";

function Profile({ profile, transactions, categories }) {
  const user = useSelector((state) => state.session?.session);
  const profileStatus = useSelector((state) => state.profile?.status);
  const profileUser = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  useEffect(() => {
    if (profile) {
      dispatch(
        setProfile({
          profile: profile,
          projects: profile.projects,
          transactions: transactions,
          status: profile.status,
        })
      );
    }
  }, [profile]);
  useEffect(() => {
    if (session) {
      dispatch(setSession(session.user));
    } else {
      dispatch(removeSession());
    }
  }, [session]);
  return (
    <div className="min-h-screen w-full">
      {/* {profileStatus === "entrepreneur" && <ProfileEntrepreneur />} */}
      {profileUser && profileStatus === "entrepreneur" ? (
        <ProfileEntrepreneur />
      ) : profileUser && profileStatus === "investor" ? (
        <ProfileInvestor />
      ) : profileUser && profileStatus === "admin" ? (
        <div className="w-full py-6 flex items-center justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-zinc-950"
          >
            <h6 className="h6">DASHBOARD</h6>
          </Link>
        </div>
      ) : (
        <ProfileNewUser />
      )}
    </div>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const form = {
      name: session.user?.name,
      email: session.user?.email,
      id: session.user?.id,
      image: session.user?.image,
    };

    const profile = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/profile/${session.user?.id}`
    ).then((data) => data.json());

    const transactions = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/transactions/byUser/${session.user?.id}`
    ).then((data) => data.json());

    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const data = await Promise.all([profile, transactions, categories]);

    return {
      props: {
        profile: data[0],
        transactions: data[1],
        categories: data[2],
      },
    };
  } else {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }
}
