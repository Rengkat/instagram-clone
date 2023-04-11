import { SingleData } from "../../Types/singleDataType";

interface propsType {
  post: any;
}

const TopImage = ({ post }: propsType) => {
  return (
    <div>
      <div className="">
        {post?.imgeUrl && (
          <>
            <img
              src={post?.imgeUrl}
              alt=""
              className=" w-16 h-16 rounded-full object-cover"
            />
            <p className=" text-sm md:font-normal">{post?.postUsername}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TopImage;
