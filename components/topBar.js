import React from "react";
import Stars from "../images/Feed/Stars.svg";
import Image from "next/image";
import pp from "../images/profilePicture.png";
function TopBar() {
  return (
    <div className="w-full grid grid-cols-2 bg-black sticky top-0 h-12 z-50">
      <div className="  justify-self-start py-2 px-3 flex">
        <div className="block sm:hidden ">
          <button>
            <Image
              src={pp}
              alt="twitter"
              width={32}
              height={32}
              className="rounded-full "
            />
          </button>
        </div>
        <div className="self-center justify-self-start">
          <h1 className="text-[#d9d9d9] text-lg lg:text-xl font-bold font-sans px-5 lg:px-1 pb-1">
            Home
          </h1>
        </div>
      </div>

      <div className="self-center justify-self-end mr-2 px-2 lg:pt-2  rounded-full hover:bg-[#d9d9d9] hover:bg-opacity-10 ">
        <button>
          <Image src={Stars} alt="Top Tweets" width={25} height={25}  />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
