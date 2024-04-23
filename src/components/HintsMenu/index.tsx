import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import styles from "./HintsMenu.module.scss";

import { ReactComponent as OneAnswerIco } from "../../assets/ico/oneAnswer.svg";
import { ReactComponent as HalfAnswersIco } from "../../assets/ico/halfAnswers.svg";
import { ReactComponent as MoreTryIco } from "../../assets/ico/moreTry.svg";
import { ReactComponent as CorrectAnswerIco } from "../../assets/ico/correctAnswer.svg";

import {
  HintsProps,
  selectUserInfo,
  updateHints,
} from "../../store/userInfo/userInfoSlice";
import { useAppDispatch } from "../../store/store";
import { AnswerOptionProps } from "../../pages/ExerciseOne";
import { selectOptions } from "../../store/options/optionsSlice";
import { speakText } from "../../utils/speechText";
import { DictionaryWordProps } from "../../store/dictionaryWords/dictionaryWordsSlice";
import { correctSoundPlay } from "../../utils/correctSoundPlay";

type HintsMenuProps = {
  hints: HintsProps[];
  setAnswers: React.Dispatch<React.SetStateAction<[] | AnswerOptionProps[]>>;
  answers: [] | AnswerOptionProps[];
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  nextWord: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setRewardExp: React.Dispatch<React.SetStateAction<number>>;
  setRewardMoney: React.Dispatch<React.SetStateAction<number>>;
  extraLife: boolean;
  setExtraLife: React.Dispatch<React.SetStateAction<boolean>>;

};

const HintsMenu: React.FC<HintsMenuProps> = ({
  hints,
  answers,
  setAnswers,
  setSelectedAnswer,
  nextWord,
  setRewardMoney,
  setRewardExp,
  extraLife,
  setExtraLife
}) => {
  const dispatch = useAppDispatch();

  const { userInfo } = useSelector(selectUserInfo);
  const { appOptions } = useSelector(selectOptions);

  const [showHints, setShowHints] = useState(false);

  const [isFirstHintDisabled, setIsFirstHintDisabled] = React.useState(false);
  const [isSecondHintDisabled, setIsSecondHintDisabled] = React.useState(false);
  const [isThirdHintDisabled, setIsThirdHintDisabled] = React.useState(false);
  const [isFourthHintDisabled, setIsFourthHintDisabled] = React.useState(false);

  React.useEffect(() => {
    setIsFirstHintDisabled(false);
    setIsSecondHintDisabled(false);
    setIsThirdHintDisabled(false);
    setIsFourthHintDisabled(false);

    if (answers.length === 1) {
      setIsFirstHintDisabled(true);
      setIsSecondHintDisabled(true);
      setIsThirdHintDisabled(true);
      setIsFourthHintDisabled(true);
    } else if (answers.length === 2) {
      setIsSecondHintDisabled(true);
    }
  }, [answers]);

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  const onClickRemoveOneAnswer = async (hintsType: number) => {
    try {
      const newHints = hints.map((obj) => {
        if (obj.type === hintsType) {
          return {
            ...obj,
            value: obj.value - 1,
          };
        } else {
          return obj;
        }
      });

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${
          userInfo !== null && userInfo[0].id
        }`,
        {
          hints: newHints,
        }
      );

      dispatch(updateHints(newHints));

      const filteredObjects = answers.filter((obj) => obj.isCorrect !== true);

      const randomIndex = Math.floor(Math.random() * filteredObjects.length);
      const newObjects = answers.filter(
        (obj) => obj !== filteredObjects[randomIndex]
      );

      setAnswers(newObjects);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onClickRemoveHalfAnswers = async (hintsType: number) => {
    try {
      const newHints = hints.map((obj) => {
        if (obj.type === hintsType) {
          return {
            ...obj,
            value: obj.value - 1,
          };
        } else {
          return obj;
        }
      });

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${
          userInfo !== null && userInfo[0].id
        }`,
        {
          hints: newHints,
        }
      );

      dispatch(updateHints(newHints));

      const filteredObjects = answers.filter((obj) => obj.isCorrect !== true);

      const shuffledObjects = filteredObjects.sort(() => Math.random() - 0.5);
      const objectsToRemove = shuffledObjects.slice(0, 2);
      const newObjects = answers.filter(
        (obj) => !objectsToRemove.includes(obj)
      );
      setAnswers(newObjects);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onClickGiveOneMoreTry = async (hintsType: number) => {
    try {
      const newHints = hints.map((obj) => {
        if (obj.type === hintsType) {
          return {
            ...obj,
            value: obj.value - 1,
          };
        } else {
          return obj;
        }
      });

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${
          userInfo !== null && userInfo[0].id
        }`,
        {
          hints: newHints,
        }
      );

      dispatch(updateHints(newHints));

      setExtraLife(true);
      
    } catch (err: any) {
      console.log(err);
    }
  };

  const onClickShowCorrectAnswer = async (hintsType: number) => {
    try {
      const newHints = hints.map((obj) => {
        if (obj.type === hintsType) {
          return {
            ...obj,
            value: obj.value - 1,
          };
        } else {
          return obj;
        }
      });

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${
          userInfo !== null && userInfo[0].id
        }`,
        {
          hints: newHints,
        }
      );

      dispatch(updateHints(newHints));

      const filteredObjects = answers.find((obj) => obj.isCorrect === true);

      if (!filteredObjects) {
        return;
      }
      setSelectedAnswer(filteredObjects.id);

      setIsFirstHintDisabled(true);
      setIsSecondHintDisabled(true);
      setIsThirdHintDisabled(true);
      setIsFourthHintDisabled(true);

      correctSoundPlay();

      setRewardMoney(prev => prev + 1);
      setRewardExp(prev => prev + 1);

      if (appOptions?.automaticallySwitchExercise) {
        setTimeout(() => {
          nextWord();
        }, 2000);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div
      className={styles.hintsMenu + (showHints ? " " + styles.showHints : "")}
    >
      <div className={styles.questionMark} onClick={toggleHints}>
        ?
      </div>
      <div className={styles.hintsContainer}>
        {hints.map((obj) => (
          <div key={obj.type} className={styles.hint}>
            {obj.type === 1 ? (
              <OneAnswerIco
                className={`${
                  (isFirstHintDisabled || obj.value === 0) && styles.disabled
                }`}
                onClick={() =>
                  isFirstHintDisabled || obj.value === 0
                    ? ""
                    : onClickRemoveOneAnswer(obj.type)
                }
              />
            ) : obj.type === 2 ? (
              <HalfAnswersIco
                className={`${
                  (isSecondHintDisabled || obj.value === 0) && styles.disabled
                }`}
                onClick={() =>
                  isSecondHintDisabled || obj.value === 0
                    ? ""
                    : onClickRemoveHalfAnswers(obj.type)
                }
              />
            ) : obj.type === 3 ? (
              <MoreTryIco
                className={`${
                  (isThirdHintDisabled || extraLife || obj.value === 0) && styles.disabled
                }`}
                onClick={() =>
                  isThirdHintDisabled || extraLife || obj.value === 0
                    ? ""
                    : onClickGiveOneMoreTry(obj.type)
                }
              />
            ) : (
              obj.type === 4 && (
                <CorrectAnswerIco
                  className={`${
                    (isFourthHintDisabled || obj.value === 0) && styles.disabled
                  }`}
                  onClick={() =>
                    isFourthHintDisabled || obj.value === 0
                      ? ""
                      : onClickShowCorrectAnswer(obj.type)
                  }
                />
              )
            )}
            <div className={styles.hintsCounter}>{obj.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HintsMenu;
