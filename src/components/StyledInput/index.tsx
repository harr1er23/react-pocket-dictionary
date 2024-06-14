import React from "react";
import { useSelector } from "react-redux";

import Button from "../Button";

import styles from "./StyledInput.module.scss";

import { selectOptions } from "../../store/options/optionsSlice";

type StyledInputProps = {
  word: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  currentWordIndex: number;
  nextWord: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleAnswerSelection: (id: number, correct?: boolean) => Promise<void>;
};

const StyledInput: React.FC<StyledInputProps> = ({
  word,
  setSelectedAnswer,
  currentWordIndex,
  nextWord,
  handleAnswerSelection
}) => {
  const { appOptions } = useSelector(selectOptions);

  const [inputValue, setInputValue] = React.useState("");
  const [correct, setCorrect] = React.useState<any[] | null>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setInputValue("");
    setCorrect(null);
  }, [currentWordIndex, word]);

  React.useEffect(() => {
    setCorrect(Array(word.length).fill(null));
  }, [currentWordIndex]);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    const allowedKeys = /^[а-яА-ЯёЁa-zA-Z\s]$/;
    if (allowedKeys.test(key)) {
      const index = inputValue.length;
      if (index < word.length) {
        const newInputValue =
          inputValue.substring(0, index) +
          key.toLowerCase() +
          inputValue.substring(index + 1);
        setInputValue(newInputValue);
      }
    } else if (key === "Backspace") {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const handleCheck = () => {
    const newCorrect = inputValue.split("").map((char, index) => {
      return char === word[index];
    });
    setCorrect(newCorrect);

    const isAllCorrect = newCorrect.every((value) => value === true);

    handleAnswerSelection(1, isAllCorrect);


    // if (isAllCorrect) {
    //   console.log("Correct!");
    // } else {
    //   console.log("Error!");
    // }

    // if (appOptions?.automaticallySwitchExercise) {
    //   setTimeout(() => {
    //     nextWord();
    //   }, 1500);
    // }

    // setSelectedAnswer(1);
  };

  return (
    <div
      className={styles.inputContainer}
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
      ref={containerRef}
    >
      {word.split("").map((_, index) => (
        <div
          key={index}
          className={`${styles.letter} ${correct !== null && correct !== undefined && correct[index] !== undefined
              ? correct[index]
                ? styles.correct
                : styles.incorrect
              : ""
          }`}
        >
          {inputValue[index] || "_"}
        </div>
      ))}
      {inputValue.length === word.length && (
        <Button text="Check" onClickFunction={handleCheck} />
      )}
    </div>
  );
};

export default StyledInput;
