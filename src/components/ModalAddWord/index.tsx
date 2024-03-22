import React from "react";
// import { useSpeechSynthesis } from "react-speech-kit";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

//styles
import styles from "./ModalAddWord.module.scss";

//assets
import sound from "../../assets/ico/sound.png";

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
  const [transcription, setTranscription] = React.useState('');

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
            <Input
              value={word}
              onChangeFunction={setWord}
              textPlaceholder={"Слово*"}
              type={"text"}
              svgSrc={
                <svg
                  // onClick={() =>
                  //   word.length !== 0
                  //     ? speak({ text: word, voice })
                  //     : toast.error("Вы не ввели слово")
                  // }
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
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z"
                      fill="#fff"
                    ></path>{" "}
                    <path
                      d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z"
                      fill="#fff"
                    ></path>{" "}
                    <path
                      d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z"
                      fill="#fff"
                    ></path>{" "}
                  </g>
                </svg>
              }
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
              svgSrc={
                <svg
                  // onClick={() =>
                  //   addVariableToArr(
                  //     setTranslatesWord,
                  //     translateValue,
                  //     setTranslateValue,
                  //     translatesWord
                  //   )
                  // }
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
                    {" "}
                    <path
                      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              }
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
              svgSrc={
                <svg
                  // onClick={() =>
                  //   addTagInBd(
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
                    {" "}
                    <path
                      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              }
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
              svgSrc={
                <svg
                  // onClick={() =>
                  //   addVariableToArr(setExamples, example, setExample, examples)
                  // }
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
                    {" "}
                    <path
                      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              }
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
