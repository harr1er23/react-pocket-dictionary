import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

import { ReactComponent as VkontacteIco } from "../../assets/ico/vkontakte.svg";

import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/user/userSlice";

type LoginProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const onClickLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setIsLoading(true);
      event?.preventDefault();
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
      navigate("/adminPanel/drafts");
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Пароль или логин не верны!");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <header className="login-cta">
        <h2>Account Login</h2>
      </header>

      <form>
        <div className="form-row">
          <input
            type="text"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <span>Username or Email</span>
        </div>
        <div className="form-row">
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span>Password</span>
        </div>
        <div className="form-row"></div>
        <div className="form-row">
          <button
            className={"registration"}
            onClick={(event) => onClickLogin(event)}
            type="submit"
          >
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
          <li>
            <a href="#" className="facebook">
              <VkontacteIco /> Vkontakte
            </a>
          </li>
          <li>
            <a href="#" className="twitter">
              <VkontacteIco /> Yandex
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
