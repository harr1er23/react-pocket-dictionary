import axios from "axios";
import React from "react";
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
          onAuth: async(user: any) => {
            console.log(user);
            const { data } = await axios.post(
                "https://9854dac21e0f0eee.mokky.dev/register",
                {name: user.first_name, email: "", password: ""}
              );
            console.log(data);
            // dispatch(setUser({
            //     token: "",
            //     data: {
            //         id: user.uid,
            //         name: user.first_name,
            //         email: "",
            //     }
            // }));
            navigate("/app/dictionary");
          },
        }}
      />
    </VK>
  );
};

export default AuthByVk;
