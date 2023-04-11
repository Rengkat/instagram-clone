import image from "../../assets/image.jpg";
import {
  BsHeart,
  FiMessageCircle,
  FiSend,
  BsBookmark,
  BsFillHeartFill,
} from "react-icons/all";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  where,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../context/firebase/firebaseConfig";
import { SingleData } from "../../Types/singleDataType";
import { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import Comments from "./comments";
import { Link } from "react-router-dom";

interface propsType {
  post: any;
}
const MainContain = ({ post }: propsType) => {
  const { user, openComments, handleLiked } = useContext<any>(firebaseContext);

  const db = getFirestore(app);
  const commentsRef = collection(db, "comments");
  const userRef = collection(db, "users");
  const likesRef = collection(db, "likes");

  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const [isLiked, setIsLiked] = useState(false);

  // add commet
  const handleSubmitComment = async () => {
    // e.preventDefault();
    if (comment !== "") {
      await addDoc(commentsRef, {
        commentText: comment,
        useruid: user.uid,
        createdAt: serverTimestamp(),
        postId: post.id,
        username: user.userName,
      });
    } else {
      return;
    }
    setComment("");
  };
  const handleLike = async () => {
    // if the id of liked exisit then remove that like document else add it
    const hasLiked = likes?.map((lik: any) => {
      if (lik.postId === post.id) {
        return lik;
      }
      return;
    });
    if (hasLiked[0]?.id) {
      const collectionRef = doc(db, "likes", hasLiked[0]?.id);
      await deleteDoc(collectionRef);
    } else {
      setIsLiked(true);
      await addDoc(likesRef, {
        username: user.userName,
        createdAt: serverTimestamp(),
        postId: post.id,
        useruid: user.uid,
      });
      handleLiked(post.id);
    }
  };
  // fetch comments for this post
  useEffect(() => {
    const getComments = async () => {
      const postCommentuery = query(
        commentsRef,
        where("postId", "==", post.id)
      );
      const commentsSnapshot = await getDocs(postCommentuery);
      const response = commentsSnapshot.docs.map((comt) => comt.data());
      setPostComments(response);
    };
    return () => {
      getComments();
    };
  }, [comment]);
  // fetch likes
  useEffect(() => {
    const getLikes = async () => {
      const likesQuery = query(likesRef, where("postId", "==", post.id));
      const likesSnapshot = await getDocs(likesQuery);
      const response = likesSnapshot.docs.map((like) => ({
        ...like.data(),
        id: like.id,
      }));
      setLikes(response);
    };
    return () => {
      getLikes();
    };
  }, [likes]);

  return (
    <div className="flex justify-center py-2 border-b-[1px] border-gray-700">
      <div className=" max-w-[500px] pt-5">
        <Link to={`/${post.userUID} `} className="flex items-center gap-2 py-2">
          {post?.profileImg ? (
            <>
              <img
                src={post?.profileImg}
                alt=""
                className="w-10 h-10 rounded-full object-cover "
              />
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-white"></div>
            </>
          )}

          <div>
            <p>
              <>{post?.postUsername} . 5d</>
            </p>
            <p>Jos, Nigeria</p>
          </div>
        </Link>
        <img
          src={post?.imgeUrl}
          alt=""
          className="h-[80vh] object-cover rounded-md px-1 w-full"
        />
        <aside className="flex justify-between p-4">
          <div className="flex gap-3 cursor-pointer">
            {post?.isLiked ? (
              <BsFillHeartFill
                fontSize={28}
                className="text-red-600"
                onClick={handleLike}
              />
            ) : (
              <BsHeart fontSize={28} onClick={handleLike} />
            )}
            <FiMessageCircle fontSize={28} />
            <FiSend fontSize={28} />
          </div>
          <BsBookmark fontSize={28} />
        </aside>
        {/* coments and likes */}
        <div className="px-4 relative">
          <p>{likes?.length} likes</p>
          <p className="py-1">
            {/* owners caption */}
            <span className=" font-semibold pr-2">{post?.postUsername}</span>
            {post?.caption}
          </p>
          <p
            // onClick={() => setReadAlComments((pre) => !pre)}
            onClick={() => openComments(post.id)}
            className=" font-light cursor-pointer">
            View {postComments?.length} comments
          </p>
          {/* comments */}
          <p>
            <span className="font-semibold pr-2">
              {postComments[0]?.username}
            </span>
            {postComments[0]?.commentText}
          </p>
          {post?.isCommentOpen && (
            <div className=" bg-black w-full">
              {postComments?.map((singleComment: any, index: any) => {
                return <Comments key={index} comment={singleComment} />;
              })}
            </div>
          )}
          <div className="flex justify-between gap-3">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Add comment..."
              className="my-1 w-full gap-1 p-2 outline-none bg-[#121212] placeholder:text-gray-300"
            />
            <button
              onClick={handleSubmitComment}
              className="border-[1px] border-white py-[1px] px-2 rounded-md"
              type="submit">
              Submit
            </button>
          </div>

          {/* comment */}
        </div>
      </div>
    </div>
  );
};
export default MainContain;
