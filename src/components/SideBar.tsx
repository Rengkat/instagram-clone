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
  BsHeartFill,
} from "react-icons/all";
const SideBar = () => {
  return (
    <div className=" leading-[4rem] pl-5 pt-4">
      <div className="py-5">
        {/* <img src={header} alt="" className="w-[8rem] h-10" /> */}
      </div>
      <div className="conatiner">
        <div>
          {/* style for the link in the css file */}
          <NavLink className="link" to={"/home"}>
            <span>
              <AiFillHome fontSize={30} />
            </span>
            <span className="link-name"> Home</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={""}>
            <span>
              <FiSearch fontSize={30} />
            </span>
            <span className="link-name"> Search</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/explore"}>
            <span>
              <MdExplore fontSize={30} />
            </span>
            <span className="link-name"> Explore</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/reels"}>
            <span>
              <RiVideoFill fontSize={30} />
            </span>
            <span className="link-name">Reels</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/inbox"}>
            <span>
              <FaFacebookMessenger fontSize={30} />
            </span>
            <span className="link-name">Messages</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/notification"}>
            <span>
              <BsHeartFill fontSize={30} />
            </span>
            <span className="link-name">Notifications</span>
          </NavLink>
        </div>
        <div>
          <NavLink className="link" to={"/create"}>
            <span>
              <MdAddBox fontSize={30} />
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
