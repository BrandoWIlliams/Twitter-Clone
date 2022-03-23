import React from "react";
import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import WhiteDots from "../images/whiteDots.svg";
import { useSession } from "next-auth/react";

function SidebarProfile({ image, name, tag }) {
  //* Fetching the session data
  const { data: session } = useSession();
  return (
    // Whole Card
    <button>
      <div className="">
        {/* Div for the inner contents */}
        <div className="flex space-x-1 place-content-center items-center">
          <img
            src={session.user.image}
            alt=""
            className="rounded-full h-10 w-10"
          />

          <div className="lg:flex items-center hidden">
            <div className="flex-col px-3">
              <h1 className="text-sm font-medium text-white">
                {session.user.name}
              </h1>
              <h1 className="text-sm font-medium text-white">
                @{session.user.tag}
              </h1>
            </div>
            <div className="px-1">
              <Image src={WhiteDots} alt="options" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default SidebarProfile;
