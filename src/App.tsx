import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Exercises from "./pages/Exercises";
import Dictionary from "./pages/Dictionary";
import Statistics from "./pages/Statistics";
import { selectUser, setUser } from "./store/user/userSlice";
import AppLayout from "./pages/AppLayout/idex";
import AuthByVk from "./pages/AuthByVk";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  React.useEffect(() => {
    const value = localStorage.getItem("user");
    if (typeof value === "string") {
      const user = JSON.parse(value);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "var(--error-toast)",
              color: "white",
            },
          },
        }}
      />
      <div className="background">
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path="/"
            element={<Navigate replace to="/app/dictionary" />}
          ></Route>
          <Route
            path="/auth"
            element={
              user !== null ? (
                <Navigate replace to="/app/dictionary" />
              ) : (
                <Auth />
              )
            }
          ></Route>
          <Route
            path="/authByVk"
            element={
              user !== null ? (
                <Navigate replace to="/app/dictionary" />
              ) : (
                <AuthByVk />
              )
            }
          ></Route>
          <Route
            path="/registrationByVk"
            element={
              user !== null ? (
                <Navigate replace to="/app/dictionary" />
              ) : (
                <AuthByVk />
              )
            }
          ></Route>
          <Route
            path="/app/*"
            element={
              user !== null ? <AppLayout /> : <Navigate replace to="/auth" />
            }
          >
            <Route path="dictionary" element={<Dictionary />}></Route>
            <Route path="exercises" element={<Exercises />}></Route>
            <Route path="statistics" element={<Statistics />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
