import {
  AiFillHome,
  MdExplore,
  FiSearch,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
  BsHeart,
} from "react-icons/all";
const NavBar = () => {
  return (
    <nav className="flex md:hidden w-full justify-between items-center px-5 py-3 border-b-2 sticky top-0 bg-[#000000]">
      <h1 className=" font-light text-3xl font-display">Instagram</h1>
      <div className="flex gap-3 items-center">
        <div className="border-2 border-black py-[7px] flex items-center rounded-xl bg-[#252525]">
          <FiSearch fontSize={20} className="w-8" />
          <input
            type="text"
            placeholder="Search"
            className="px-2 border-none outline-none bg-[#252525]"
          />
        </div>
        <BsHeart fontSize={30} className=" cursor-pointer" />
      </div>
    </nav>
  );
};
export default NavBar;
