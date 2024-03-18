import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import VK, { Auth } from "react-vk";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/user/userSlice";

const AuthByVk = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <VK apiId={51878430} className="custom-vk-button">
      <Auth
        options={{
          onAuth: async (user: any) => {
            try {
              const { data } = await axios.post(
                "https://9854dac21e0f0eee.mokky.dev/auth",
                { name: user.first_name, email: "", password: "" }
              );
              dispatch(
                setUser({
                  token: data.token,
                  data: {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                  },
                })
              );
              localStorage.clear();
              localStorage.setItem(
                "user",
                JSON.stringify({
                  token: data.token,
                  data: {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                  },
                })
              );
              navigate("/app/dictionary");
            } catch (err: any) {
              console.log(err);
              if (err.responce.status === 401) {
                toast.error("Такой пользователь уже сущесвтует!");
              }
            }
          },
        }}
      />
    </VK>
  );
};

export default AuthByVk;