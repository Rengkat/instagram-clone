import React from "react";
import { Outlet } from "react-router-dom";
import MobileNave from "./MobileNave";
import SideBar from "./SideBar";
const ShareLayout = () => {
  return (
    <div className="bg-[#121212] text-[#eee]">
      {/* flex the side bar and the main contain only from meduim screen and above */}
      <div className="md:flex">
        <nav>
          {/* w-[19%] bg-[#000000] */}
          {/* This is hidden on small screen */}
          <div className=" side-bar bg-[#000000]">
            <SideBar />
          </div>
          {/* this is hidden medium screen and above */}
          <div className="md:hidden fixed z-50 bottom-0 right-0 left-0 bg-[#000000]">
            <MobileNave />
          </div>
        </nav>
        {/* =========== END OF NAV=========== */}
        {/* bg-[#121212] */}
        <main className="md:ml-[15rem] lg:ml-[28rem] mx-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ShareLayout;
