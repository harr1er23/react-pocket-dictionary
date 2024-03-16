import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { ReactComponent as VkontacteIco } from "../../assets/ico/vkontakte.svg";

import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/user/userSlice";

type RegisterProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Registration: React.FC<RegisterProps> = ({ setIsLogin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const onClickRegistration = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setIsLoading(true);
      event?.preventDefault();
      const { data } = await axios.post(
        "https://9854dac21e0f0eee.mokky.dev/register",
        { name, email, password }
      );
      toast.success("Вы зарегистрировались!");
      setIsLoading(false);
      setIsLogin(true);
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Пользователья с такими данными уже существует!");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <header className="login-cta">
        <h2>Account Registration</h2>
      </header>

      <form>
        <div className="form-row">
          <input
            type="text"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <span>Email</span>
        </div>
        <div className="form-row">
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <span>Username</span>
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
            onClick={(event) => onClickRegistration(event)}
            type="submit"
          >
            {isLoading ? <ClipLoader color="white" /> : "Registration!"}
          </button>
        </div>

        <div className={"registration-button-title"}>
          Already registered?{" "}
          <div className="registration-button" onClick={() => setIsLogin(true)}>
            Sign In
          </div>
        </div>
      </form>

      {/* <div className="socials-wrapper">
        <header>
          <h2>Register with your Social Account</h2>{" "}
        </header>
        <ul>
        <li>
            <a href="#" className="facebook">
            <VkontacteIco/> Vkontakte
            </a>
          </li>
          <li>
            <a href="#" className="twitter">
            <VkontacteIco/> Yandex
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Registration;
