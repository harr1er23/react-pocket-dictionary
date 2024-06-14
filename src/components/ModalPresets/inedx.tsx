import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";
import Modal from "react-bootstrap/Modal";

import styles from "./ModalPresets.module.scss";

import Button from "../Button";
import Loader from "../Loader";
import DownloadButton from "../DownloadButton";

import { getCurrentData } from "../../utils/getCurrentData";

import { useAppDispatch } from "../../store/store";
import { fetchPresets, selectPresets } from "../../store/presets/presetsSlice";
import { selectUser } from "../../store/user/userSlice";
import {
  fetchDictionaryWords,
  selectDictionaryWords,
} from "../../store/dictionaryWords/dictionaryWordsSlice";
import {
  addNewUserTag,
  fetchTags,
  selectTags,
  TagProps,
} from "../../store/tags/tagsSlice";
import toast from "react-hot-toast";
import { addPreset, selectUserInfo } from "../../store/userInfo/userInfoSlice";

type ModalPresetsProps = {
  isModalPresetsOpen: boolean;
  setIsModalPresetsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closePresetsModal: () => void;
};

type newWordArrayProps = {
  user_id: number;
  word: string;
  transcription: string;
  translates: string;
  tags: TagProps[];
  addedData: number;
  currentData: number;
  examples: never[];
  learnPercent: number;
  hearing: number;
  correctSpelling: number;
  correctPronunciation: number;
  correctRecognition: number;
  rememberPercent: number;
};

const ModalPresets: React.FC<ModalPresetsProps> = ({
  isModalPresetsOpen,
  setIsModalPresetsOpen,
  closePresetsModal,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { userInfo } = useSelector(selectUserInfo);
  const { presets, status } = useSelector(selectPresets);
  const { tags } = useSelector(selectTags);
  const { dictionaryWords } = useSelector(selectDictionaryWords);

  const [isLoading, setIsLoading] = React.useState<null | number>(null);

  React.useEffect(() => {
    dispatch(fetchPresets({ token: user!.token! }));
  }, [user]);

  const onClickClose = () => {
    setIsModalPresetsOpen(false);
  };

  const createNewTag = async (tag: string) => {
    const findTag = tags.find(
      (obj) => obj.value.toLowerCase() === tag.toLowerCase()
    );

    console.log(tags, tag);

    if (!findTag) {
      const { data } = await axios.post<TagProps>(
        "https://9854dac21e0f0eee.mokky.dev/tags",
        {
          user_id: user!.data.id!,
          value: tag,
        }
      );

      dispatch(
        addNewUserTag({ user_id: user!.data.id!, value: tag, id: data.id })
      );
      return data;
    } else {
      return findTag;
    }
  };

  const filterPresetsByWords = async (id: number) => {
    const presetWords = presets.find((obj) => obj.id === id)!.words!;
    const currentData = getCurrentData();
    let newArray = [];

    let tags: TagProps[] | [] = [];
    const tag = await createNewTag(presetWords[0].tags[0]);
    tags = [...tags, tag];

    newArray = presetWords
      .filter((obj) => {
        return !dictionaryWords.find(
          (word) => word.word.toLowerCase() === obj.word.toLowerCase()
        );
      })
      .map((obj) => ({
        user_id: user!.data.id!,
        word: obj.word,
        transcription: obj.transcription,
        translates: obj.translates,
        tags: tags,
        addedData: currentData,
        currentData: currentData,
        examples: [],
        learnPercent: 0,
        hearing: 0,
        correctSpelling: 0,
        correctPronunciation: 0,
        correctRecognition: 0,
        rememberPercent: 1,
      }));

    return newArray;
  };

  const addPresetToDictionary = async (words: newWordArrayProps[]) => {
    try {
      if (userInfo === null) return;
      for (const obj of words) {
        await new Promise<void>((resolve) => {
          setTimeout(async () => {
            await axios.post(
              "https://9854dac21e0f0eee.mokky.dev/dictionary",
              obj
            );
            resolve(); // Вызываем resolve без аргументов
          }, 100); // Отправка запроса каждую секунду (1000 миллисекунд)
        });
      }

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          wordsAdded: userInfo[0].wordsAdded + words.length,
        }
      );

      dispatch(fetchDictionaryWords({ userId: user!.data.id!, pagination: 1 }));
    } catch (err: any) {
      console.log(err);
      toast.error("Error during adding presets to user dictionary!");
    }
  };

  const downloadPresset = async (idPreset: number) => {
    if (userInfo === null) return;

    setIsLoading(idPreset);

    await axios.patch(
      `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
      {
        presets: [...userInfo[0].presets, idPreset],
      }
    );

    dispatch(addPreset(idPreset));

    const newWordArray: newWordArrayProps[] = await filterPresetsByWords(
      idPreset
    );

    await addPresetToDictionary(newWordArray);

    setIsLoading(null);
  };

  return status === "loading" ? (
    <Loader />
  ) : status === "success" ? (
    <Modal
      show={isModalPresetsOpen}
      onHide={() => onClickClose()}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title>Download presets</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.presetsBlockBackground}>
          {presets.map((obj) => (
            <div key={obj.id} className={styles.presetBackground}>
              <div className={styles.leftBlock}>
                <h4>{obj.presetName}</h4>
                <p>Word count: {obj.words.length}</p>
              </div>
              <div className={styles.rightBlock}>
                {isLoading === obj.id ? (
                  <ClipLoader color="white" />
                ) : (
                  <DownloadButton
                    onClickFunction={downloadPresset}
                    isAdded={
                      userInfo !== null && userInfo[0].presets.includes(obj.id)
                    }
                    idPresset={obj.id}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button onClickFunction={closePresetsModal} text={"Back"} />
      </Modal.Footer>
    </Modal>
  ) : (
    <div>Error</div>
  );
};

export default ModalPresets;
