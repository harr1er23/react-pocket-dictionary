import React from "react";
// import { useSpeechSynthesis } from "react-speech-kit";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

//styles
import styles from "./ModalAddWord.module.scss";

//assets
import { ReactComponent as SoundIco} from "../../assets/ico/sound.svg";

//components
import Input from "../Input";
import Button from "../Button";

//slices

type ModalAddWordProps = {};

const ModalAddWord: React.FC<ModalAddWordProps> = ({}) => {
  const dispatch = useDispatch();

  //контроллер состояния инпута ввода слова
  const [word, setWord] = React.useState("");
  //контроллер состояния инпута ввода перевода
  const [translateValue, setTranslateValue] = React.useState("");
  //контроллер состояния инпута ввода нового тега
  const [tagInputValue, setTagInputValue] = React.useState("");
  //контроллер состояния инпута ввода примеров
  const [example, setExample] = React.useState("");
  //контроллер состояния инпута ввода транскрипции
  const [transcription, setTranscription] = React.useState("");

  // const updateWordInputValue = React.useCallback(
  //   debounce((str) => {
  //     dispatch(setWordValue(str));
  //     //обращение к апи переводчика
  //   }, 700),
  //   []
  // );

  // const onChangeWordInput = (event) => {
  //   updateWordInputValue(event.target.value);
  //   setWord(event.target.value);
  // };

  // const updateTranscriptionInputValue = React.useCallback(
  //   debounce((str) => {
  //     dispatch(setTranscriptionValue(str));
  //   }, 700),
  //   []
  // );

  // const onChangeTranscriptionInput = (event) => {
  //   setTranscription(event.target.value);
  //   updateTranscriptionInputValue(event.target.value);
  // };

  // //массив переводов для слова
  // const [translatesWord, setTranslatesWord] = React.useState(translatesValue);

  // //массив выбранных тегов для слова
  // const [selectTagArr, setSelectTagArr] = React.useState(tagsValue);

  // //массив Добавленных примеров для слова
  // const [examples, setExamples] = React.useState(examplesValue);

  // React.useEffect(() => {
  //   dispatch(fetchUserTags());
  // }, []);

  //функции для функционала word speech
  // const { speak, voices } = useSpeechSynthesis();
  // let voice = voices[104];

  // //функция для добавления данных в массив
  // const addVariableToArr = (arrayMethod, variable, clearInputMethod, array) => {
  //   if (variable.length !== 0) {
  //     if (typeof variable === "object") {
  //       arrayMethod((prev) => [...prev, variable]);
  //     } else {
  //       if (
  //         array.length !== 0 &&
  //         array.find((obj) => obj.toLowerCase() === variable.toLowerCase())
  //       ) {
  //         clearInputMethod("");
  //       } else {
  //         arrayMethod((prev) => [...prev, variable]);
  //       }
  //     }
  //     if (clearInputMethod !== null) {
  //       clearInputMethod("");
  //     }
  //   } else {
  //     toast.error("Заполните поле");
  //   }
  // };

  // //функция замены переменной между двумя массивами
  // const replaceVariableInArr = (
  //   arrayAddMethod,
  //   addedVariable,
  //   arrayForLength,
  //   arrayRemoveMethod
  // ) => {
  //   addVariableToArr(arrayAddMethod, addedVariable, null, arrayForLength);
  //   removeVariableFromArr(arrayRemoveMethod, addedVariable);
  // };

  // //функция удаления переменной из массива
  // const removeVariableFromArr = (arrayMethod, variable) => {
  //   if (typeof variable === "object") {
  //     arrayMethod((prev) => prev.filter((obj) => obj.id !== variable.id));
  //   } else {
  //     arrayMethod((prev) =>
  //       prev.filter((obj) => obj.toLowerCase() !== variable.toLowerCase())
  //     );
  //   }
  // };

  // //функция для добавления переменной в массив при нажатии на энтер
  // const onPressEnter = (
  //   event,
  //   arrayMethod,
  //   variable,
  //   clearInputMethod,
  //   array
  // ) => {
  //   if (event.key === "Enter") {
  //     addVariableToArr(arrayMethod, variable, clearInputMethod, array);
  //   }
  // };

  // const addTagInBd = async (arrayMethod, variable, clearInputMethod, array) => {
  //   if (variable.value.length !== 0) {
  //     if (
  //       (array.length !== 0 &&
  //         array.find(
  //           (obj) => obj.value.toLowerCase() === variable.value.toLowerCase()
  //         )) ||
  //       (tags.length !== 0 &&
  //         tags.find(
  //           (obj) => obj.value.toLowerCase() === variable.value.toLowerCase()
  //         ))
  //     ) {
  //       clearInputMethod("");
  //       toast.error("Такой тег уже существует!");
  //     } else {
  //       await axios.post(process.env.REACT_APP_TAGS_KEY, variable);
  //       addVariableToArr(arrayMethod, variable, clearInputMethod, array);
  //     }
  //   } else {
  //     toast.error("Заполните поле!");
  //   }
  // };

  // const addTagInBdOnEnter = async (
  //   event,
  //   arrayMethod,
  //   variable,
  //   clearInputMethod,
  //   array
  // ) => {
  //   if (event.key === "Enter") {
  //     if (variable.value.length !== 0) {
  //       if (
  //         (array.length !== 0 &&
  //           array.find(
  //             (obj) => obj.value.toLowerCase() === variable.value.toLowerCase()
  //           )) ||
  //         (tags.length !== 0 &&
  //           tags.find(
  //             (obj) => obj.value.toLowerCase() === variable.value.toLowerCase()
  //           ))
  //       ) {
  //         clearInputMethod("");
  //         toast.error("Такой тег уже существует!");
  //       } else {
  //         await axios.post(process.env.REACT_APP_TAGS_KEY, variable);
  //         addVariableToArr(arrayMethod, variable, clearInputMethod, array);
  //       }
  //     } else {
  //       toast.error("Заполните поле!");
  //     }
  //   }
  // };

  // const editExample = (variable, arrayRemoveMethod) => {
  //   setExample("");
  //   setExample(variable);
  //   removeVariableFromArr(arrayRemoveMethod, variable);
  // };

  // //функция добавления слова в словарь
  // const addWordToDictionary = async () => {
  //   if (word.length !== 0 && translatesWord.length !== 0) {
  //     if (!dictionaryWords.find((obj) => obj.word === word)) {
  //       const { data } = await axios
  //         .post(process.env.REACT_APP_DICTIONARY_KEY, {
  //           userId: id,
  //           id: dictionaryWords.length + 1,
  //           word: word,
  //           transcription: transcription,
  //           translate: translatesWord,
  //           selectTagArr: selectTagArr,
  //           examples: examples,
  //           learPercent: 1,
  //         })
  //         .catch((error) => console.log(error));

  //       console.log(data);

  //       //очистка инпутов модального окна
  //       setWord("");
  //       setTranscription("");
  //       setTranslateValue("");
  //       setTagInputValue("");

  //       addVariableToArr(setWords, data, setWord);

  //       //уведомление об успешном добавлении
  //       toast.success("Слово добавлено в словарь!");
  //     } else {
  //       toast.error("Такое слово уже есть!");
  //     }
  //   } else {
  //     toast.error("Заполните поля с знаком *");
  //   }
  // };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className={`modal-content${" " + styles.modalContent}`}>
          <div className={`modal-header${" " + styles.modalHeader}`}>
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Добавить слово
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <Input
                value={word}
                onChangeFunction={setWord}
                textPlaceholder={"Слово*"}
                type={"text"}
              />
              <Input
                value={transcription}
                onChangeFunction={setTranscription}
                textPlaceholder={"Транскрипция"}
                type={"text"}
              />
              <Input
                value={translateValue}
                onChangeFunction={setTranslateValue}
                textPlaceholder={"Переводы*"}
                type={"text"}
                // onKeyDownFunction={(event) =>
                //   onPressEnter(
                //     event,
                //     setTranslatesWord,
                //     translateValue,
                //     setTranslateValue,
                //     translatesWord
                //   )
                // }
              />

              {/* переводы */}
              {/* <div className={styles.tagsBlock}>
              {translatesWord.map((obj) => (
                <div
                  key={obj}
                  // onClick={() => removeVariableFromArr(setTranslatesWord, obj)}
                  className={styles.tagBackground}
                >
                  {obj}
                </div>
              ))}
            </div> */}

              {/* готовые теги */}
              {/* <div className={styles.tagsBlock}>
              {userTags.map((obj) => (
                <div
                  // onClick={() =>
                  //   replaceVariableInArr(
                  //     setSelectTagArr,
                  //     obj,
                  //     selectTagArr,
                  //     setTags
                  //   )
                  // }
                  key={obj.id}
                  className={styles.existingTagBackground}
                >
                  {obj.value}
                </div>
              ))}
            </div> */}
              <Input
                value={tagInputValue}
                onChangeFunction={setTagInputValue}
                textPlaceholder={"Теги"}
                // onKeyDownFunction={(event) =>
                //   addTagInBdOnEnter(
                //     event,
                //     setSelectTagArr,
                //     {
                //       user_id: id,
                //       id: tags.length + selectTagArr.length + 1,
                //       value: tagInputValue,
                //     },
                //     setTagInputValue,
                //     selectTagArr
                //   )
                // }
                type={"text"}
              />

              {/* выбранные/добавленные теги */}
              <div className={styles.tagsBlock}>
                {/* {selectTagArr.map((obj) => (
                <div
                  // onClick={() =>
                  //   replaceVariableInArr(setTags, obj, tags, setSelectTagArr)
                  // }
                  key={obj.id}
                  className={styles.tagBackground}
                >
                  {obj.value}
                </div>
              ))} */}
              </div>

              <Input
                value={example}
                onChangeFunction={setExample}
                textPlaceholder={"Примеры"}
                // onKeyDownFunction={(event) =>
                //   onPressEnter(event, setExamples, example, setExample, examples)
                // }
                type={"text"}
              />

              <div className={styles.examplesBlock}>
                {/* {examples.map((obj) => (
                <div key={obj} className={styles.example}>
                  {obj}
                  <div
                    // onClick={() => editExample(obj, setExamples)}
                    className={styles.editImg}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div
                    // onClick={() => removeVariableFromArr(setExamples, obj)}
                    className={styles.removeImg}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="#ffffff"
                      class="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                          fill=""
                        ></path>
                        <path
                          d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                          fill=""
                        ></path>
                        <path
                          d="M328 340.8l32-31.2 348 348-32 32z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              ))} */}
              </div>
            </form>
          </div>
          <div className={`modal-footer${" " + styles.modalFooter}`}>
            <Button
              toggle="modal"
              target="#modalwithscroll"
              text={"Загрузить пресеты"}
            />
            <Button
              toggle="modal"
              data-bs-dismiss="modal"
              text={"Сохранить"}
              // onClickFunction={addWordToDictionary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddWord;
