import React from "react";
import { useSelector } from "react-redux";

// import ModalWithScroll from "../../components/ModalWithScroll";

import styles from "./Dictionary.module.scss";

import WordBlock from "../../components/WordBlock";

import { fetchDictionaryWords, selectDictionaryWords } from "../../store/dictionaryWords/dictionaryWordsSlice";

import { selectUser, setUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/store";
import ModalAddWord from "../../components/ModalAddWord";

const Dictionary = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const { dictionaryWords, status } = useSelector(selectDictionaryWords);

  React.useEffect(() => {
    dispatch(fetchDictionaryWords({token: user!.token!, userId: user!.data.id!}));
  }, [user]);

  // const [wordPresets, setWordPresets] = React.useState([
  //   {
  //     idPresets: 1,
  //     namePresets: "Проффесии",
  //     words: [
  //       {
  //         word: "doctor",
  //         transcription: "[wɜːd]",
  //         translate: ["слово", "словечко", "известие"],
  //         tags: [{ tagId: 1 }, { tagId: 2 }],
  //       },
  //       {
  //         word: "pilot",
  //         transcription: "[test]",
  //         translate: ["тест", "испытание", "проверка"],
  //         tags: [{ tagId: 2 }],
  //       },
  //     ],
  //   },
  //   {
  //     idPresets: 2,
  //     namePresets: "Фрукты",
  //     words: [
  //       {
  //         word: "apple",
  //         transcription: "[wɜːd]",
  //         translate: ["слово", "словечко", "известие"],
  //         tags: [{ tagId: 1 }, { tagId: 2 }],
  //       },
  //       {
  //         word: "carrot",
  //         transcription: "[test]",
  //         translate: ["тест", "испытание", "проверка"],
  //         tags: [{ tagId: 2 }],
  //       },
  //       {
  //         word: "lemon",
  //         transcription: "[wɜːd]",
  //         translate: ["слово", "словечко", "известие"],
  //         tags: [{ tagId: 1 }, { tagId: 2 }],
  //       },
  //     ],
  //   },
  //   {
  //     idPresets: 3,
  //     namePresets: "Фрукты",
  //     words: [
  //       {
  //         word: "apple",
  //         transcription: "[wɜːd]",
  //         translate: ["слово", "словечко", "известие"],
  //         tags: [{ tagId: 1 }, { tagId: 2 }],
  //       },
  //       {
  //         word: "carrot",
  //         transcription: "[test]",
  //         translate: ["тест", "испытание", "проверка"],
  //         tags: [{ tagId: 2 }],
  //       },
  //       {
  //         word: "lemon",
  //         transcription: "[wɜːd]",
  //         translate: ["слово", "словечко", "известие"],
  //         tags: [{ tagId: 1 }, { tagId: 2 }],
  //       },
  //     ],
  //   },
  // ]);

  return (
    <div className={styles.background}>
      <h2>Dictionary</h2>

      <div className={styles.backgroundWords}>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "success" ? (
          dictionaryWords.length !== 0 ? (
            dictionaryWords.map((obj) => <WordBlock key={obj.id} word={obj.word} transcription={obj.transcription} translate={obj.translate} selectTagArr={obj.selectTagArr} learnPercent={obj.learnPercent} examples={obj.examples}/>)
          ) : (
            <div>
              <div>Вы еще не добавляли слов</div>
              <p>чтобы добавить слово нажмите кнопку в низу экрана</p>
            </div>
          )
        ) : (
          status === "error" && <div>Error</div>
        )}
      </div>

      {/* модальное окно добавления нового слова в словарь */}
      <ModalAddWord />

      {/* модальное окно выбора пресетов */}
      {/* <ModalWithScroll
        wordPresets={wordPresets}
        headerText={"Загрузить пресет"}
      /> */}

      <div
        className={styles.addWordButton}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <div>+</div>
      </div>
    </div>
  );
};

export default Dictionary;
