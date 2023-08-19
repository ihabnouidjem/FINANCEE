import Dashboard from "@/components/Dashboard";
import DashboardCampaigns from "@/components/DashboardCampaigns";
import DashboardNav from "@/components/DashboardNav";
import DashboardNotifications from "@/components/DashboardNotifications";
import DashboardProjects from "@/components/DashboardProjects";
import DashboardSettings from "@/components/DashboardSettings";
import DashboardUsers from "@/components/DashboardUsers";
import axios from "axios";
import { getSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

export const dashboardContext = createContext();

function DashboardPage({
  admins,
  profile,
  projects,
  users,
  notifications,
  categories,
  campaigns,
}) {
  const [dashboardState, setDashboardState] = useState({
    page: "dashboard",
    nav: false,
    admins: admins,
    profile: profile,
    projects: projects,
    users: users,
    notifications: notifications,
    categories: categories,
    campaigns: campaigns,
  });

  const postItem = async (path, item, notification) => {
    await axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }${path}`,
        item
      )
      .then(async (res) => {
        if (path.includes("/projects")) {
          const newProjects = await dashboardState.projects?.map((project) => {
            if (project._id === res.data?._id) {
              return res.data;
            }
            return project;
          });
          if (notification) {
            axios
              .post(
                `${
                  process.env.NODE_ENV === "production"
                    ? "https://financee-nu.vercel.app"
                    : "http://localhost:3000"
                }/api/admin/notifications`,
                notification
              )
              .then((res) => {
                setDashboardState({
                  ...dashboardState,
                  projects: newProjects,
                  pending: newProjects.filter(
                    (project) => project.status === "pending"
                  ),
                  declined: newProjects.filter(
                    (project) => project.status === "declined"
                  ),
                  approved: newProjects.filter(
                    (project) => project.status === "approved"
                  ),
                  promoted: newProjects.filter(
                    (project) => project.status === "promoted"
                  ),
                  blocked: newProjects.filter(
                    (project) => project.status === "blocked"
                  ),
                  notifications: [...dashboardState.notifications, ...res.data],
                });
              });
          } else {
            setDashboardState({
              ...dashboardState,
              projects: newProjects,
              pending: newProjects.filter(
                (project) => project.status === "pending"
              ),
              declined: newProjects.filter(
                (project) => project.status === "declined"
              ),
              approved: newProjects.filter(
                (project) => project.status === "approved"
              ),
              promoted: newProjects.filter(
                (project) => project.status === "promoted"
              ),
              blocked: newProjects.filter(
                (project) => project.status === "blocked"
              ),
            });
          }
        } else if (path.includes("/users")) {
          const newUsers = await dashboardState.users?.map((user) => {
            if (user._id === res.data?._id) {
              return res.data;
            }
            return user;
          });
          if (notification) {
            axios
              .post(
                `${
                  process.env.NODE_ENV === "production"
                    ? "https://financee-nu.vercel.app"
                    : "http://localhost:3000"
                }/api/admin/notifications`,
                notification
              )
              .then((res) => {
                setDashboardState({
                  ...dashboardState,
                  users: newUsers,
                  admins: newUsers.filter((user) => user.status === "admin"),
                  entrepreneurs: newUsers.filter(
                    (user) => user.status === "entrepreneur"
                  ),
                  notifications: [...dashboardState.notifications, ...res.data],
                });
              });
          } else {
            setDashboardState({
              ...dashboardState,
              users: newUsers,
              admins: newUsers.filter((user) => user.status === "admin"),
              entrepreneurs: newUsers.filter(
                (user) => user.status === "entrepreneur"
              ),
            });
          }
        } else if (path.includes("/campaigns")) {
          const newCampaigns = res.data;
          console.log("dashboard postitem", newCampaigns);
          if (notification) {
            axios
              .post(
                `${
                  process.env.NODE_ENV === "production"
                    ? "https://financee-nu.vercel.app"
                    : "http://localhost:3000"
                }/api/admin/notifications`,
                notification
              )
              .then((res) => {
                setDashboardState({
                  ...dashboardState,
                  campaigns: newCampaigns,
                  notifications: [...dashboardState.notifications, ...res.data],
                });
              });
          } else {
            setDashboardState({
              ...dashboardState,
              campaigns: newCampaigns,
            });
          }
        }
      });
  };

  const deleteNotification = (notifyId) => {
    axios
      .delete(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/notifications/${notifyId}`
      )
      .then((res) => {
        if (res.data) {
          setDashboardState({ ...dashboardState, notifications: res.data });
        }
      });
  };

  const deleteNotifications = () => {
    axios
      .delete(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/notifications`
      )
      .then((res) => {
        if (res.data) {
          setDashboardState({ ...dashboardState, notifications: res.data });
        }
      });
  };

  const postCategory = (category, notification) => {
    axios
      .post(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/categories`,
        category
      )
      .then((res) => {
        if (res.data) {
          const newCategory = res.data;
          if (notification) {
            axios
              .post(
                `${
                  process.env.NODE_ENV === "production"
                    ? "https://financee-nu.vercel.app"
                    : "http://localhost:3000"
                }/api/admin/notifications`,
                notification
              )
              .then((res) => {
                setDashboardState({
                  ...dashboardState,
                  categories: [...dashboardState.categories, ...newCategory],
                  notifications: [...dashboardState.notifications, ...res.data],
                });
              });
          } else {
            setDashboardState({
              ...dashboardState,
              categories: [...dashboardState.categories, ...newCategory],
            });
          }
        }
      });
  };

  const deleteCategory = (catId, notification) => {
    axios
      .delete(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/categories/${catId}`
      )
      .then((res) => {
        if (res.data) {
          const newCategories = res.data;
          if (notification) {
            axios
              .post(
                `${
                  process.env.NODE_ENV === "production"
                    ? "https://financee-nu.vercel.app"
                    : "http://localhost:3000"
                }/api/admin/notifications`,
                notification
              )
              .then((res) => {
                setDashboardState({
                  ...dashboardState,
                  categories: newCategories,
                  notifications: [...dashboardState.notifications, ...res.data],
                });
              });
          } else {
            setDashboardState({
              ...dashboardState,
              categories: newCategories,
            });
          }
        }
      });
  };

  const deleteCampaign = (campId, notification) => {
    axios
      .delete(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/campaigns/${campId}`
      )
      .then((res) => {
        if (res.data) {
          const newCampaigns = res.data;
          if (notification) {
            axios
              .post(
                `${
                  process.env.NODE_ENV === "production"
                    ? "https://financee-nu.vercel.app"
                    : "http://localhost:3000"
                }/api/admin/notifications`,
                notification
              )
              .then((res) => {
                setDashboardState({
                  ...dashboardState,
                  campaigns: newCampaigns,
                  notifications: [...dashboardState.notifications, ...res.data],
                });
              });
          } else {
            setDashboardState({
              ...dashboardState,
              campaigns: newCampaigns,
            });
          }
        }
      });
  };

  useEffect(() => {
    setDashboardState({
      ...dashboardState,
      admins: admins,
      profile: profile,
      projects: projects,
      pending: projects.filter((project) => project.status === "pending"),
      declined: projects.filter((project) => project.status === "declined"),
      approved: projects.filter((project) => project.status === "approved"),
      promoted: projects.filter((project) => project.status === "promoted"),
      blocked: projects.filter((project) => project.status === "blocked"),
      users: users,
      admins: users.filter((user) => user.status === "admin"),
      entrepreneurs: users.filter((user) => user.status === "entrepreneur"),
      notifications: notifications,
      categories: categories,
      campaigns: campaigns,
    });
  }, [admins, profile, projects, users, notifications, categories, campaigns]);

  return (
    <dashboardContext.Provider
      value={{
        dashboardState: dashboardState,
        setDashboardState: setDashboardState,
        postItem: postItem,
        deleteNotification: deleteNotification,
        deleteNotifications: deleteNotifications,
        deleteCategory: deleteCategory,
        postCategory: postCategory,
        deleteCampaign: deleteCampaign,
      }}
    >
      <div className="w-full h-screen bg-zinc-50 overflow-hidden u-scrollbar-hidden">
        <div
          className={`lg:w-full h-full flex flex-row fixed top-0 ${
            dashboardState.nav
              ? "left-0"
              : "left-[-280px] sm:left-[-300px] lg:left-0"
          }`}
        >
          <DashboardNav />
          <div
            className={`flex flex-row w-screen lg:w-full h-full pr-3 sm:pr-8 xl:pr-16 bg-zinc-900 ${
              dashboardState.nav ? "rounded-l-[24px]" : "rounded-l-none"
            } `}
          >
            <button
              className="h-full w-[32px] flex items-center justify-center "
              onClick={() => {
                setDashboardState({
                  ...dashboardState,
                  nav: !dashboardState.nav,
                });
              }}
            >
              <i className="icon-24 text-zinc-50">
                <BsChevronLeft />
              </i>
            </button>
            {dashboardState.page === "dashboard" ? (
              <Dashboard />
            ) : dashboardState.page === "projects" ? (
              <DashboardProjects
                heading={"ALL PROJECTS"}
                projects={dashboardState.projects}
              />
            ) : dashboardState.page === "pending" ? (
              <DashboardProjects
                heading={"PENDING PROJECTS"}
                projects={dashboardState.pending}
              />
            ) : dashboardState.page === "approved" ? (
              <DashboardProjects
                heading={"APPROVED PROJECTS"}
                projects={dashboardState.approved}
              />
            ) : dashboardState.page === "promoted" ? (
              <DashboardProjects
                heading={"PROMOTED PROJECTS"}
                projects={dashboardState.promoted}
              />
            ) : dashboardState.page === "declined" ? (
              <DashboardProjects
                heading={"DECLINED PROJECTS"}
                projects={dashboardState.declined}
              />
            ) : dashboardState.page === "blocked" ? (
              <DashboardProjects
                heading={"BLOCKED PROJECTS"}
                projects={dashboardState.blocked}
              />
            ) : dashboardState.page === "notifications" ? (
              <DashboardNotifications
                notifications={dashboardState.notifications}
              />
            ) : dashboardState.page === "users" ? (
              <DashboardUsers heading={"USERS"} users={dashboardState.users} />
            ) : dashboardState.page === "entrepreneurs" ? (
              <DashboardUsers
                heading={"ENTREPRENEURS"}
                users={dashboardState.entrepreneurs}
              />
            ) : dashboardState.page === "admins" ? (
              <DashboardUsers
                heading={"ADMINS"}
                users={dashboardState.admins}
              />
            ) : dashboardState.page === "campaigns" ? (
              <DashboardCampaigns />
            ) : (
              dashboardState.page === "settings" && (
                <DashboardSettings categories={dashboardState.categories} />
              )
            )}
          </div>
        </div>
      </div>
    </dashboardContext.Provider>
  );
}

export default DashboardPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const profile = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/profile/${session.user?.id}`
    ).then((data) => data.json());

    if (profile.status === "admin") {
      const admins = fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/admins`
      ).then((data) => data.json());

      const projects = fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/projects`
      ).then((data) => data.json());

      const users = fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/users`
      ).then((data) => data.json());

      const notifications = fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/notifications`
      ).then((data) => data.json());

      const categories = fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/categories`
      ).then((data) => data.json());

      const campaigns = fetch(
        `${
          process.env.NODE_ENV === "production"
            ? "https://financee-nu.vercel.app"
            : "http://localhost:3000"
        }/api/admin/campaigns`
      ).then((data) => data.json());

      const data = await Promise.all([
        admins,
        projects,
        users,
        notifications,
        categories,
        campaigns,
      ]);
      return {
        props: {
          admins: data[0],
          profile: profile,
          projects: data[1],
          users: data[2],
          notifications: data[3],
          categories: data[4],
          campaigns: data[5],
        },
      };
    } else {
      return {
        redirect: {
          destination: `/profile`,
          peranent: false,
        },
      };
    }
  } else {
    //no session here
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${`/profile`}`,
        peranent: false,
      },
    };
  }
}
