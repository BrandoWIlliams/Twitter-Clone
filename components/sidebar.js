import React from "react";
import twitterWhite from "../images/twitterWhite.svg";
import pp from "../images/profilePicture.png";
import IMAGES from "../images/Sidebar/index.js";
import Image from "next/image";
import SidebarProfile from "./sidebarProfile";
import SidebarButton from "./sidebarButton";
import { HomeIcon } from "@heroicons/react/solid";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  BellIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  MailIcon,
  UserIcon,
  ViewListIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  const [showSO, setShowSO] = useState(false);
  return (
    // !check for fixed sidebar
    <div className=" hidden sm:flex lg:w-[400px] sm:items-center md:w-[100px]  flex-col pt-4 sm:w-[100px] items-center h-full">
      {/* //* This is the side bar for dekstop screens, that gets hidden for mobile */}
      <div className=" text-[#d9d9d9] space-y-3 xl:pl-20">
        <button className="self-start px-4">
          <Image src={twitterWhite} alt="twitter" width={30} height={30} />
        </button>
        <SidebarButton Icon={HomeIcon} text="Home" />
        <SidebarButton Icon={HashtagIcon} text="Explore" />
        <SidebarButton Icon={BellIcon} text="Notifications" />
        <SidebarButton Icon={MailIcon} text="Messages" />
        <SidebarButton Icon={BookmarkIcon} text="Bookmarks" />
        <SidebarButton Icon={ViewListIcon} text="Lists" />
        <SidebarButton Icon={UserIcon} text="Profile" />
        <SidebarButton Icon={DotsCircleHorizontalIcon} text="More" />

        <button className="rounded-full bg-[#1d9bf0] hover:bg-[#11a0ff] text-white w-52 h-14 hidden lg:block font-sans font-bold text-lg ">
          Tweet
        </button>
        <div className=" absolute bottom-3 lg:block">
          {showSO && (
            <button
              className="relative z-50 bottom-0 text-center h-[50px] border-2 bg-[#0a366e] w-full border-white rounded-xl "
              onClick={signOut}
            >
              <div className="">
                <h1 className="py-3 text-[#d9d9d9] font-bold">Sign Out </h1>
              </div>
            </button>
          )}

          <div
            className="rounded-full bg-black w-auto hover:bg-zinc-900 py-2 px-2 "
            onClick={() => setShowSO(!showSO)}
          >
            <SidebarProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
