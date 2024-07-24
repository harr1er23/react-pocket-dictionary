import React from "react";
import { useSelector } from "react-redux";
import { subDays, startOfDay } from "date-fns";

import styles from "./Exercises.module.scss";

import Loader from "../../components/Loader";
import ExerciseSettings from "../../components/ExerciseSettings";

import { ReactComponent as SetingsIco } from "../../assets/ico/settings.svg";

import { useAppDispatch } from "../../store/store";
import { fetchOptions, selectOptions } from "../../store/options/optionsSlice";
import { selectUser } from "../../store/user/userSlice";
import {
  fetchDictionaryWords,
  selectDictionaryWords,
} from "../../store/dictionaryWords/dictionaryWordsSlice";
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
  const [isDisabled, setIsDisabled] = React.useState(true);

  const currentDate = new Date();
  const sixDaysAgoDate = subDays(currentDate, 6);

  const sixDaysAgoTimestamp = startOfDay(sixDaysAgoDate).getTime();

  React.useEffect(() => {
    dispatch(fetchOptions({ userId: user!.data.id! }));
    dispatch(fetchUserInfo({ id: user!.data.id! }));
  }, []);

  React.useEffect(() => {
    if (status === "success") {
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
    }
  }, []);

  React.useEffect(() => {
    setIsDisabled(dictionaryWords.length < 10);
  }, [dictionaryWords]);

  return status === "loading" &&
    wordsStatus === "loading" &&
    userInfoStatus === "loading" ? (
    <Loader />
  ) : status === "success" &&
    wordsStatus === "success" &&
    userInfoStatus === "success" ? (
    <div className={styles.exercisesBackground}>
      <div className={styles.exercisesHeader}>
        <h2>Exercises</h2>

        <div
          onClick={() => setIsShowSettings(true)}
          className={styles.settingsButton}
        >
          <SetingsIco />
        </div>
      </div>

      <ExerciseSettings
        show={isShowSettings}
        onClickCloseFunc={setIsShowSettings}
      />

      <div className={styles.exercisesBlock}>
        <div className={styles.exercises}>
          <Link
            to={isDisabled ? "#" : "/app/exercises/selectTranslation"}
            className={`${styles.exercise} ${
              isDisabled ? styles.disabled : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <div className={styles.exerciseLeft}>
              <h4>Translation search</h4>
              <div className={styles.exersiceNotice}>
                You are shown a word, and you need to choose its correct
                translation
              </div>
              <p>
                {isDisabled
                  ? "Choose 10 words or more"
                  : `Selected words: ${dictionaryWords.length}`}
              </p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link
            to={isDisabled ? "#" : "/app/exercises/selectWord"}
            className={`${styles.exercise} ${
              isDisabled ? styles.disabled : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <div className={styles.exerciseLeft}>
              <h4>Word search</h4>
              <div className={styles.exersiceNotice}>
                You are shown the translation of a word, and you need to select
                that word
              </div>
              <p>
                {isDisabled
                  ? "Choose 10 words or more"
                  : `Selected words: ${dictionaryWords.length}`}
              </p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link
            to={isDisabled ? "#" : "/app/exercises/selectListenedTranslation"}
            className={`${styles.exercise} ${
              isDisabled ? styles.disabled : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <div className={styles.exerciseLeft}>
              <h4>Translation search by listening</h4>
              <div className={styles.exersiceNotice}>
                A word will be voiced to you and you will need to choose its
                translation.
              </div>
              <p>
                {isDisabled
                  ? "Choose 10 words or more"
                  : `Selected words: ${dictionaryWords.length}`}
              </p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link
            to={isDisabled ? "#" : "/app/exercises/selectListenedWord"}
            className={`${styles.exercise} ${
              isDisabled ? styles.disabled : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <div className={styles.exerciseLeft}>
              <h4>Word search by listening</h4>
              <div className={styles.exersiceNotice}>
                A word will be voiced to you and you will need to select it from
                a list of other words
              </div>
              <p>
                {isDisabled
                  ? "Choose 10 words or more"
                  : `Selected words: ${dictionaryWords.length}`}
              </p>
            </div>
            {/* <div className={styles.exerciseRigth}>
              Lvl. 5 <LockIco />
            </div> */}
          </Link>
          <Link
            to={isDisabled ? "#" : "/app/exercises/writeWord"}
            className={`${styles.exercise} ${
              isDisabled ? styles.disabled : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <div className={styles.exerciseLeft}>
              <h4>Write word</h4>
              <div className={styles.exersiceNotice}>
                You are shown the translation of a word, and you need to write
                this word without errors
              </div>
              <p>
                {isDisabled
                  ? "Choose 10 words or more"
                  : `Selected words: ${dictionaryWords.length}`}
              </p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
          <Link
            to={isDisabled ? "#" : "/app/exercises/writeTranslation"}
            className={`${styles.exercise} ${
              isDisabled ? styles.disabled : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            <div className={styles.exerciseLeft}>
              <h4>Write translation</h4>
              <div className={styles.exersiceNotice}>
                You are shown a word and you need to write its translation
                correctly
              </div>
              <p>
                {isDisabled
                  ? "Choose 10 words or more"
                  : `Selected words: ${dictionaryWords.length}`}
              </p>
            </div>
            <div className={styles.exerciseRigth}></div>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>Error</div>
  );
};

export default Exercises;
