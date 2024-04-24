import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import { differenceInDays } from "date-fns";

import HintsMenu from "../../components/HintsMenu";
import Loader from "../../components/Loader";

import styles from "./ExerciseOne.module.scss";

import ResultModal from "../../components/ResultModal";
import Button from "../../components/Button";

import { speakText } from "../../utils/speechText";
import { correctSoundPlay } from "../../utils/correctSoundPlay";
import { wrongSoundPlay } from "../../utils/wrongSoundPlay";
import { updateUserAchivements } from "../../utils/updateUserAchivements";

import { ReactComponent as ExtraLifeIco } from "../../assets/ico/extraLife.svg";
import { ReactComponent as VoiceIco } from "../../assets/ico/voice.svg";

import {
  DictionaryWordProps,
  selectDictionaryWords,
} from "../../store/dictionaryWords/dictionaryWordsSlice";
import { useAppDispatch } from "../../store/store";
import { selectUser } from "../../store/user/userSlice";
import { selectUserInfo } from "../../store/userInfo/userInfoSlice";
import { selectOptions } from "../../store/options/optionsSlice";
import {
  fetchStatisticsData,
  selectStatisticsData,
  updateStatisticsWords,
} from "../../store/statisticsData/statisticsDataSlice";
import {
  fetchAchivements,
  selectAchivements,
} from "../../store/achivements/achivementsSlice";

export type AnswerOptionProps = {
  id: number;
  translation: string;
  isCorrect: boolean;
};

