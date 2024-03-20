import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { SubmitHandler, useForm } from "react-hook-form";

import { ReactComponent as VkontacteIco } from "../../assets/ico/vkontakte.svg";
import { Link } from "react-router-dom";

type RegisterProps = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RegisterForm = {
  email: string;
  name: string;
  password: string;
};

const Registration: React.FC<RegisterProps> = ({ setIsLogin }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<RegisterForm>({
    mode: "onBlur",
  });

  const submit: SubmitHandler<RegisterForm> = async (values) => {
    try {
      const email = values.email;
      const password = values.password;
      const name = values.name;
      setIsLoading(true);
      const { data } = await axios.post(
        "https://9854dac21e0f0eee.mokky.dev/register",
        { name, email, password }
      );
      console.log(data);
      toast.success("Вы зарегистрировались!");
      setIsLoading(false);
      reset();
      setIsLogin(true);
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Пользователья с такими данными уже существует!");
      }
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="contact-wrapper">
      <header className="login-cta">
        <h2>Account Registration</h2>
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
            type="text"
            {...register("name", {
              required: "Поле обязательно к заполнению!",
            })}
          />
          <span>Username</span>
        </div>
        {errors?.name && (
          <div className={"errorBackground"}>
            {errors?.name.message || "Error"}
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
            {isLoading ? <ClipLoader color="white" /> : "Registration!"}
          </button>
        </div>

        <div className={"titles"}>
          <div className={"registration-button-title"}>
            Already registered?{" "}
            <div
              className="registration-button"
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </div>
          </div>
        </div>
      </form>

      <div className="socials-wrapper">
        <header>
          <h2>Register with your Social Account</h2>{" "}
        </header>
        <ul>
          <li>
            <Link to="/registrationByVk" className="facebook">
              <VkontacteIco /> Vkontakte
            </Link>
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

export default Registration;
