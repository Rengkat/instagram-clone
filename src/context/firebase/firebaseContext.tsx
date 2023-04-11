import { createContext, useReducer, useState, useEffect } from "react";
import { app } from "./firebaseConfig";
import { firebaseReducer } from "./Reducer";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

interface User {
  id?: string;
  password: string;
  userName: string;
  fullName: string;
  email: string;
  uid: string;
  phone: string;
  gender: string;
  website: string;
  bio: string;
  profileImage: string;
}

interface Post {
  imgeUrl: string;
  caption: string;
  userUID: string;
  createdAt: string;
  id: string;
  isCommentOpen: boolean;
  isLiked: boolean;
}
interface comments {
  postID: string;
  userID: string;
  commetText: string;
  commetID: string;
  createdAt: string;
}
interface FirebaseProviderProps {
  children: React.ReactNode;
}
type State = {
  users: User[];
  user: User;
  allPosts: Post[];
};
// initialize cloud store and get the reference to the service
const db = getFirestore(app);
//user collection ref
const usersCollectionRef = collection(db, "users");
// post collection
const allPostRef = collection(db, "posts");
// entire state
const initialState: State = {
  users: [],
  allPosts: [],
  user: {
    id: "",
    password: "",
    userName: "",
    fullName: "",
    email: "",
    uid: "",
    phone: "",
    gender: "",
    website: "",
    bio: "",
    profileImage: "",
  },
};
export const firebaseContext = createContext<State>(initialState);
const FirebaseContextProvider = ({ children }: FirebaseProviderProps) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  // console.log(state.users);
  useEffect(() => {
    // asyc to get collections of users
    const fetchedUsers = async () => {
      // for real time data update, we use onSnaoshot instead of getDocs
      const usersSnapshot = await getDocs(usersCollectionRef);
      const fetchedUsers = usersSnapshot.docs.map((doc) => ({
        ...(doc.data() as object),
        id: doc.id,
      })) as User[];

      dispatch({ type: "GET_USERS", payload: fetchedUsers });
    };
    return () => {
      fetchedUsers();
    };
  }, []);
  // sign up user
  const signUpUser = async (uid: string) => {
    const q = query(usersCollectionRef, where("uid", "==", uid));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch({ type: "SIGN_UP_USER", payload: doc.data() });
      });
    } catch (error) {}
  };

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(allPostRef, (querySnapshot) => {
        const response = querySnapshot.docs.map((post) => ({
          ...(post.data() as object),
          id: post.id,
          isCommentOpen: false,
          isLiked: false,
        })) as Post[];
        dispatch({ type: "FETCH_ALL_POSTS", payload: response });
      });
      return () => unsubscribe();
    } catch (error) {}
  }, [state.allPost]);

  const openComments = (id: string) => {
    dispatch({ type: "OPEN_COMMENTS", payload: id });
  };
  const handleLiked = (id: string) => {
    dispatch({ type: "LIKE_POST", payload: id });
  };
  // get specific post
  return (
    <firebaseContext.Provider
      value={{ ...state, signUpUser, openComments, handleLiked }}>
      {children}
    </firebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
