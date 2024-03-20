import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./Profile.module.scss";

import { RegisterForm } from "../../components/Registration";

import { selectUser } from "../../store/user/userSlice";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const { user } = useSelector(selectUser);
  console.log(user);

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
      // const email = values.email;
      // const password = values.password;
      // const name = values.name;
      // setIsLoading(true);
      // const { data } = await axios.post(
      //   "https://9854dac21e0f0eee.mokky.dev/register",
      //   { name, email, password }
      // );
      // console.log(data);
      // toast.success("Вы зарегистрировались!");
      // setIsLoading(false);
      // reset();
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Пользователья с такими данными уже существует!");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.profileBackground}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePhoto}></div>

        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.formRow}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              readOnly
              value={user?.data.email}
              type="email"
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="name">Username</label>
            <input name="name" readOnly value={user?.data.name} type="text" />
          </div>

          <div className={styles.editingPassRow}>
            <label htmlFor="pass">Password</label>
            {isEditing ? (
              <input
                {...register("password", {
                  required: "Поле обязательно к заполнению!",
                  minLength: {
                    value: 6,
                    message: "Пароль должен быть не менее 6 символов!",
                  },
                })}
                placeholder="Password"
                type="password"
                name="pass"
              />
            ) : (
              <input
                name="pass"
                readOnly
                type="password"
                placeholder="*********"
              />
            )}
          </div>
          {errors?.password && (
            <div className={"errorBackground"}>
              {errors?.password.message || "Error"}
            </div>
          )}
          <div>
            <button
              disabled={!isValid}
              type="submit"
            >
              {isLoading ? <ClipLoader color="white" /> : "Registration!"}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.profileAchivement}></div>
    </div>
  );
};

export default Profile;
