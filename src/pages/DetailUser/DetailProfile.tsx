import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  where,
  query,
  getFirestore,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { HiUserAdd } from "react-icons/all";
import { app } from "../../context/firebase/firebaseConfig";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import { useState, useContext, useEffect, useReducer } from "react";
import AllPosat from "../Profile/AllPsat";
const DetailProfile = () => {
  const { user } = useContext(firebaseContext);
  const { uid } = useParams();
  const [userDetails, setUserDetails] = useState<any>({});
  const [posts, setPosts] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);
  const navigate = useNavigate();

  const details = userDetails && userDetails[0];
  // console.log(userDetails, uid);
  // console.log(followers);
  const db = getFirestore(app);
  const usersRef = collection(db, "users");
  const followersRef = collection(db, "followers");

  //   fetch the user for detail profile
  useEffect(() => {
    const getUser = async () => {
      const q = query(usersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
      });
    };
    getUser();
  }, [uid]);
  // get all posts for this user
  useEffect(() => {
    const getUserPosts = async () => {
      // console.log(user);
      const db = getFirestore(app);
      const postsRef = collection(db, "posts");
      // const likesRef = collection(db, "likes");

      const userPosts = query(postsRef, where("userUID", "==", uid));
      const userPostsSnapshot = await getDocs(userPosts);
      const response = userPostsSnapshot.docs.map((post) => ({
        ...post.data(),
        id: post.id,
      }));
      setPosts(response);
    };
    getUserPosts();
  }, [posts]);
  // Add following
  // console.log(followers);
  const handlefollow = async () => {
    // check if user is not same as the current user then
    if (user.uid !== uid) {
      // if user already following, then unfollow else follow
      const followed = followers?.map((folow: any) => {
        if (folow?.followingUid === uid) {
          return folow;
        }
        return;
      });

      if (followed[0]?.followingUid && followed.length > 0) {
        const folow = doc(db, "followers", followed[0]?.followingUid);
        await deleteDoc(folow);
      } else {
        await addDoc(followersRef, {
          followingUid: uid,
          followerUid: user.uid,
          followerUsername: user.userName,
          followerFullname: user.fullName,
        });
      }
    }
    return;
  };
  // get all the followers
  useEffect(() => {
    const getFollowers = async () => {
      const followerQuery = query(
        followersRef,
        where("followingUid", "==", uid)
      );
      const folowers = await getDocs(followerQuery);
      const response = folowers.docs.map((follower) => follower.data());
      setFollowers(response);
    };
    getFollowers();
  }, [followers]);

  // check if user is not same as current user. If no then
  // add user chat and redirect to the chat screen when clicked
  const handleAddChat = async () => {
    if (user.uid !== uid) {
      const userChatRef = collection(db, "userChats");
      await addDoc(userChatRef, {
        recipiantUid: uid,
        recipianUsername: userDetails.userName,
        recipianImg: userDetails.profileImage,
        recipianFullName: userDetails.fullName,
        // recipianImg: userDetails.imageUrl,
        messages: [],
        senderUid: user.uid,
      });
      navigate("/inbox");
    }
    return;
  };
  return (
    <>
      <div className="w-full md:w-[80%] px-3 pb-[8rem] h-screen ">
        <div className="flex gap-12 pt-12 ">
          <div className="w-[20%]">
            {userDetails?.profileImage ? (
              <img
                src={userDetails?.profileImage}
                alt=""
                className="w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full object-cover"
              />
            ) : (
              <div className="w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full bg-white flex justify-center items-center">
                <p className="text-black">Image</p>
              </div>
            )}
          </div>

          <div className="w-[80%] ">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center md:w-[100%] ">
              <p className="w-[60%] lg:w-[]  py-1 px-4 font-semibold text-xl ">
                {userDetails?.userName}
              </p>
              <button
                onClick={handlefollow}
                className="w-[60%] lg:w-[50%] bg-white cursor-pointer py-1 px-4 font-semibold text-black rounded-md flex justify-center">
                <HiUserAdd fontSize={25} />
              </button>
              <button
                onClick={handleAddChat}
                className="w-[60%] lg:w-[50%] bg-white cursor-pointer py-1 px-4 font-semibold text-black rounded-md">
                Message
              </button>
            </div>
            <div className="hidden gap-8 py-5  md:flex">
              <p>{posts?.length} posts</p>
              <p>{followers?.length} followers</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[80%]   md:ml-[12rem]">
          <div className="w-full md:w-[100%] py-4 md:py-0 md:pl-3 md:-mt-6">
            <h3 className="font-bold">{userDetails?.fullName}</h3>
            <p>{userDetails?.bio}</p>
            <div className="flex justify-between md:hidden gap-8 py-5 font-semibold ">
              <div className="text-center ">
                <p>{posts?.length} </p>
                <p className="text-gray-400">post</p>
              </div>
              <div className="text-center">
                <p>{followers?.length}</p>
                <p className="text-gray-400">followers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-[5rem] pt-[2rem] mb-[25rem] relative">
          {" "}
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post: any) => {
              return <AllPosat data={post} key={post?.createdAt?.seconds} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProfile;
