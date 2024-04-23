import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { subDays, startOfDay } from "date-fns";

import styles from "./Exercises.module.scss";

import Loader from "../../components/Loader";
import ExerciseSettings from "../../components/ExerciseSettings";

import { ReactComponent as SetingsIco } from "../../assets/ico/settings.svg";
import { ReactComponent as LockIco } from "../../assets/ico/lock.svg";

import { useAppDispatch } from "../../store/store";
import { fetchOptions, selectOptions } from "../../store/options/optionsSlice";
import { selectUser } from "../../store/user/userSlice";
import {
  fetchDictionaryWords,
  selectDictionaryWords,
} from "../../store/dictionaryWords/dictionaryWordsSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  fetchUserInfo,
  selectUserInfo,
} from "../../store/userInfo/userInfoSlice";

const Exercises: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);
  const { status, exercisesOptions } = useSelector(selectOptions);
  const { dictionaryWords, status: wordsStatus } = useSelector(
    selectDictionaryWords
  );

  const maxWords = exercisesOptions !== null ? exercisesOptions.maxWords : 10;
  const wordsPercent =
    exercisesOptions !== null ? exercisesOptions.wordsPercent : "unlearned";
  const firstShow =
    exercisesOptions !== null ? exercisesOptions.firstShow : "random";
  const tags = exercisesOptions !== null ? exercisesOptions.tags : [];

  const [isShowSettings, setIsShowSettings] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchOptions({ userId: user!.data.id! }));
  }, []);

  React.useEffect(() => {
    if (status === "success") {
      const fetchWords = async () => {
        try {
          const currentDate = new Date();
          const sixDaysAgoDate = subDays(currentDate, 6);

          const currentTimestamp = startOfDay(currentDate).getTime();
          const sixDaysAgoTimestamp = startOfDay(sixDaysAgoDate).getTime();
          dispatch(
            fetchDictionaryWords({
              userId: user!.data.id!,
              pagination: 1,
              limit: maxWords,
              wordsPercent,
              firstShow,
              day: sixDaysAgoTimestamp,
              tags,
            })
          );
        } catch (err: any) {
          console.log(err);
        }
      };

      fetchWords();
    }
  }, [status, maxWords, wordsPercent, firstShow, tags]);

  React.useEffect(() => {
    if (wordsStatus === "success") {
      dispatch(fetchUserInfo({ id: user!.data.id! }));

      // if (dictionaryWords.length < 5) {
      //   toast.error("Few words for training! The minimum number is 5!");
      // }
    }
  }, [wordsStatus]);

  return status === "loading" &&
    wordsStatus === "loading" &&
    userInfoStatus === "loading" ? (
    <Loader />
  ) : (
    <div className={styles.exercisesBackground}>
      <div className={styles.exercisesHeader}>
        <h2>Exercises</h2>
      </div>

      <ExerciseSettings
        show={isShowSettings}
        onClickCloseFunc={setIsShowSettings}
      />

      <div className={styles.exercisesBlock}>
        <div className={styles.exercises}>
          <Link
            to={"/app/exercises/selectLernedAnswer"}
            className={styles.exercise}
          >
            <div className={styles.exerciseLeft}>
              <h4>Exercise №1</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link
            to={"/app/exercises/selectNativeAnswer"}
            className={styles.exercise}
          >
            <div className={styles.exerciseLeft}>
              <h4>Exercise №2</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          {/* <Link to={"app/exercises/3"} className={styles.exercise}>
            <div className={styles.exerciseLeft}>
              <h4>Exercise №3</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link to={"app/exercises/4"} className={styles.exercise}>
            <div className={styles.exerciseLeft}>
              <h4>Exercise №4</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link to={"app/exercises/5"} className={styles.exercise}>
            <div className={styles.exerciseLeft}>
              <h4>Exercise №5</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}>
              Lvl. 5 <LockIco />
            </div>
          </Link>
          <Link to={"app/exercises/6"} className={styles.exercise}>
            <div className={styles.exerciseLeft}>
              <h4>Exercise №6</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}>
              Lvl. 10 <LockIco />
            </div>
          </Link>
          <Link to={"app/exercises/7"} className={styles.exercise}>
            <div className={styles.exerciseLeft}>
              <h4>Exercise №7</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}>
              Lvl. 15 <LockIco />
            </div>
          </Link>
          <Link to={"app/exercises/8"} className={styles.exercise}>
            <div className={styles.exerciseLeft}>
              <h4>Exercise №8</h4>
              <p>Selected words: {dictionaryWords.length}</p>
            </div>
            <div className={styles.exerciseRigth}>
              Lvl. 20 <LockIco />
            </div>
          </Link> */}
        </div>
        <div
          onClick={() => setIsShowSettings(true)}
          className={styles.settingsButton}
        >
          <SetingsIco />
        </div>
      </div>
    </div>
  );
};

export default Exercises;
