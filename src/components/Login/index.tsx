import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import VKConnect from "@vkontakte/vk-connect";

import "./Login.scss";

import { ReactComponent as VkontacteIco } from "../../assets/ico/vkontakte.svg";
import { ReactComponent as YandexIco } from "../../assets/ico/yandex.svg";

import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/user/userSlice";

type LoginProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

// type VkUserProps = {
//   payload: {
//     auth: number;
//     token: string;
//     ttl: number;
//     type: string;
//     user: {
//       id: number;
//       first_name: string;
//       last_name: string;
//       avatar: string;
//       phone: string;
//     };
//     uuid: string;
//     oauthProvider?: string;
//   };
// };

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<LoginForm>({
    mode: "onBlur",
  });

  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const submit: SubmitHandler<LoginForm> = async (values) => {
    try {
      const email = values.email;
      const password = values.password;
      setIsLoading(true);
      const { data } = await axios.post(
        "https://9854dac21e0f0eee.mokky.dev/auth",
        { email, password }
      );
      dispatch(
        setUser({
          data: {
            email: data.data.email,
            name: data.data.name,
            id: data.data.id,
          },
          token: data.token,
        })
      );
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      toast.success("Вы вошли в аккаунт!");
      reset();
      navigate("/adminPanel/drafts");
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Пароль или логин не верны!");
      }
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await VKConnect.send("VKWebAppGetAuthToken", {
        app_id: 51878430,
        scope: "email", // запрашиваем доступ к email
      });
      const userInfo = await VKConnect.send("VKWebAppGetUserInfo", {});
      // Теперь у вас есть токен и информация о пользователе, которые вы можете отправить на ваш сервер для аутентификации
      console.log(data);
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contact-wrapper">
      <header className="login-cta">
        <h2>Account Login</h2>
      </header>

      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Не валидная почта!",
              },
            })}
            type="text"
          />
          <span>Email</span>
        </div>
        {errors?.email && (
          <div className={"errorBackground"}>
            {errors?.email.message || "Error"}
          </div>
        )}
        <div className="form-row">
          <input
            {...register("password", {
              required: "Поле обязательно к заполнению!",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов!",
              },
            })}
            type="password"
          />
          <span>Password</span>
        </div>
        {errors?.password && (
          <div className={"errorBackground"}>
            {errors?.password.message || "Error"}
          </div>
        )}
        <div className="form-row"></div>
        <div className="form-row">
          <button disabled={!isValid} className={"registration"} type="submit">
            {isLoading ? <ClipLoader color="white" /> : "Login!"}
          </button>
        </div>

        <div className={"titles"}>
          <div className={"registration-button-title"}>
            Not a member?{" "}
            <div
              className="registration-button"
              onClick={() => setIsLogin(false)}
            >
              Signup now
            </div>
          </div>
          <div className={"forget-password"}>Forget password?</div>
        </div>
      </form>

      <div className="socials-wrapper">
        <header>
          <h2>Login with your Social Account</h2>{" "}
        </header>
        <ul>
          <li onClick={handleLogin}>
            <VkontacteIco /> Vkontakte
            {/* <Link to="/authByVk" className="facebook">
              <VkontacteIco /> Vkontakte
            </Link> */}
            {/* <a href="https://oauth.vk.com/authorize?client_id=51878430&redirect_uri=https://react-pocket-dictionary.vercel.app/auth&scope=4194304&display=page" className="facebook">
              <VkontacteIco /> Vkontakte
            </a> */}
          </li>
          <li>
            <a href="#" className="twitter">
              <YandexIco /> Yandex
            </a>
            {/* <YandexLogin
              clientId="3aa6730c2b4a42df820a424be3f221c7"
              onSuccess={responseHandler}
              onFailure={responseHandler}
            /> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
