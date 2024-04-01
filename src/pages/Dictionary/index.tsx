import React from "react";
import { useSelector } from "react-redux";

// import ModalWithScroll from "../../components/ModalWithScroll";

import styles from "./Dictionary.module.scss";

import WordBlock from "../../components/WordBlock";
import ModalAddWord from "../../components/ModalAddWord";

import {
  fetchDictionaryWords,
  selectDictionaryWords,
} from "../../store/dictionaryWords/dictionaryWordsSlice";
import { selectUser, setUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/store";
import WordsLoading from "../../components/WordsLoading";
import { setEditInformation } from "../../store/editWord/editWordSlice";
import Pagination from "../../components/Pagination";
import {
  selectPagination,
  setPagination,
} from "../../store/pagination/paginationSlice";

const Dictionary: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isAddWordOpen, setIsAddWordOpen] = React.useState(false);

  const { user } = useSelector(selectUser);

  const { paginationValue } = useSelector(selectPagination);

  const [headerText, setHeaderText] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");

  const { dictionaryWords, total_pages, status } = useSelector(
    selectDictionaryWords
  );

  React.useEffect(() => {
    dispatch(
      fetchDictionaryWords({
        token: user!.token!,
        userId: user!.data.id!,
        pagination: paginationValue,
      })
    );
  }, [user, paginationValue]);

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

  const onClickAdd = () => {
    dispatch(
      setEditInformation({
        id: null,
        user_id: null,
        word: "",
        transcription: "",
        translates: [],
        tags: [],
        examples: [],
        learnPercent: null,
      })
    );

    setHeaderText("Add Word");
    setIsAddWordOpen(true);
  };

  return (
    <div className={styles.background}>
      <h2>Dictionary</h2>

      <div className={styles.backgroundWords}>
        {status === "loading" ? (
          <WordsLoading length={25} />
        ) : status === "success" ? (
          dictionaryWords.length !== 0 ? (
            dictionaryWords.map((obj) => (
              <WordBlock
                setIsAddWordOpen={setIsAddWordOpen}
                key={obj.id}
                id={obj.id}
                word={obj.word}
                transcription={obj.transcription}
                translates={obj.translates}
                tags={obj.tags}
                learnPercent={obj.learnPercent}
                examples={obj.examples}
                setHeaderText={setHeaderText}
              />
            ))
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
      <ModalAddWord
        isAddWordOpen={isAddWordOpen}
        setIsAddWordOpen={setIsAddWordOpen}
        dictionaryWords={dictionaryWords}
        headerText={headerText}
      />

      {/* модальное окно выбора пресетов */}
      {/* <ModalWithScroll
        wordPresets={wordPresets}
        headerText={"Загрузить пресет"}
      /> */}

      <div className={styles.addWordButton} onClick={() => onClickAdd()}>
        <div>+</div>
      </div>

      {total_pages <= 1 ? (
        " "
      ) : (
        <Pagination
          pageIndex={paginationValue-1}
          pageCount={total_pages}
          onChange={(index) => dispatch(setPagination(index+1))}
        />
      )}
    </div>
  );
};

export default Dictionary;
