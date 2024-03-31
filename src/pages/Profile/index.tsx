import React, { ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { SubmitHandler, useForm } from "react-hook-form";
import { Line } from "rc-progress";
import { Link } from "react-router-dom";

import styles from "./Profile.module.scss";

import Input from "../../components/Input";

import { ReactComponent as LightIco } from "../../assets/ico/light.svg";
import { ReactComponent as ShopIco } from "../../assets/ico/shop.svg";
import { ReactComponent as MoneyIco } from "../../assets/ico/money.svg";

import { ReactComponent as EditIco } from "../../assets/ico/pencil.svg";

import { ReactComponent as MedalOne } from "../../assets/ico/medal9.svg";
import { ReactComponent as MedalTwo } from "../../assets/ico/medal2.svg";
import { ReactComponent as MedalThree } from "../../assets/ico/medal3.svg";
import { ReactComponent as MedalFour } from "../../assets/ico/medal4.svg";
import { ReactComponent as MedalFive } from "../../assets/ico/medal5.svg";
import { ReactComponent as MedalSix } from "../../assets/ico/medal6.svg";
import { ReactComponent as MedalSeven } from "../../assets/ico/medal7.svg";
import { ReactComponent as MedalEight } from "../../assets/ico/medal8.svg";
import { ReactComponent as MedalNine } from "../../assets/ico/medal9.svg";
import { ReactComponent as MedalTen } from "../../assets/ico/medal10.svg";
import { ReactComponent as MedalEleven } from "../../assets/ico/medal11.svg";

import { selectUser, setUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/store";
import {
  fetchUserInfo,
  selectUserInfo,
  addUserAchivements,
  addUserCoins,
  addUserHintsCoins,
} from "../../store/userInfo/userInfoSlice";
import {
  fetchAchivements,
  selectAchivements,
} from "../../store/achivements/achivementsSlice";
import Loader from "../../components/Loader";

type ProfileForm = {
  email: string;
  username: string;
  password: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUser);
  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);
  const { achivements, status: achivementsStatus } =
    useSelector(selectAchivements);

  React.useEffect(() => {
    dispatch(fetchUserInfo({ id: user!.data.id!, token: user!.token! }));
  }, [user]);

  React.useEffect(() => {
    if (userInfoStatus === "success") {
      dispatch(fetchAchivements({ token: user!.token! }));
    }
  }, [userInfoStatus, user]);

  const [isEditPassword, setIsEditPassword] = React.useState(false);
  const [isEditName, setIsEditName] = React.useState(false);
  const [isEditEmail, setIsEditEmail] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = React.useState(false);

  const userPhoto = user!.data.imageUrl!;
  const experience = userInfo !== null ? userInfo[0].experience : 0;
  const level = userInfo !== null ? userInfo[0].level : 0;
  const learnedWords = userInfo !== null ? userInfo[0].learnedWords : 0;
  const hintsMoney = userInfo !== null ? userInfo[0].hintsMoney : 0;
  const money = userInfo !== null ? userInfo[0].money : 0;
  const userAchivements = userInfo !== null ? userInfo[0].achivements : [];

  const strokeColor =
    experience <= 25
      ? "#bc2b2b"
      : experience <= 50
      ? "#bc872b"
      : experience <= 75
      ? "#bcb72b"
      : "#2bbc99";

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm<ProfileForm>({
    mode: "onBlur",
  });

  const submit: SubmitHandler<ProfileForm> = async (values) => {
    const email = values.email;
    const username = values.username;
    const lastPassword = values.currentPassword;
    const newPassword = values.newPassword;
    const confirmPassword = values.confirmPassword;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    if (lastPassword) {
      try {
        await axios.post(`https://9854dac21e0f0eee.mokky.dev/auth`, {
          email: user?.data.email,
          password: lastPassword && lastPassword,
        });
      } catch (err: any) {
        console.log(err);
        toast.error("The previous password is'nt correct!");
        return;
      }
    }

    try {
      const { data } = await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/users/${user?.data.id}`,
        {
          email: email && email,
          name: username && username,
          password: confirmPassword && confirmPassword,
        }
      );

      const { data: newUser } = await axios.post(
        "https://9854dac21e0f0eee.mokky.dev/auth",
        {
          email: email ? email : user?.data.email,
          password: confirmPassword ? confirmPassword : data.password,
        }
      );

      dispatch(
        setUser({
          data: {
            email: newUser.data.email,
            name: newUser.data.name,
            id: newUser.data.id,
            level: newUser.data.level,
            experience: newUser.data.experience,
            imageUrl: newUser.data.imageUrl,
          },
          token: newUser.token,
        })
      );

      const value = localStorage.getItem("user");
      if (typeof value === "string") {
        const userLocal = JSON.parse(value);

        localStorage.setItem(
          "user",
          JSON.stringify({
            data: {
              email: email ? email : userLocal.data.email,
              name: username ? username : userLocal.data.name,
              id: userLocal.data.id,
              level: userLocal.data.level,
              experience: userLocal.data.experience,
              imageUrl: newUser.data.imageUrl,
            },
            token: newUser.token,
          })
        );
      }

      toast.success("The information has been updated successfully!");
      setIsEditName(false);
      setIsEditPassword(false);
      setIsEditEmail(false);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Error uploading data!");
    }
  };

  const clickGetReward = async (
    rewardType: "coins" | "hints",
    revardValue: number,
    achId: number
  ) => {
    if (userInfo === null) {
      return;
    }

    const newAchivements = userInfo[0].achivements.map((obj) => {
      if (obj.achivement_id === achId) {
        return {
          ...obj,
          accepted: true,
        };
      } else {
        return obj;
      }
    });

    if (rewardType === "coins") {
      dispatch(addUserCoins(revardValue));
    } else {
      dispatch(addUserHintsCoins(revardValue));
    }

    dispatch(addUserAchivements(achId));

    await axios.patch(
      `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
      {
        money: rewardType === "coins" ? money + revardValue : money,
        hintsMoney:
          rewardType === "hints" ? hintsMoney + revardValue : hintsMoney,
        achivements: newAchivements,
      }
    );
  };

  const onClickUploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files === null) {
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      setIsUploadingPhoto(true);
      const { data } = await axios.post(
        "https://9854dac21e0f0eee.mokky.dev/uploads",
        formData
      );

      const { data: userData } = await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/users/${user?.data.id}`,
        {
          imageUrl: data.url,
        }
      );

      console.log(userData);

      dispatch(
        setUser({
          token: user?.token,
          data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            imageUrl: userData.imageUrl,
          },
        })
      );
      localStorage.clear();
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: user?.token,
          data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            imageUrl: userData.imageUrl,
          },
        })
      );
      setIsUploadingPhoto(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Error during the uploading photo!");
    }
  };

  return userInfoStatus === "loading" ? (
    <Loader />
  ) : userInfoStatus === "success" ? (
    <div className={styles.profileBackground}>
      <div className={styles.experience}>
        <div className={styles.leftBar}>
          <div className={styles.experienceLevel}>
            <div className={styles.levelValue}>{level}</div>
            <div className={styles.medalIco}>
              {level > 0 && level <= 10 ? (
                <MedalOne />
              ) : level > 10 && level <= 20 ? (
                <MedalTwo />
              ) : level > 20 && level <= 30 ? (
                <MedalThree />
              ) : level > 30 && level <= 40 ? (
                <MedalFour />
              ) : level > 40 && level <= 50 ? (
                <MedalFive />
              ) : level > 50 && level <= 60 ? (
                <MedalSix />
              ) : level > 60 && level <= 70 ? (
                <MedalSeven />
              ) : level > 70 && level <= 80 ? (
                <MedalEight />
              ) : level > 80 && level <= 90 ? (
                <MedalNine />
              ) : level > 90 && level <= 100 ? (
                <MedalTen />
              ) : (
                level > 100 && <MedalEleven />
              )}
            </div>
          </div>
          <div className={styles.experienceBar}>
            <div>
              <Line
                percent={experience}
                strokeWidth={4}
                strokeColor={strokeColor}
              />
            </div>
            <div>{100 - experience} exp. points left</div>
          </div>
        </div>
        <div className={styles.rightBar}>
          <div className={styles.hints}>
            {hintsMoney} <LightIco />
          </div>
          <div className={styles.money}>
            {money} <MoneyIco />
          </div>
          <Link to="/app/shop" className={styles.shopButton}>
            <ShopIco />
          </Link>
        </div>
      </div>

      <div className={styles.profileHeader}>
        <h2>Profile Info</h2>
        <div className={styles.profileContent}>
          <div className={styles.profilePhoto}>
            {isUploadingPhoto ? (
              <ClipLoader color="var(--third-bg)" />
            ) : (
              <>
                <img src={userPhoto} alt="Profile Photo" />
                <label htmlFor="fileInput" className={styles.addPhotoButton}>
                  +
                </label>
                <input
                  onChange={(event) => onClickUploadPhoto(event)}
                  type="file"
                  id="fileInput"
                />
              </>
            )}
          </div>

          <form className={styles.profileInfo} onSubmit={handleSubmit(submit)}>
            <div className={styles.formRow}>
              <div className={styles.formInput}>
                <label htmlFor={"userName"}>User Name</label>
                <Input
                  readOnly={!isEditName}
                  inputName={"userName"}
                  autofocus={isEditName}
                  type={"text"}
                  ico={
                    !isEditName && (
                      <EditIco
                        onClick={() => setIsEditName(true)}
                        className={styles.editImg}
                      />
                    )
                  }
                  textPlaceholder="NickName..."
                  content={{
                    ...register("username", {
                      required: "Поле обязательно к заполнению!",
                    }),
                  }}
                  defaultValue={user?.data.name}
                />
              </div>
            </div>
            {errors?.username && (
              <div className={"errorBackground"}>
                {errors?.username.message || "Error"}
              </div>
            )}

            <div className={styles.formRow}>
              <div className={styles.formInput}>
                <label htmlFor={"email"}>Email</label>
                <Input
                  inputName={"email"}
                  autofocus={isEditEmail}
                  readOnly={!isEditEmail}
                  type={"email"}
                  ico={
                    !isEditEmail && (
                      <EditIco
                        onClick={() => setIsEditEmail(true)}
                        className={styles.editImg}
                      />
                    )
                  }
                  content={{
                    ...register("email", {
                      required: "Поле обязательно к заполнению!",
                    }),
                  }}
                  textPlaceholder="Email..."
                  defaultValue={user?.data.email}
                />
              </div>
            </div>
            {errors?.email && (
              <div className={"errorBackground"}>
                {errors?.email.message || "Error"}
              </div>
            )}

            {isEditPassword ? (
              <>
                <div className={styles.formRow}>
                  <div className={styles.formInput}>
                    <label htmlFor={"currentPassword"}>Current Password</label>
                    <Input
                      autofocus={isEditPassword}
                      inputName={"currentPassword"}
                      type={"password"}
                      content={{
                        ...register("currentPassword", {
                          required: "Поле обязательно к заполнению!",
                        }),
                      }}
                      textPlaceholder="Last Password..."
                    />
                  </div>
                </div>

                {errors?.currentPassword && (
                  <div className={"errorBackground"}>
                    {errors?.currentPassword.message || "Error"}
                  </div>
                )}

                <div className={styles.formRow}>
                  <div className={styles.formInput}>
                    <label htmlFor={"newPassword"}>New Password</label>
                    <Input
                      inputName={"newPassword"}
                      type={"password"}
                      content={{
                        ...register("newPassword", {
                          required: "Поле обязательно к заполнению!",
                        }),
                      }}
                      textPlaceholder="New Password..."
                    />
                  </div>
                </div>

                {errors?.newPassword && (
                  <div className={"errorBackground"}>
                    {errors?.newPassword.message || "Error"}
                  </div>
                )}

                <div className={styles.formRow}>
                  <div className={styles.formInput}>
                    <label htmlFor={"confirmPassword"}>ConfirmPassword</label>
                    <Input
                      inputName={"confirmPassword"}
                      type={"password"}
                      content={{
                        ...register("confirmPassword", {
                          required: "Поле обязательно к заполнению!",
                          validate: (value) =>
                            value === getValues("newPassword") ||
                            "Passwords must match!",
                        }),
                      }}
                      textPlaceholder="Confirm New Password..."
                    />
                  </div>
                </div>

                {errors?.confirmPassword && (
                  <div className={"errorBackground"}>
                    {errors?.confirmPassword.message || "Error"}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.formRow}>
                <div className={styles.formInput}>
                  <label htmlFor={"password"}>Password</label>
                  <Input
                    inputName={"password"}
                    readOnly={true}
                    ico={
                      !isEditPassword && (
                        <EditIco
                          onClick={() => setIsEditPassword(true)}
                          className={styles.editImg}
                        />
                      )
                    }
                    type={"password"}
                    textPlaceholder="*******"
                  />
                </div>
              </div>
            )}

            <button
              className={styles.saveInfoButton}
              disabled={!isValid}
              type="submit"
            >
              {isLoading ? <ClipLoader color="white" /> : "Save"}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.profileAchivement}>
        <h2>Achivements</h2>
        <div className={styles.achivementsList}>
          {achivementsStatus === "loading" ? (
            <div>Loading</div>
          ) : (
            achivementsStatus === "success" &&
            achivements.map((obj) => {
              const userAchievement = userAchivements.find(
                (ach) => ach.achivement_id === obj.achivement_id
              );

              return (
                <div
                  key={obj.achivement_id}
                  style={{
                    backgroundColor: userAchivements.some(
                      (ach) => ach.achivement_id === obj.achivement_id
                    )
                      ? ""
                      : "rgba(175, 175, 175, 0.285)",
                  }}
                  className={styles.achivementBlock}
                >
                  <div className={styles.achivementsIco}>
                    <img src={obj.imgUrl} alt="achivementsIco" />
                  </div>
                  <div className={styles.achivementsInfo}>
                    <h5>{obj.name}</h5>
                    <div className={styles.achivementText}>{obj.text}</div>
                    <div className={styles.achivementValue}>
                      {learnedWords <= obj.value ? learnedWords : obj.value} /{" "}
                      {obj.value}
                    </div>
                    {userAchievement && (
                      <button
                        disabled={userAchievement.accepted}
                        className={styles.achivementButton}
                        onClick={() =>
                          clickGetReward(
                            userAchievement.rewardType,
                            userAchievement.cost,
                            userAchievement.achivement_id
                          )
                        }
                      >
                        {userAchievement.accepted
                          ? `Received ${userAchievement.cost}`
                          : `Get ${userAchievement.cost}`}
                        {userAchievement.rewardType === "coins" ? (
                          <MoneyIco />
                        ) : (
                          <LightIco />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  ) : (
    <>Erorr...</>
  );
};

export default Profile;
