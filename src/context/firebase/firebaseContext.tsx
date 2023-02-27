import { createContext, useReducer, useState, useEffect } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { firebaseReducer } from "./Reducer";
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
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};
interface FirebaseProviderProps {
  children: React.ReactNode;
}
type State = {
  user: string;
};
const app = initializeApp(firebaseConfig);
// initialize cloud store and get the reference to the service
const db = getFirestore(app);
// collection ref
const usersCollectionRef = collection(db, "user");

const initialState: State = {
  user: "",
};
export const firebaseContext = createContext<State>(initialState);
const FirebaseContextProvider = ({ children }: FirebaseProviderProps) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

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

  return (
    <firebaseContext.Provider value={{ ...state }}>
      {children}
    </firebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
