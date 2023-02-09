import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Create,
  ErrorRoute,
  Explore,
  Home,
  Messages,
  Notifications,
  Profile,
  ProtectedRoute,
  Reels,
  ShareLayout,
  SignIn,
  SignUp,
} from "./pages";
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <ShareLayout />
            // </ProtectedRoute>
          }>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="explore" element={<Explore />} />
          <Route path="inbox" element={<Messages />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reels" element={<Reels />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </div>
  );
};

export default App;
