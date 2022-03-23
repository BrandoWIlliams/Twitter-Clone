import React from "react";
import Image from "next/image";
function SidebarButton({ Icon, text }) {
  return (
    <button className="flex text-xl  font-sans hover:bg-zinc-900 w-max rounded-full px-1  py-2">
      <div className="px-3 ">
        <Icon className="h-7" />
      </div>
      <span className="hidden lg:block pr-3">{text}</span>
    </button>
  );
}

export default SidebarButton;
