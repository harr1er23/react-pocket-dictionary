import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import VK, { Auth } from "react-vk";

import { useAppDispatch } from "../../store/store";

const AuthByVk: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <VK apiId={51878430} className="custom-vk-button">
      <Auth
        options={{
          onAuth: async (user: any) => {
            try {
              console.log(user);
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
