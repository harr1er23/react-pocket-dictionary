import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Circle } from "rc-progress";

//styles
import styles from "./WordBlock.module.scss";

import { ReactComponent as SoundIco } from "../../assets/ico/sound.svg";
import { ReactComponent as EditIco } from "../../assets/ico/edit.svg";
import { ReactComponent as DeleteIco } from "../../assets/ico/delete.svg";

//components
import Button from "../Button";
import SmallTag from "../SmallTag";
import AlertModal from "../AlertModal";

//slices
import { TagProps } from "../../store/tags/tagsSlice";
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
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
};

const WordBlock: React.FC<WordBlockProps> = ({
  id,
  word,
  transcription,
  translates,
  tags,
  learnPercent,
  setIsAddWordOpen,
  setHeaderText
}) => {
  const dispatch = useAppDispatch();

  const [showAlertDeletingWord, setShowAlertDeletingWord] =
    React.useState(false);

  const onClickDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://9854dac21e0f0eee.mokky.dev/dictionary/${id}`
      );

      dispatch(deleteWord(id));
      setShowAlertDeletingWord(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Error when deleting a word!");
      setShowAlertDeletingWord(false);
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

    setHeaderText("Edit Word");

    setIsAddWordOpen(true);
  };

  const speakText = () => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    synthesis.speak(utterance);
  };

  return (
    <>
      {showAlertDeletingWord && (
        <AlertModal
          show={showAlertDeletingWord}
          onClickCloseFunc={setShowAlertDeletingWord}
          bodyContent={"Are you sure you want to delete this word?"}
          footerContent={
            <>
              <Button text={"Delete"} onClickFunction={onClickDelete} />
            </>
          }
          headerText={"Attention!"}
        />
      )}

      <div className={styles.backgroundWord}>
        <div className={styles.wordContent}>
          <div className={styles.wordHeader}>
            <div className={styles.wordHeaderLeft}>
              <div className={styles.soundImg}>
                <SoundIco onClick={() => speakText()} />
              </div>
              <div>{word}</div>
              <div>{"[" + transcription + "]"}</div>
              <div onClick={() => onClickEdit()} className={styles.editImg}>
                <EditIco />
              </div>
            </div>
            <div className={styles.wordHeaderRight}>
              <div
                onClick={() => setShowAlertDeletingWord(true)}
                className={styles.deleteImg}
              >
                <DeleteIco />
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
              <div className={styles.learnPercent}>{learnPercent}%</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordBlock;
