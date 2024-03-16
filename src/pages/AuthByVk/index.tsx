import axios from "axios";
import React from "react";


import VK, { Auth } from "react-vk";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/user/userSlice";

const AuthByVk = () => {
    const dispatch = useAppDispatch();
  return (
    <VK apiId={51878430} className="custom-vk-button">
      <Auth
        options={{
          onAuth: async(user: any) => {
            const { data } = await axios.post(
                "https://9854dac21e0f0eee.mokky.dev/login",
                { id: user.uid, name: user.first_name, email: "", password: ""}
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
          },
        }}
      />
    </VK>
  );
};

export default AuthByVk;
