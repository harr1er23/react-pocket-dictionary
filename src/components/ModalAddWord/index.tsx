import React from "react";
// import { useSpeechSynthesis } from "react-speech-kit";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";

import Modal from "react-bootstrap/Modal";

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

import {
  selectEditWord,
  setEditId,
  setEditInformation,
} from "../../store/editWord/editWordSlice";
import { selectUser } from "../../store/user/userSlice";
import {
  addNewUserTag,
  fetchTags,
  removeUserTag,
  selectTags,
  TagProps,
} from "../../store/tags/tagsSlice";
import { useAppDispatch } from "../../store/store";
import {
  addNewWord,
  deleteWord,
  DictionaryWordsProps,
} from "../../store/dictionaryWords/dictionaryWordsSlice";

//slices

type ModalAddWordProps = {
  dictionaryWords: [] | DictionaryWordsProps[];
  isAddWordOpen: boolean;
  setIsAddWordOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalAddWord: React.FC<ModalAddWordProps> = ({
  dictionaryWords,
  isAddWordOpen,
  setIsAddWordOpen,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { user_id, word, transcription, tags, translates, learnPercent } =
    useSelector(selectEditWord);
  const { tags: userTags, status } = useSelector(selectTags);

  const [isWordLoading, setIsWordLoading] = React.useState(false);
  const [isTagLoading, setTagLoading] = React.useState(false);

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
  }, [word, transcription, tags, translates]);

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

            if(searchWord.dict === undefined){
              setTranslatesWord(prev => [...prev, searchWord.trans]);
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
      } catch (err: any) {
        console.log(err);
        toast.error("Error when searching for a word!");
      }
    }, 700),
    []
  );

  const onChangeWordValue = (value: string) => {
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
      setTagLoading(true);

      if (str.length !== 0) {
        dispatch(fetchTags({ userId: user!.data.id!, tag: str }));
      }

      setTagLoading(false);
    }, 700),
    []
  );

  const onChangeTagValue = (value: string) => {
    setTagInputValue(value);
    updateTagInputValue(value);
  };

  const onClickExistingTag = ({ id, user_id, value }: TagProps) => {
    try {
      setSelectedTagValues((prev) => [...prev, { id, user_id, value }]);
      dispatch(removeUserTag(id));
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

      if (findTag.length === 0) {
        const { data } = await axios.post(
          `https://9854dac21e0f0eee.mokky.dev/tags`,
          {
            user_id: user!.data.id!,
            value: tagInputValue,
          }
        );

        setSelectedTagValues((prev) => [
          ...prev,
          { id: data.id, user_id: data.user_id, value: data.value },
        ]);
        setTagInputValue("");
      } else {
        toast.error("You already have such a tag!");
        return;
      }
    } catch (err: any) {
      console.log(err);
      toast.error("");
    }
  };

  const onEnterNewTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTag();
    }
  };

  //функции для функционала word speech
  // const { speak, voices } = useSpeechSynthesis();
  // let voice = voices[104];

  //функция добавления слова в словарь
  const addWordToDictionary = async () => {
    if (wordInputValue.length === 0 && translatesWord.length === 0) {
      toast.error("Enter a word and add it's translation!");
      return;
    }

    try {
      //проверка на наличие слова в словаре
      const findWord = dictionaryWords.find(
        (word) => word.word.toLowerCase() === wordInputValue.toLowerCase()
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
            examples: [],
            learPercent: learnPercent,
          }
        );

        dispatch(deleteWord(findWord.id));
        dispatch(
          addNewWord({
            id: findWord.id,
            user_id: user!.data.id!,
            word: wordInputValue,
            transcription: transcriptionInputValue,
            translates: translatesWord,
            tags: selectedTagValues,
            learnPercent: learnPercent,
            examples: [],
          })
        );

      } else {
        const { data } = await axios.post(
          "https://9854dac21e0f0eee.mokky.dev/dictionary",
          {
            user_id: user!.data.id!,
            word: wordInputValue,
            transcription: transcriptionInputValue,
            translates: translatesWord,
            tags: selectedTagValues,
            selectTagArr: selectedTagValues,
            examples: [],
            learPercent: 1,
          }
        );

        dispatch(
          addNewWord({
            id: data.id,
            user_id: user!.data.id!,
            word: wordInputValue,
            transcription: transcriptionInputValue,
            translates: translatesWord,
            tags: selectedTagValues,
            learnPercent: 1,
            examples: [],
          })
        );
      }

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
    setEditInformation({
      id: null,
      user_id: null,
      word: "",
      transcription: "",
      tags: [],
      translates: [],
      examples: [],
      learnPercent: 0,
    });
    setIsAddWordOpen(false);
  };

  return (
    <Modal
      show={isAddWordOpen}
      onHide={() => onClickClose()}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title>Add Word</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div>
          <Input
            value={wordInputValue}
            onChangeFunction={onChangeWordValue}
            textPlaceholder={"Слово"}
            type={"text"}
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
            {status === "loading" ? (
              <div>Loading...</div>
            ) : (
              status === "success" &&
              userTags
                .filter(
                  (obj) => !selectedTagValues.some((tag) => tag.id === obj.id)
                )
                .map((obj) => (
                  <div
                    onClick={() =>
                      onClickExistingTag({
                        id: obj.id,
                        user_id: obj.user_id,
                        value: obj.value,
                      })
                    }
                    key={obj.id}
                    className={styles.existingTagBackground}
                  >
                    {obj.value}
                  </div>
                ))
            )}
          </div>
          <Input
            value={tagInputValue}
            onChangeFunction={onChangeTagValue}
            textPlaceholder={"Теги"}
            onKeyDownFunction={(event) => onEnterNewTag(event)}
            type={"text"}
            ico={<AddIco onClick={() => addNewTag()} />}
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
                {obj.value}
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
        <Button text={"Сохранить"} onClickFunction={addWordToDictionary} />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddWord;
