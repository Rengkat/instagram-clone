import {
  AiFillHome,
  MdExplore,
  FiSearch,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
  BsHeart,
} from "react-icons/all";
interface propsType {
  comment: any;
}
const Comments = ({ comment }: propsType) => {
  // console.log(comment);
  return (
    <div className="text-white flex justify-between">
      <p>
        <span className="font-semibold">{comment?.username}</span>
        {comment?.commentText}
      </p>
      <BsHeart />
    </div>
  );
};

export default Comments;
