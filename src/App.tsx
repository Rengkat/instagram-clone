import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Create,
  DetailProfile,
  EditProfile,
  ErrorRoute,
  Explore,
  Home,
  Messages,
  Profile,
  ProtectedRoute,
  ShareLayout,
  SignIn,
  SignUp,
} from "./pages";

import SavedLogin from "./pages/SignUp/SavedLogin";
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ShareLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="explore" element={<Explore />} />
          <Route path="inbox" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path=":uid" element={<DetailProfile />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/saved" element={<SavedLogin />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </div>
  );
};

export default App;
