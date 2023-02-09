import { Link, NavLink } from "react-router-dom";
import {
  AiFillHome,
  MdExplore,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
} from "react-icons/all";
import image from "../assets/image.jpg";
const MobileNave = () => {
  return (
    <div className="w-full border-t-2 px-10">
      <div className="w-full flex justify-between p-5 items-center">
        <div>
          <NavLink to={"/home"}>
            <AiFillHome fontSize={27} />
          </NavLink>
        </div>
        <div>
          <NavLink to={"/explore"}>
            <MdExplore fontSize={27} />
          </NavLink>
        </div>
        <div>
          <NavLink to={""}>
            <RiVideoFill fontSize={27} />
          </NavLink>
        </div>
        <div>
          <NavLink to={"/reels"}>
            <MdAddBox fontSize={27} />
          </NavLink>
        </div>
        <div>
          <NavLink to={"/inbox"}>
            <FaFacebookMessenger fontSize={27} />
          </NavLink>
        </div>

        <div>
          <NavLink to={"/profile"}>
            <img src={image} alt="" className="w-8 h-8 rounded-full" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileNave;
