import React from "react";


import VK, { Auth } from "react-vk";

const AuthByVk = () => {
  return (
    <VK apiId={51878430} className="custom-vk-button">
      <Auth
        options={{
          onAuth: (user: any) => {
            console.log(user);
          },
        }}
      />
    </VK>
  );
};

export default AuthByVk;
