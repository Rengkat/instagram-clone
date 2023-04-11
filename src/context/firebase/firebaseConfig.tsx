import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
interface FirebaseConfigType {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_API_KEY_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_KEY_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_KEY_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_KEY_MESSAGEING_SENDER_ID,
  appId: import.meta.env.VITE_API_KEY_APP_ID,
};
export const app = initializeApp(firebaseConfig);

// apiKey: "AIzaSyCiUxhIke4yZ0eAHdo2OYHNPZ2Y3mpBnPY",
// authDomain: "instagram-clone-aee26.firebaseapp.com",
// projectId: "instagram-clone-aee26",
// storageBucket: "instagram-clone-aee26.appspot.com",
// messagingSenderId: "436445681686",
// appId: "1:436445681686:web:104cf2b0a47198dae1bd37",
