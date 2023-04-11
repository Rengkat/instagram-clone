import React from "react";
import { useState, useEffect } from "react";
import { app } from "../../context/firebase/firebaseConfig";
import { BsFillChatFill, FaHeart } from "react-icons/all";
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
interface propsType {
  data: any;
}
const AllPosat = ({ data }: propsType) => {
  const [isHovered, setIsHovered] = useState(false);
  const [postComments, setPostComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  // console.log(data);
  const db = getFirestore(app);
  const commentsRef = collection(db, "comments");
  const userRef = collection(db, "users");
  const likesRef = collection(db, "likes");
  // fetch comments for this post
  useEffect(() => {
    const getComments = async () => {
      const postCommentuery = query(
        commentsRef,
        where("postId", "==", data.id),
        where("useruid", "==", data.userUID)
      );
      const commentsSnapshot = await getDocs(postCommentuery);
      const response = commentsSnapshot.docs.map((cmt) => ({
        ...cmt.data(),
        id: cmt.id,
      }));
      setPostComments(response);
    };
    getComments();
  }, [postComments]);
  // fetch likes
  useEffect(() => {
    const getLikes = async () => {
      const likesQuery = query(
        likesRef,
        where("postId", "==", data.id),
        where("useruid", "==", data.userUID)
      );
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
        <div className="flex gap-3 items-center">
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

export default AllPosat;
