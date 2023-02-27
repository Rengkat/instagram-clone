import image from "../../assets/image.jpg";
import {
  AiFillHome,
  MdExplore,
  FiSearch,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
  BsHeart,
  FiMessageCircle,
  FiSend,
  BsBookmark,
} from "react-icons/all";
import { SingleData } from "../../Types/singleDataType";

interface propsType {
  data: SingleData;
}
const MainContain = ({ data }: propsType) => {
  //   xNNpps3UIufmvRJN0GUUC_eO9k6 - IdhhMaxzH1URTK4;
  //   a9S0aluQTagrVs2jgW - JG86jkqoVqd1TauVUDwrMxpo;
  return (
    <div className="flex justify-center py-2 border-t-[1px] border-gray-700">
      <div className=" max-w-[500px] pt-5">
        <div className="flex items-center gap-2 py-2">
          <img src={image} alt="" className="w-10 h-10 rounded-full " />
          <div>
            <p>alexrengkat . 5d</p>
            <p>Jos, Nigeria</p>
          </div>
        </div>
        <img
          src={data?.urls?.full}
          alt=""
          className="h-[80vh] object-cover rounded-md px-1 w-full"
        />
        <aside className="flex justify-between p-4">
          <div className="flex gap-3 cursor-pointer">
            <BsHeart fontSize={28} />
            <FiMessageCircle fontSize={28} />
            <FiSend fontSize={28} />
          </div>
          <BsBookmark fontSize={28} />
        </aside>
        {/* coments and likes */}
        <div className="px-4">
          <p>12,345 likes</p>
          <p className="py-1">
            {/* owners capture */}
            <span className=" font-semibold">alexrengkat</span> A true leader
            has the confidence to stand alone, the courage to make tough
            decisions, and the compassion
          </p>
          <p className=" font-light">View 12,454 comments</p>
          {/* comments */}
          <p>
            <span className="font-semibold">moses.jon</span>"Leadership is not
            about being in charge. It is about taking care of those in your
            charge." - Simon Sinek.
          </p>
          {/* comment */}
          <input
            type="text"
            placeholder="Add comment..."
            className="my-1 w-full p-2 outline-none bg-[#121212] placeholder:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
};
export default MainContain;
