import { Link, NavLink } from "react-router-dom";
import header from "../assets/header.jpg";
import image from "../assets/image.jpg";
import {
  AiFillHome,
  MdExplore,
  FiSearch,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
  BsHeart,
} from "react-icons/all";
const SideBar = () => {
  return (
    <div className=" leading-[4rem] pl-5 pt-4 text-white">
      <div className="py-5">
        <h1 className=" font-light text-3xl font-display hidden lg:block">
          Instagram
        </h1>
      </div>
      <div className="conatiner">
        <div>
          {/* style for the link in the css file */}
          <NavLink className="link" to={"/home"}>
            <span>
              <AiFillHome fontSize={28} />
            </span>
            <span className="link-name"> Home</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={""}>
            <span>
              <FiSearch fontSize={28} />
            </span>
            <span className="link-name"> Search</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/explore"}>
            <span>
              <MdExplore fontSize={28} />
            </span>
            <span className="link-name"> Explore</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/reels"}>
            <span>
              <RiVideoFill fontSize={28} />
            </span>
            <span className="link-name">Reels</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/inbox"}>
            <span>
              <FaFacebookMessenger fontSize={28} />
            </span>
            <span className="link-name">Messages</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/notification"}>
            <span>
              <BsHeart fontSize={28} />
            </span>
            <span className="link-name">Notifications</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/create"}>
            <span>
              <MdAddBox fontSize={28} />
            </span>
            <span className="link-name">Create</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/profile"}>
            <span>
              <img src={image} alt="" className="w-8 h-8 rounded-full" />
            </span>
            <span className="link-name">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
