import React from "react";
import toast from "react-hot-toast";
import { Circle } from "rc-progress";

import styles from "./WordBlock.module.scss";

import { ReactComponent as SoundIco } from "../../assets/ico/sound.svg";

import SmallTag from "../SmallTag";
import { TagProps } from "../../store/tags/tagsSlice";
import axios from "axios";
import { deleteWord } from "../../store/dictionaryWords/dictionaryWordsSlice";
import { useAppDispatch } from "../../store/store";
import { setEditInformation } from "../../store/editWord/editWordSlice";

type WordBlockProps = {
  id: number;
  word: string;
  transcription: string;
  translates: string[];
  tags: TagProps[];
  learnPercent: number;
  examples: string[];
  setIsAddWordOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WordBlock: React.FC<WordBlockProps> = ({
  id,
  word,
  transcription,
  translates,
  tags,
  learnPercent,
  setIsAddWordOpen,
}) => {
  const dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = React.useState(false);

  const onClickDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://9854dac21e0f0eee.mokky.dev/dictionary/${id}`
      );

      dispatch(deleteWord(id));
    } catch (err: any) {
      console.log(err);
      toast.error("Error when deleting a word!");
    }
  };

  const onClickEdit = () => {
    dispatch(
      setEditInformation({
        id,
        word,
        transcription,
        translates,
        tags,
        learnPercent,
      })
    );

    setIsAddWordOpen(true);
  };

  const speakText = () => {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      synthesis.speak(utterance);
  };

  return (
    <div className={styles.backgroundWord}>
      <div className={styles.wordContent}>
        <div className={styles.wordHeader}>
          <div className={styles.wordHeaderLeft}>
            <div className={styles.soundImg}>
              <SoundIco onClick={() => speakText()}/>
            </div>
            <div>{word}</div>
            <div>{"[" + transcription + "]"}</div>
            <div onClick={() => onClickEdit()} className={styles.editImg}>
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
                    stroke="var(--tertiary-bg)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="var(--tertiary-bg)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <div className={styles.wordHeaderRight}>
            <div onClick={() => onClickDelete()} className={styles.deleteImg}>
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
                    d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                    stroke="var(--tertiary-bg)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                    stroke="var(--tertiary-bg)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.translateBlock}>
          {translates.map((obj, index) =>
            index === translates.length - 1 ? (
              <div key={index}>{obj}</div>
            ) : (
              <div key={index}>{obj},&nbsp;</div>
            )
          )}
        </div>
        <div className={styles.tagBlock}>
          <div className={styles.tags}>
            {tags.map((obj) => (
              <SmallTag key={obj.id} tagName={`#${obj.value}`} />
            ))}
          </div>
          <div className={styles.percentCircle}>
            <Circle
              percent={learnPercent}
              strokeWidth="10"
              trailWidth="7"
              strokeColor={
                learnPercent <= 25
                  ? "#bc2b2b"
                  : learnPercent <= 50
                  ? "#bc872b"
                  : learnPercent <= 75
                  ? "#bcb72b"
                  : "#2bbc99"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordBlock;
