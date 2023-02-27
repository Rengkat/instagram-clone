import { firebaseConfig } from "./firebase/firebaseConfig";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// types of users
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};
interface UsrDetail {
  email: string;
  userName: string;
  password: string;
}
interface detailProps {
  details: UsrDetail;
}
const Firebase = () => {
  //   console.log(details);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // initialize cloud store and get the reference to the service
  const db = getFirestore(app);
  // collection ref
  const usersCollectionRef = collection(db, "users");
  //   reference for querying data including ordering of the data by usernamr in asending order
  //   we can order by the server time
  const q = query(
    usersCollectionRef,
    where("username", "==", "alex"),
    orderBy("username", "asc") /*the time added can be use for ordering */
  );
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  useEffect(() => {
    // asyc to get collection
    const fetchedUsers = async () => {
      // for real time data update, we use onSnaoshot instead of getDocs
      const usersSnapshot = await getDocs(usersCollectionRef);
      const fetchedUsers = usersSnapshot.docs.map((doc) => ({
        ...(doc.data() as object),
        id: doc.id,
      })) as User[];
      setUsers(fetchedUsers);
    };
    fetchedUsers();
  }, []);
  const addUser = (dtail: UsrDetail) => {
    addDoc(usersCollectionRef, {
      //   email: details.email,
      //   username: details.userName,
      //   password: details.password,
      //   the servertime stamp shows the time use was added
      addedBy: serverTimestamp(),
    });
  };
  //   addUser(details);
  return <div>firebase</div>;
};

export default Firebase;

// imported in the main home container