const ExerciseOne: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);
  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);
  const { dictionaryWords, status } = useSelector(selectDictionaryWords);
  const { statisticsData, status: statisticsDataStatus } =
    useSelector(selectStatisticsData);
  const { achivements, status: achivementsStatus } =
    useSelector(selectAchivements);

  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(
    null
  );

  const hints = userInfo !== null ? userInfo[0].hints : [];

  const { appOptions } = useSelector(selectOptions);

  const [correctAnswers, setCorrectAnswers] = React.useState(0);

  const [currentWord, setCurrentWord] =
    React.useState<DictionaryWordProps | null>(null);
  const [answers, setAnswers] = React.useState<AnswerOptionProps[] | []>([]);

  const [result, showResult] = React.useState(false);

  const path = window.location.pathname.split("/")[3];

  const [exercisePercent, setExercisePercent] = React.useState(10);

  const [rewardExp, setRewardExp] = React.useState(0);
  const [rewardMoney, setRewardMoney] = React.useState(0);
  const [rewardHintMoney, setRewardHintMoney] = React.useState(0);

  const [correctButton, showCorrectButton] = React.useState<null | number>(
    null
  );

  const [extraLife, setExtraLife] = React.useState(false);

  const voiceName = appOptions !== null && appOptions?.voiceActing;
  const synthesis = window.speechSynthesis;
  const voices = synthesis.getVoices();

  const newData = new Date();
  newData.setHours(0, 0, 0, 0);
  const timestamp = newData.getTime();

  const selectedVoice = voices.find((voice) => voice.name === voiceName);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnloadConfirmation = () => {
    const confirmationMessage = "Вы уверены, что хотите покинуть страницу?";
    return window.confirm(confirmationMessage);
  };

  React.useEffect(() => {
    if (status === "success") {
      dispatch(fetchStatisticsData({ userId: user!.data.id! }));
    }
  }, [status, currentWordIndex]);

  React.useEffect(() => {
    if (statisticsDataStatus === "success") {
      dispatch(fetchAchivements({ token: user!.token! }));
    }
  }, [statisticsDataStatus, user]);

  React.useEffect(() => {
    if (status === "success" && dictionaryWords.length > 0) {
      if (currentWordIndex < dictionaryWords.length) {
        setCurrentWord(dictionaryWords[currentWordIndex]);
      }
    } else {
      navigate("/app/exercises");
    }
  }, [status, currentWordIndex]);

  React.useEffect(() => {
    if (currentWord !== null) {
      if (
        path === "selectTtranslation" ||
        path === "selectListenedTtranslation" ||
        path === "selectListenedWord" ||
        path === "selectHeard"
      ) {
        speakText(
          synthesis,
          currentWord !== null ? currentWord?.word : "",
          selectedVoice
        );
      }

      const answers = generateAnswerOptions();

      if (answers) {
        setAnswers(answers);
      }
    }
  }, [currentWord]);

  const generateAnswerOptions = () => {
    if (currentWord === null) {
      return [];
    }

    const otherWords = dictionaryWords.filter(
      (word) => word.id !== currentWord.id
    );
    const randomWords = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);

    let correctTranslations: string = "";

    if (
      path === "selectTtranslation" ||
      path === "selectListenedTtranslation"
    ) {
      correctTranslations = currentWord.translates[0];
    } else if (
      path === "selectWord" ||
      path === "selectListenedWord" ||
      path === "selectHeard"
    ) {
      correctTranslations = currentWord.word;
    }

    const randomTranslations = randomWords.map((word) => ({
      id: word.id,
      translation:
        path === "selectTtranslation" || path === "selectListenedTtranslation"
          ? word.translates[0]
          : path === "selectWord" ||
            path === "selectListenedWord" ||
            path === "selectHeard"
          ? word.word
          : "",
      isCorrect: false,
    }));

    const answerOptions = [
      { id: currentWord.id, translation: correctTranslations, isCorrect: true },
      ...randomTranslations,
    ];

    return answerOptions.sort(() => Math.random() - 0.5);
  };

  const addWordToStatistics = async (time: number) => {
    if (currentWord === null) return;

    const foundData = statisticsData.find((data) => data.data === time);

    if (foundData) {
      const wordExists = foundData.words.some(
        (word) => word.word_id === currentWord.id
      );

      if (!wordExists) {
        const updatedFoundData = [
          ...foundData.words,
          { word_id: currentWord.id, word: currentWord.word },
        ];

        await axios.patch(
          `https://9854dac21e0f0eee.mokky.dev/wordsDate/${foundData.id}`,
          {
            words: updatedFoundData,
          }
        );

        dispatch(
          updateStatisticsWords({ words: updatedFoundData, data: time })
        );
      }
    } else {
      await axios.post(`https://9854dac21e0f0eee.mokky.dev/wordsDate`, {
        user_id: user!.data.id!,
        data: time,
        words: [{ word_id: currentWord.id, word: currentWord.word }],
      });

      dispatch(
        updateStatisticsWords({
          words: [{ word_id: currentWord.id, word: currentWord.word }],
          data: time,
        })
      );
    }
  };

  const datesComparison = (newData: number, answerType: boolean) => {
    if (currentWord === null) return 1;

    const comparison = differenceInDays(
      new Date(newData),
      new Date(currentWord.currentData)
    );

    if (comparison >= 5 && comparison <= 15) {
      return answerType ? 1.01 : 1.05;
    } else if (comparison > 15 && comparison <= 30) {
      return answerType ? 1.03 : 1.03;
    } else if (comparison > 30) {
      return answerType ? 1.05 : 1.01;
    } else {
      return 1;
    }
  };

  const updateWordStreak = async (percent: number) => {
    if (userInfo === null) return;

    if (percent >= 100) {
      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          learnedWords: userInfo[0].learnedWords + 1,
        }
      );

      const findAchivement = achivements.find(
        (obj) =>
          obj.type === "learnWord" && obj.value === userInfo[0].learnedWords + 1
      );

      if (findAchivement) {
        updateUserAchivements(
          findAchivement,
          userInfo !== null ? userInfo[0].achivements : [],
          userInfo !== null ? userInfo[0].id : 0
        );
      }
    }
  };

  const handleAnswerSelection = async (id: number) => {
    if (selectedAnswer !== null) return;
    if (currentWord === null) return;
    if (userInfo === null) return;

    let newRememberPercent = 1;

    let newCorrectRecognition = 0;

    let newCorrectSpelling = 0;

    let newCorrectPerception = 0;

    let newLearnPercent = 0;

    let newCorrectPronunciation = 0;

    setSelectedAnswer(id);

    await dispatch(fetchStatisticsData({ userId: user!.data.id! }));

    //добавление слова в wordsDate
    await addWordToStatistics(timestamp);

    if (id === currentWord?.id) {
      correctSoundPlay();
      setCorrectAnswers((prev) => prev + 1);

      setRewardExp((prev) => prev + (currentWord.word.length * 0.5 + 1));

      setRewardMoney((prev) => prev + (currentWord.word.length * 0.7 + 2));

      if (currentWord.learnPercent > 50) {
        setRewardHintMoney((prev) => prev + 1);
      }

      newCorrectSpelling =
        currentWord.correctSpelling < 100
          ? currentWord.correctSpelling + 2
          : 100;
      // newCorrectPronunciation =
      //   currentWord.correctPronunciation < 100 &&
      //   currentWord.correctPronunciation > 2
      //     ? currentWord.correctPronunciation + 2
      //     : currentWord.correctPronunciation >= 100
      //     ? 100
      //     : currentWord.correctPronunciation;

      newRememberPercent = datesComparison(timestamp, true);

      if (path === "selectListenedTtranslation") {
        newCorrectPerception =
          currentWord.hearing < 100 ? currentWord.hearing + 2 : 100;

        newCorrectRecognition =
          currentWord.correctRecognition < 100
            ? currentWord.correctRecognition + 1
            : 100;

        newLearnPercent =
          ((newCorrectPerception +
            currentWord.correctSpelling +
            newCorrectRecognition) /
            3) *
          newRememberPercent;
      } else if (path === "selectListenedWord") {
        newCorrectPerception =
          currentWord.hearing < 100 ? currentWord.hearing + 2 : 100;

        newCorrectRecognition =
          currentWord.correctRecognition < 100
            ? currentWord.correctRecognition + 1
            : 100;

        newLearnPercent =
          ((newCorrectPerception +
            currentWord.correctSpelling +
            newCorrectRecognition) /
            3) *
          newRememberPercent;
      } else if (path === "selectTtranslation" || path === "selectWord") {
        newCorrectRecognition =
          currentWord.correctRecognition < 100
            ? currentWord.correctRecognition + 3
            : 100;

        newLearnPercent =
          ((currentWord.hearing +
            currentWord.correctSpelling +
            newCorrectRecognition) /
            3) *
          newRememberPercent;
      } else if (path === "selectHeard") {
        newCorrectPerception =
          currentWord.hearing < 100 ? currentWord.hearing + 4 : 100;

        newLearnPercent =
          ((newCorrectPerception +
            currentWord.correctSpelling +
            currentWord.hearing) /
            3) *
          newRememberPercent;
      }
    } else {
      if (extraLife) {
        wrongSoundPlay();
        setSelectedAnswer(id);

        setTimeout(() => {
          setSelectedAnswer(null);
          setExtraLife(false);
        }, 1500);
        return;
      }

      wrongSoundPlay();

      setRewardExp((prev) => prev + 1);

      setRewardMoney((prev) => prev + 2);

      newCorrectSpelling =
        currentWord.correctSpelling < 100 && currentWord.correctSpelling > 1
          ? currentWord.correctSpelling - 1
          : currentWord.correctSpelling >= 100
          ? 100
          : currentWord.correctSpelling;

      if (path === "selectListenedTtranslation") {
        newCorrectPerception =
          currentWord.hearing < 100 && currentWord.hearing > 1 ? currentWord.hearing - 1 : currentWord.hearing;

        newCorrectRecognition =
          currentWord.correctRecognition < 100 && currentWord.correctRecognition > 0.5
            ? currentWord.correctRecognition - 0.5
            : currentWord.correctRecognition;

        newLearnPercent =
          (newCorrectPerception +
            currentWord.correctSpelling +
            newCorrectRecognition) /
          3 /
          newRememberPercent;
      } else if (path === "selectListenedWord") {
        newCorrectPerception =
          currentWord.hearing < 100 && currentWord.hearing > 1 ? currentWord.hearing - 1 : currentWord.hearing;

        newCorrectRecognition =
          currentWord.correctRecognition < 100 && currentWord.correctRecognition > 0.5
            ? currentWord.correctRecognition - 0.5
            : currentWord.correctRecognition;

        newLearnPercent =
          (newCorrectPerception +
            currentWord.correctSpelling +
            newCorrectRecognition) /
          3 /
          newRememberPercent;
      } else if (path === "selectTtranslation" || path === "selectWord") {
        newCorrectRecognition =
          currentWord.correctRecognition < 100 && currentWord.correctRecognition > 1.5
            ? currentWord.correctRecognition - 1.5
            : currentWord.correctRecognition;

        newLearnPercent =
          (currentWord.hearing +
            currentWord.correctSpelling +
            newCorrectRecognition) /
          3 /
          newRememberPercent;
      } else if (path === "selectHeard") {
        newCorrectPerception =
          currentWord.hearing < 100 && currentWord.hearing > 2 ? currentWord.hearing - 2 : currentWord.hearing;

        newLearnPercent =
          (newCorrectPerception +
            currentWord.correctSpelling +
            currentWord.hearing) /
          3 /
          newRememberPercent;
      }

      // newCorrectPronunciation =
      //   currentWord.correctPronunciation < 100 &&
      //   currentWord.correctPronunciation > 2
      //     ? currentWord.correctPronunciation - 1
      //     : currentWord.correctPronunciation >= 100
      //     ? 100
      //     : currentWord.correctPronunciation;

      newRememberPercent = datesComparison(timestamp, false);
    }

    path === "selectHeard" && showCorrectButton(null);

    await updateWordStreak(newLearnPercent);

    await axios.patch(
      `https://9854dac21e0f0eee.mokky.dev/dictionary/${currentWord.id}`,
      {
        currentData: timestamp,
        learnPercent:
          newLearnPercent > 100 ? 100 : Number(newLearnPercent.toFixed(0)),
        hearing: newCorrectPerception,
        correctSpelling: currentWord.correctSpelling,
        correctRecognition: newCorrectRecognition,
        rememberPercent: newRememberPercent,
      }
    );

    if (appOptions?.automaticallySwitchExercise) {
      setTimeout(() => {
        nextWord();
      }, 1500);
    }
  };

  const onClickHeared = (id: number, value: string) => {
    speakText(synthesis, value, selectedVoice);
    showCorrectButton(id);
  };

  const nextWord = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
    }
    setSelectedAnswer(null);

    if (currentWordIndex + 1 < dictionaryWords.length) {
      setCurrentWordIndex((prev) => prev + 1);
      setExercisePercent(
        ((currentWordIndex + 2) * 100) / dictionaryWords.length
      );
    } else {
      showResult(true);
    }
  };

  return status === "loading" && userInfoStatus === "loading" ? (
    <Loader />
  ) : (
    <div className={styles.exerciseContainer}>
      <div className={styles.exerciseBackground}>
        {result && (
          <ResultModal
            showResult={showResult}
            rewardExp={rewardExp}
            rewardMoney={rewardMoney}
            rewardHintMoney={rewardHintMoney}
            show={result}
            onClickCloseFunc={showResult}
          />
        )}

        <div className={styles.exerciseHeader}>
          <div className={styles.exerciseStatus}>
            <div className={styles.correctValue}>Correct: {correctAnswers}</div>
            <div className={styles.statusBar}>
              <div className={styles.statusLine}>
                <Line
                  percent={exercisePercent}
                  strokeWidth={6}
                  trailWidth={6}
                  trailColor="#D3D3D3"
                  strokeColor="#88b5a1"
                />
              </div>
              <div className={styles.statusValue}>
                {currentWordIndex + 1}/{dictionaryWords.length}(
                {exercisePercent}
                %)
              </div>
            </div>
          </div>
          {extraLife && (
            <div className={styles.extraLife}>
              <ExtraLifeIco />
            </div>
          )}
          <div className={styles.hintsMenu}>
            <HintsMenu
              hints={hints}
              answers={answers}
              setAnswers={setAnswers}
              setSelectedAnswer={setSelectedAnswer}
              nextWord={nextWord}
              setRewardExp={setRewardExp}
              setRewardMoney={setRewardMoney}
              extraLife={extraLife}
              setExtraLife={setExtraLife}
            />
          </div>
        </div>
        <div className={styles.wordContainer}>
          <div className={styles.wordBackground}>
            <div
              onClick={() =>
                (path === "selectTtranslation" ||
                  path === "selectListenedTtranslation" ||
                  path === "selectListenedWord" ||
                  path === "selectHeard") &&
                speakText(
                  synthesis,
                  currentWord !== null ? currentWord?.word : "",
                  selectedVoice
                )
              }
              className={styles.word}
            >
              {currentWord !== null &&
                path === "selectTtranslation" &&
                currentWord.word}
              {currentWord !== null &&
                path === "selectWord" &&
                currentWord?.translates[0]}
              {path === "selectListenedTtranslation" &&
              currentWord !== null &&
              selectedAnswer !== null
                ? currentWord.word
                : path === "selectListenedTtranslation" &&
                  currentWord !== null && <VoiceIco />}
              {path === "selectListenedWord" &&
              currentWord !== null &&
              selectedAnswer !== null
                ? currentWord?.translates[0]
                : path === "selectListenedWord" &&
                  currentWord !== null && <VoiceIco />}
              {path === "selectHeard" && <VoiceIco />}
            </div>
          </div>
          <div className={styles.translatesContainer}>
            {answers.map((obj, index) => (
              <div
                key={obj.id}
                className={`${styles.translateWord} ${
                  (selectedAnswer !== null &&
                    obj.isCorrect &&
                    !extraLife &&
                    styles.correct) ||
                  (selectedAnswer === obj.id &&
                    !obj.isCorrect &&
                    styles.incorrect) ||
                  (correctButton !== null &&
                    correctButton === obj.id &&
                    styles.checked)
                }`}
                onClick={() =>
                  path === "selectHeard"
                    ? onClickHeared(obj.id, obj.translation)
                    : handleAnswerSelection(obj.id)
                }
              >
                {path === "selectHeard" ? <VoiceIco /> : obj.translation}
              </div>
            ))}
          </div>
          {correctButton !== null && selectedAnswer === null && (
            <div
              className={styles.applyButton}
              onClick={() => handleAnswerSelection(correctButton)}
            >
              Apply
            </div>
          )}
          {!appOptions?.automaticallySwitchExercise &&
            selectedAnswer !== null && (
              <div className={styles.nextButton}>
                <Button text="Next word" onClickFunction={nextWord} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseOne;
