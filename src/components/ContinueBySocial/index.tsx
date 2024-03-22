import React from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./ContinueBySocial.module.scss";
import "../Login/Login.scss";
import axios from "axios";

type ContionueBySocialProps = {
  data: any;
};

type SocialForm = {
  password: string;
};

const ContionueBySocial: React.FC<ContionueBySocialProps> = ({ data }) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SocialForm>({
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const submit: SubmitHandler<SocialForm> = async (values) => {
    try {
      const password = values.password;
      setIsLoading(true);
      const { data } = await axios.post(
        "https://9854dac21e0f0eee.mokky.dev/auth",
        { password }
      );
      //   dispatch(
      //     setUser({
      //       data: {
      //         email: data.data.email,
      //         name: data.data.name,
      //         id: data.data.id,
      //       },
      //       token: data.token,
      //     })
      //   );
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      toast.success("Вы вошли в аккаунт!");
      reset();
      navigate("/adminPanel/drafts");
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.continueBackground}>
      <form onSubmit={handleSubmit(submit)}>
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
      </form>
    </div>
  );
};

export default ContionueBySocial;
