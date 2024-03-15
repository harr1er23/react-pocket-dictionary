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
import { selectUser } from "./store/user/userSlice";
import AppLayout from "./pages/AppLayout/idex";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

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
              user === null ? (
                <Navigate replace to="/app/dictionary" />
              ) : (
                <Auth />
              )
            }
          ></Route>
          <Route
            path="/app/*"
            element={
              user === null ? <AppLayout /> : <Navigate replace to="/auth" /> 
            }
          >
            <Route path="dictionary" element={user === null ? (<Dictionary />) : (<Navigate replace to="/auth" />)}></Route>
          <Route path="exercises" element={user === null ? (<Exercises />) : (<Navigate replace to="/auth" />)}></Route>
          <Route path="statistics" element={user === null ? (<Statistics />) : (<Navigate replace to="/auth" />)}></Route>
          <Route path="settings" element={user === null ? (<Settings />) : (<Navigate replace to="/auth" />)}></Route>
          <Route path="profile" element={user === null ? (<Profile />) : (<Navigate replace to="/auth" />)}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
