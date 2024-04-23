import React from "react";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";

// import ModalWithScroll from "../../components/ModalWithScroll";

import styles from "./Dictionary.module.scss";

import { ReactComponent as ClearIco } from "../../assets/ico/close.svg";

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
import { selectSearch, setSearch } from "../../store/search/searchSlice";
import Input from "../../components/Input";
import { fetchOptions } from "../../store/options/optionsSlice";

const Dictionary: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isAddWordOpen, setIsAddWordOpen] = React.useState(false);

  const { user } = useSelector(selectUser);

  const { paginationValue } = useSelector(selectPagination);
  const { searchValue } = useSelector(selectSearch);

  const [headerText, setHeaderText] = React.useState("");

  const [inputSearchValue, setInputSearchValue] = React.useState("");

  const { dictionaryWords, total_pages, status } = useSelector(
    selectDictionaryWords
  );

  React.useEffect(() => {
    dispatch(
      fetchDictionaryWords({
        userId: user!.data.id!,
        pagination: paginationValue,
        search: searchValue,
      })
    );
  }, [user, paginationValue, searchValue]);

  React.useEffect(() => {
    if(status === "success"){
      dispatch(fetchOptions({ userId: user!.data.id! }));
    }
  }, []);

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

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
      dispatch(setPagination(1));
    }, 700),
    [dispatch]
  );

  const onChangeInput = (value: string) => {
    setInputSearchValue(value);
    updateSearchValue(value);
  };

  const onClickClear = () => {
    setInputSearchValue("");
    dispatch(setSearch(""));
    dispatch(setPagination(1));
  };

  return (
    <div className={styles.background}>
      <div className={styles.dictionaryHeader}>
        <h2>Dictionary</h2>
        <Input
          value={inputSearchValue}
          textPlaceholder={"Search..."}
          type={"text"}
          onChangeFunction={onChangeInput}
          ico={
            inputSearchValue.length > 0 && (
              <ClearIco onClick={() => onClickClear()} />
            )
          }
        />
      </div>

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
          ) : searchValue.length !== 0 ? (
            <div>
              <div>Oops!</div>
              <p>there're no words according to these filters</p>
            </div>
          ) : (
            <div>
              <div>You haven't added the words yet!</div>
              <p>To add a word, click on the button at the bottom of the screen</p>
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
          pageIndex={paginationValue - 1}
          pageCount={total_pages}
          onChange={(index) => dispatch(setPagination(index + 1))}
        />
      )}
    </div>
  );
};

export default Dictionary;
