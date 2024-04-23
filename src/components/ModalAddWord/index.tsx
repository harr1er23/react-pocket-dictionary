import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { format, parse, getTime } from "date-fns";

//styles
import styles from "./ModalAddWord.module.scss";

//assets
import { ReactComponent as SoundIco } from "../../assets/ico/sound.svg";
import { ReactComponent as EditIco } from "../../assets/ico/edit.svg";
import { ReactComponent as DeleteIco } from "../../assets/ico/close.svg";
import { ReactComponent as AddIco } from "../../assets/ico/add.svg";

//components
import Input from "../Input";
import Button from "../Button";
import AlertModal from "../AlertModal";
import Modal from "react-bootstrap/Modal";

//slices
import { selectEditWord } from "../../store/editWord/editWordSlice";
import { selectUser } from "../../store/user/userSlice";
import {
  addNewUserTag,
  fetchTags,
  removeUserTag,
  selectTags,
  setTags,
  TagProps,
} from "../../store/tags/tagsSlice";
import { useAppDispatch } from "../../store/store";
import {
  DictionaryWordProps,
  fetchDictionaryWords,
  selectDictionaryWords
} from "../../store/dictionaryWords/dictionaryWordsSlice";
import {
  AchivementsProps,
  fetchAchivements,
  selectAchivements,
} from "../../store/achivements/achivementsSlice";
import {
  fetchUserInfo,
  selectUserInfo,
} from "../../store/userInfo/userInfoSlice";
import {
  selectPagination
} from "../../store/pagination/paginationSlice";
import { updateUserAchivements } from "../../utils/updateUserAchivements";

type ModalAddWordProps = {
  dictionaryWords: [] | DictionaryWordProps[];
  isAddWordOpen: boolean;
  setIsAddWordOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerText?: string;
};

