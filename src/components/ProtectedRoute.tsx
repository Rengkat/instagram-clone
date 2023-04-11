import React, { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, Route } from "react-router-dom";

import { firebaseContext } from "../context/firebase/firebaseContext";
type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { signUpUser } = useContext<any>(firebaseContext);
  // console.log("me");
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsAuthenticated(true);
        signUpUser(user.uid);
      } else {
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
