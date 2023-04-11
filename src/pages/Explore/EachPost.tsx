import { useState, useContext, useEffect } from "react";
import { BsFillChatFill, FaHeart } from "react-icons/all";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  doc,
  getDoc,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../context/firebase/firebaseConfig";

interface propsType {
  data: any;
}

const EachPost = ({ data }: propsType) => {
  const { user } = useContext(firebaseContext);
  const [isHovered, setIsHovered] = useState(false);

  const db = getFirestore(app);
  const commentsRef = collection(db, "comments");
  const userRef = collection(db, "users");
  const likesRef = collection(db, "likes");
  const [postComments, setPostComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);

  // fetch comments for this post
  useEffect(() => {
    const getComments = async () => {
      const postCommentuery = query(
        commentsRef,
        where("postId", "==", data.id)
      );
      const commentsSnapshot = await getDocs(postCommentuery);
      const response = commentsSnapshot.docs.map((comt) => comt.data());
      setPostComments(response);
    };
    getComments();
  }, [postComments]);
  // fetch likes
  useEffect(() => {
    const getLikes = async () => {
      const likesQuery = query(likesRef, where("postId", "==", data.id));
      const likesSnapshot = await getDocs(likesQuery);
      const response = likesSnapshot.docs.map((like) => ({
        ...like.data(),
        id: like.id,
      }));
      setLikes(response);
    };
    getLikes();
  }, [likes]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img
        src={data?.imgeUrl}
        alt=""
        className="h-[30vh] object-cover rounded-md px-1 w-full"
      />
      <div
        className={` absolute bg-[#00000083] inset-0 z-10 flex items-center justify-center ${
          isHovered ? "block" : "hidden"
        } `}>
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1">
            <FaHeart fontSize={20} />
            <p>{likes?.length}</p>
          </div>
          <div className="flex items-center gap-1 ">
            <BsFillChatFill fontSize={20} className="text-white" />
            <p>{postComments?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachPost;
