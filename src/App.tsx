import React from "react";
import { ClipLoader } from "react-spinners";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import "./index.scss";

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
import axios from "axios";
import Shop from "./pages/Shop";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const value = localStorage.getItem("user");
        if (typeof value === "string") {
          const user = JSON.parse(value);
          await axios.get(
            "https://9854dac21e0f0eee.mokky.dev/auth_me",
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          );
          dispatch(setUser(user));
        }
        setIsLoading(false);
      } catch (err: any) {
        console.log(err);
        if (err.response.data.statusCode === 401) {
          localStorage.clear();
          toast.error("Пользователь не авторизован");
        } else if (err.response.data.statusCode === 404) {
          localStorage.clear();
          toast.error("Пользователь не найден");
        }
        setIsLoading(false);
      }
    };
    checkAuth();
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
      <div className="appBackground">
        {isLoading ? (
          <div className="loader">
            <ClipLoader color="white" />
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate replace to="/notFound" />}></Route>
            <Route path="/notFound" element={<NotFound />}></Route>
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
              <Route path="*" element={<Navigate replace to="/notFound" />}></Route>
              <Route path="dictionary" element={<Dictionary />}></Route>
              <Route path="exercises" element={<Exercises />}></Route>
              <Route path="statistics" element={<Statistics />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="shop" element={<Shop/>}></Route>
            </Route>
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