const ModalAddWord: React.FC<ModalAddWordProps> = ({
  isAddWordOpen,
  setIsAddWordOpen,
  headerText,
}) => {
  const dispatch = useAppDispatch();

  const { dictionaryWords, total_items } = useSelector(selectDictionaryWords);

  const { user } = useSelector(selectUser);
  const {
    user_id,
    word,
    transcription,
    tags,
    translates,
    learnPercent,
    currentData,
    hearing,
    correctSpelling,
    correctRecognition,
    rememberPercent,
  } = useSelector(selectEditWord);
  const { tags: userTags, status } = useSelector(selectTags);
  const { achivements, status: achivementsStatus } =
    useSelector(selectAchivements);
  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);

  console.log(learnPercent)

  const { paginationValue } = useSelector(selectPagination);

  const userInfoId = userInfo !== null ? userInfo[0].id : 0;
  const userAchivemets = userInfo !== null ? userInfo[0].achivements : [];
  const tagsAdded = userInfo !== null ? userInfo[0].tagsAdded : 0;
  const wordsAdded = userInfo !== null ? userInfo[0].wordsAdded : 0;

  const [isWordLoading, setIsWordLoading] = React.useState(false);
  const [isTagLoading, setTagLoading] = React.useState(false);
  const [showAlertDeletingTag, setShowAlertDeletingTag] = React.useState(false);
  const [deletingTagId, setDeletingTagId] = React.useState<null | number>(null);

  //контроллер состояния инпута ввода слова
  const [wordInputValue, setWordInputValue] = React.useState(word);
  //контроллер состояния инпута ввода перевода
  const [translateInputValue, setTranslateInputValue] = React.useState("");

  //контроллер состояния инпута ввода транскрипции
  const [transcriptionInputValue, setTranscriptionInputValue] =
    React.useState(transcription);

  //контроллер состояния инпута ввода нового тега
  const [tagInputValue, setTagInputValue] = React.useState("");

  //контроллер состояния инпута ввода примеров
  // const [exampleInputValue, setExampleInputValue] = React.useState("");

  //массив переводов для слова
  const [translatesWord, setTranslatesWord] = React.useState(translates);

  //массив выбранных тегов для слова
  const [selectedTagValues, setSelectedTagValues] = React.useState(tags);

  //массив Добавленных примеров для слова
  // const [examplesValues, setExamplesValues] = React.useState(examples);

  React.useEffect(() => {
    setWordInputValue(word);
    setTranscriptionInputValue(transcription);
    setTranslatesWord(translates);
    setSelectedTagValues(tags);

    dispatch(setTags([]));
  }, [word, transcription, tags, translates]);

  React.useEffect(() => {
    dispatch(fetchUserInfo({ id: user!.data.id!}));
  }, [user]);

  React.useEffect(() => {
    if (userInfoStatus === "success") {
      dispatch(fetchAchivements({ token: user!.token! }));
    }
  }, [userInfoStatus, user]);

  const clearAllData = () => {
    setWordInputValue("");
    setTranslateInputValue("");
    setTranscriptionInputValue("");
    setTagInputValue("");

    setTranslatesWord([]);
    setSelectedTagValues([]);
  };

  const updateWordInputValue = React.useCallback(
    debounce(async (str: string) => {
      try {
        if (str.length !== 0) {
          const { data } = await axios.get(
            `https://9854dac21e0f0eee.mokky.dev/dictionary?word=${str.toLowerCase()}`
          );

          if (data.length !== 0) {
            setWordInputValue(data[0].word);
            setTranscriptionInputValue(data[0].transcription);
            setTranslatesWord(data[0].translates);
          } else {
            const encodedParams = new URLSearchParams();
            encodedParams.set("from", "en");
            encodedParams.set("to", "ru");
            encodedParams.set("text", `${str}`);

            const options = {
              method: "POST",
              url: "https://aibit-translator.p.rapidapi.com/api/v1/translator/text",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key":
                  "6432a24c33msh30cc218a7560888p160cd7jsndca0d5af37eb",
                "X-RapidAPI-Host": "aibit-translator.p.rapidapi.com",
              },
              data: encodedParams,
            };

            const { data: searchWord } = await axios.request(options);

            if (searchWord.dict === undefined) {
              setTranslatesWord((prev) => [...prev, searchWord.trans]);
              return;
            }

            const allTerms = searchWord.dict
              .reduce((accumulator: string[], currentObject: any) => {
                return accumulator.concat(currentObject.terms);
              }, [])
              .slice(0, 5);

            setTranslatesWord(allTerms);
          }
        }
        setIsWordLoading(false);
      } catch (err: any) {
        console.log(err);
        toast.error("Error when searching for a word!");
      }
    }, 700),
    []
  );

  const onChangeWordValue = (value: string) => {
    setIsWordLoading(true);
    updateWordInputValue(value);
    setWordInputValue(value);
  };

  const addTranslate = () => {
    const findTranslate = translatesWord.find(
      (obj) => obj === translateInputValue
    );

    if (findTranslate) {
      toast.error("You have already added such a translation!");
      return;
    }

    setTranslatesWord((prev) => [...prev, translateInputValue]);
    setTranslateInputValue("");
  };

  const onEnterTranslate = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTranslate();
    }
  };

  const removeTranslate = (value: string) => {
    const newTranslateArray = translatesWord.filter((obj) => obj !== value);
    setTranslatesWord(newTranslateArray);
  };

  const updateTagInputValue = React.useCallback(
    debounce(async (str: string) => {
      if (str.length !== 0) {
        dispatch(fetchTags({ userId: user!.data.id!, tag: str }));

        setTagLoading(false);
      }
    }, 700),
    []
  );

  const onChangeTagValue = (value: string) => {
    setTagLoading(true);
    setTagInputValue(value);
    updateTagInputValue(value);
  };

  const onClickExistingTag = ({ id, user_id, value }: TagProps) => {
    try {
      setSelectedTagValues((prev) => [...prev, { id, user_id, value }]);
      dispatch(removeUserTag(id));
      setTagInputValue("");
    } catch (err: any) {
      console.log(err);
      toast.error("Error when adding a tag!");
    }
  };

  const removeSelectedTag = ({ id, user_id, value }: TagProps) => {
    const newTagArr = selectedTagValues.filter((obj) => obj.id !== id);

    if (!newTagArr) {
      return;
    }

    setSelectedTagValues(newTagArr);

    if (tagInputValue.length !== 0) {
      dispatch(addNewUserTag({ id, user_id, value }));
    }
  };

  const addNewTag = async () => {
    try {
      const { data: findTag } = await axios.get(
        `https://9854dac21e0f0eee.mokky.dev/tags?user_id=${user!.data
          .id!}&value=${tagInputValue}`
      );

      if (findTag.length !== 0) {
        toast.error("You already have such a tag!");
        return;
      }

      const { data } = await axios.post(
        `https://9854dac21e0f0eee.mokky.dev/tags`,
        {
          user_id: user!.data.id!,
          value: tagInputValue,
        }
      );

      const { data: allUserTags } = await axios.get(
        `https://9854dac21e0f0eee.mokky.dev/tags?user_id=${user!.data.id!}`
      );

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfoId}`,
        {
          tagsAdded: allUserTags.length,
        }
      );

      setSelectedTagValues((prev) => [
        ...prev,
        { id: data.id, user_id: data.user_id, value: data.value },
      ]);
      setTagInputValue("");

      const findAchivement = achivements.find(
        (obj) => obj.type === "addTag" && obj.value === allUserTags.length
      );

      if (findAchivement) {
        updateUserAchivements(findAchivement, userAchivemets, userInfoId);
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Error during tag creation!");
    }
  };

  const onEnterNewTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTag();
    }
  };

  //функция добавления слова в словарь
  const addWordToDictionary = async () => {
    if (wordInputValue.length === 0 && translatesWord.length === 0) {
      toast.error("Enter a word and add it's translation!");
      return;
    }

    try {
      //проверка на наличие слова в словаре
      const findWord = dictionaryWords.find(
        (obj) => obj.word.toLowerCase() === wordInputValue.toLowerCase()
      );

      if (findWord) {
        const resp = await axios.patch(
          `https://9854dac21e0f0eee.mokky.dev/dictionary/${findWord.id}`,
          {
            user_id: user!.data.id!,
            word: wordInputValue,
            transcription: transcriptionInputValue,
            translates: translatesWord,
            tags: selectedTagValues,
            currentData: findWord.currentData,
            examples: [],
            learnPercent: findWord.learnPercent,
            hearing: findWord.hearing,
            correctSpelling: findWord.correctSpelling,
            correctRecognition: findWord.correctRecognition,
            rememberPercent: findWord.rememberPercent,
          }
        );
      } else {
        const currentData = getDataToStamp();

        await axios.post("https://9854dac21e0f0eee.mokky.dev/dictionary", {
          user_id: user!.data.id!,
          word: wordInputValue,
          transcription: transcriptionInputValue,
          translates: translatesWord,
          tags: selectedTagValues,
          currentData: currentData,
          examples: [],
          learnPercent: 1,
          hearing: 1,
          correctSpelling: 1,
          correctRecognition: 1,
          rememberPercent: 1,
        });

        await axios.patch(
          `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfoId}`,
          {
            wordsAdded: total_items + 1,
          }
        );
      }

      const findAchivement = achivements.find(
        (obj) => obj.type === "addWord" && obj.value === total_items + 1
      );

      if (findAchivement) {
        updateUserAchivements(findAchivement, userAchivemets, userInfoId);
      }

      dispatch(
        fetchDictionaryWords({
          userId: user!.data.id!,
          pagination: paginationValue,
        })
      );

      clearAllData();
      setIsAddWordOpen(false);

      //уведомление об успешном добавлении
      toast.success("The word has been added to the dictionary!");
    } catch (err: any) {
      console.log(err);
      toast.error("");
    }
  };

  const onClickClose = () => {
    setIsAddWordOpen(false);
  };

  const onClickDeleteExistingTag = (id: number) => {
    setShowAlertDeletingTag(true);
    setDeletingTagId(id);
  };

  const deleteExistingTag = async () => {
    try {
      const { data } = await axios.get(
        `https://9854dac21e0f0eee.mokky.dev/dictionary?user_id=${user!.data
          .id!}&tags.id=${deletingTagId}`
      );

      if (data.length !== 0) {
        toast.error("Error deleting! This tag is linked to words!");
        setShowAlertDeletingTag(false);
        setDeletingTagId(null);
        return;
      }

      await axios.delete(
        `https://9854dac21e0f0eee.mokky.dev/tags/${deletingTagId}`
      );

      dispatch(removeUserTag(deletingTagId));

      setDeletingTagId(null);
      setShowAlertDeletingTag(false);
      toast.success("The tag was deleted successfully!");
    } catch (err: any) {
      console.log(err);
      toast.error("Error deleting an existing tag!");
      setShowAlertDeletingTag(false);
    }
  };

  const getDataToStamp = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Установка времени на полночь
    return currentDate.getTime();
  };

  return (
    <>
      {showAlertDeletingTag && (
        <AlertModal
          show={showAlertDeletingTag}
          onClickCloseFunc={setShowAlertDeletingTag}
          bodyContent={"Are you sure you want to delete this tag?"}
          footerContent={
            <>
              <Button text={"Delete"} onClickFunction={deleteExistingTag} />
            </>
          }
          headerText={"Attention!"}
        />
      )}

      <Modal
        show={isAddWordOpen}
        onHide={() => onClickClose()}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title>{headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <div>
            <Input
              value={wordInputValue}
              onChangeFunction={onChangeWordValue}
              textPlaceholder={"Слово"}
              type={"text"}
              loading={isWordLoading}
            />
            <Input
              value={transcriptionInputValue}
              onChangeFunction={setTranscriptionInputValue}
              textPlaceholder={"Транскрипция"}
              type={"text"}
            />
            <Input
              value={translateInputValue}
              onChangeFunction={setTranslateInputValue}
              textPlaceholder={"Переводы"}
              type={"text"}
              onKeyDownFunction={(event) => onEnterTranslate(event)}
              ico={<AddIco onClick={() => addTranslate()} />}
            />

            {/* переводы */}
            <div className={styles.tagsBlock}>
              {translatesWord.map((obj) => (
                <div
                  key={obj}
                  onClick={() => removeTranslate(obj)}
                  className={styles.tagBackground}
                >
                  {obj}
                </div>
              ))}
            </div>

            {/* готовые теги */}
            <div className={styles.tagsBlock}>
              {status === "success" &&
                userTags
                  .filter(
                    (obj) => !selectedTagValues.some((tag) => tag.id === obj.id)
                  )
                  .map((obj) => (
                    <div key={obj.id} className={styles.existingTagBackground}>
                      <div
                        onClick={() =>
                          onClickExistingTag({
                            id: obj.id,
                            user_id: obj.user_id,
                            value: obj.value,
                          })
                        }
                      >
                        {obj.value}
                      </div>
                      <div
                        className={styles.deleteButton}
                        onClick={() => onClickDeleteExistingTag(obj.id)}
                      >
                        x
                      </div>
                    </div>
                  ))}
            </div>
            <Input
              value={tagInputValue}
              onChangeFunction={onChangeTagValue}
              textPlaceholder={"Теги"}
              onKeyDownFunction={(event) => onEnterNewTag(event)}
              type={"text"}
              ico={<AddIco onClick={() => addNewTag()} />}
              loading={isTagLoading}
            />

            {/* выбранные/добавленные теги */}
            <div className={styles.tagsBlock}>
              {selectedTagValues.map((obj) => (
                <div
                  onClick={() =>
                    removeSelectedTag({
                      id: obj.id,
                      user_id: obj.user_id,
                      value: obj.value,
                    })
                  }
                  key={obj.id}
                  className={styles.tagBackground}
                >
                  #{obj.value}
                </div>
              ))}
            </div>

            {/* <Input
                value={exampleInputValue}
                onChangeFunction={setExampleInputValue}
                textPlaceholder={"Примеры"}
                // onKeyDownFunction={(event) =>
                //   onPressEnter(event, setExamples, example, setExample, examples)
                // }
                type={"text"}
              /> */}

            {/* <div className={styles.examplesBlock}>
                {examplesValues.map((obj) => (
                  <div key={obj} className={styles.example}>
                    {obj}
                    <div
                      // onClick={() => editExample(obj, setExamples)}
                      className={styles.editImg}
                    >
                      <EditIco />
                    </div>
                    <div
                      // onClick={() => removeVariableFromArr(setExamples, obj)}
                      className={styles.removeImg}
                    >
                      <DeleteIco />
                    </div>
                  </div>
                ))}
              </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button text={"Загрузить пресеты"} />
          <Button
            disabled={
              wordInputValue.length === 0 || translatesWord.length === 0
            }
            text={"Сохранить"}
            onClickFunction={addWordToDictionary}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddWord;
