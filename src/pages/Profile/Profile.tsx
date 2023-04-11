import Image from "../../assets/image.jpg";
import { useEffect, useState, useContext } from "react";
import AllPosat from "./AllPsat";
import { Link } from "react-router-dom";
import { app } from "../../context/firebase/firebaseConfig";
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
import { firebaseContext } from "../../context/firebase/firebaseContext";
const Profile = () => {
  const [userPosts, setUserPost] = useState<any>([]);
  const { user } = useContext(firebaseContext);
  const [followers, setFollowers] = useState<any>([]);

  // console.log(userDetails, uid);
  // console.log(followers);
  const db = getFirestore(app);
  const followersRef = collection(db, "followers");
  // console.log(userPosts);
  // fetch user posts
  useEffect(() => {
    const getUserPosts = async () => {
      // console.log(user);
      const db = getFirestore(app);
      const postsRef = collection(db, "posts");
      const userRef = collection(db, "users");
      const likesRef = collection(db, "likes");

      const userPosts = query(postsRef, where("userUID", "==", user.uid));
      const userPostsSnapshot = await getDocs(userPosts);
      const response = userPostsSnapshot.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));
      setUserPost(response);
    };
    getUserPosts();
  }, [userPosts]);
  useEffect(() => {
    const getFollowers = async () => {
      const followerQuery = query(
        followersRef,
        where("followingUid", "==", user?.uid)
      );
      const folowers = await getDocs(followerQuery);
      const response = folowers.docs.map((follower) => follower.data());
      setFollowers(response);
    };
    getFollowers();
  }, [followers]);
  return (
    <div className="w-full md:w-[80%] px-3 pb-[8rem] ">
      <div className="flex gap-12 pt-12  ">
        {user?.profileImage ? (
          <img
            src={user?.profileImage}
            alt=""
            className="w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full object-cover"
          />
        ) : (
          <div className="w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full bg-white flex justify-center items-center">
            <p className="text-black">Image</p>
          </div>
        )}

        <div className="w-[70%] ">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center md:w-[70%]">
            <p className="text-left font-semibold text-xl">{user?.userName}</p>
            <button className="w-[60%] lg:w-[50%] bg-white cursor-pointer py-1 px-4 font-semibold text-black rounded-md">
              <Link to="/edit">Edit profile</Link>
            </button>
          </div>
          <div className="hidden gap-8 py-5  md:flex">
            <p>{userPosts?.length} posts</p>
            <p>{followers?.length} followers</p>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-end">
        <div className="w-full md:w-[80%] py-4 md:py-0 md:pl-3 md:-mt-6">
          <h3 className="font-bold">{user?.fullName}</h3>
          <p>{user?.bio}</p>
          <div className=" flex justify-between md:hidden gap-8 py-5 font-semibold ">
            <div className="text-center ">
              <p>{userPosts?.length}</p>
              <p className="text-gray-400">post</p>
            </div>
            <div className="text-center">
              <p>{followers.length}</p>
              <p className="text-gray-400">followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[5rem] pt-[2rem] mb-[25rem] relative">
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userPosts.map((post: any) => {
            return <AllPosat data={post} key={post?.createdAt?.seconds} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
