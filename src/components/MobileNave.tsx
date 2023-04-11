import { Link, NavLink } from "react-router-dom";
import {
  AiFillHome,
  MdExplore,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
} from "react-icons/all";
import image from "../assets/image.jpg";
import { firebaseContext } from "../context/firebase/firebaseContext";
import { useContext } from "react";
const MobileNave = () => {
  const { user } = useContext(firebaseContext);
  return (
    <div className="w-full border-t-[1px] border-gray-700 px-10">
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
          <NavLink to={"/create"}>
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
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <p className=" text-[10px] text-black">Image</p>
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileNave;
