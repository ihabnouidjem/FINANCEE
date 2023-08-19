import { dashboardContext } from "@/pages/dashboard";
import React, { useContext } from "react";
import { BsX, BsXLg } from "react-icons/bs";
import DashboardCategories from "./DashboardCategories";

function DashboardSettings({ categories }) {
  return (
    <div className="w-full h-full flex flex-col pb-6 overflow-y-scroll overflow-x-hidden u-scrollbar-hidden gap-6">
      <div className="min-h-[96px] w-full flex items-center flex-wrap gap-4">
        <h4 className="h4 text-zinc-50">SETTINGS</h4>
      </div>
      <DashboardCategories />
    </div>
  );
}

export default DashboardSettings;
