import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import styles from "./Exercise.module.scss";

import Modal from "react-bootstrap/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Button from "../Button";
import {
  changeExercisSettings,
  selectOptions,
} from "../../store/options/optionsSlice";
import { useAppDispatch } from "../../store/store";
import {
  addNewUserTag,
  fetchTags,
  removeUserTag,
  selectTags,
  TagProps,
} from "../../store/tags/tagsSlice";
import { selectUser } from "../../store/user/userSlice";

type ExerciseSettingsProps = {
  show: boolean;
  onClickCloseFunc: (value: boolean) => void;
};

type MaxWordsProps = {
  maxWords: 0 | 10 | 20 | 30 | 40 | 50 | 100;
};

type FirstShowProps = {
  firstShow:
    | { type: "random"; name: "Random" }
    | {
        type: "addedLong";
        name: "Added long ago";
      }
    | {
        type: "addedRecently";
        name: "Recently Added";
      }
    | {
        type: "averageLearned";
        name: "Average Learned";
      }
    | {
        type: "almostLearned";
        name: "Almost Learned";
      };
};

const ExerciseSettings: React.FC<ExerciseSettingsProps> = ({
  show,
  onClickCloseFunc,
}) => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { id, exercisesOptions } = useSelector(selectOptions);
  const { tags: userTags, status } = useSelector(selectTags);

  const maxWordsValue =
    exercisesOptions !== null ? exercisesOptions.maxWords : 5;
  const wordsPercentValue =
    exercisesOptions !== null ? exercisesOptions.wordsPercent : "all";
  const firstShowValue =
    exercisesOptions !== null ? exercisesOptions.firstShow : "random";
  const tagsValue = exercisesOptions !== null ? exercisesOptions.tags : [];

  const [maxWords, setMaxWords] = React.useState(maxWordsValue);
  const [wordsPercent, setWordsPercent] = React.useState(wordsPercentValue);
  const [firstShow, setFirstShow] = React.useState(firstShowValue);
  const [tags, setTags] = React.useState<TagProps[] | []>(tagsValue);

  React.useEffect(() => {
    dispatch(fetchTags({ userId: user!.data.id! }));
  }, []);

  const setSettings = async () => {
    try {
      await axios.patch(`https://9854dac21e0f0eee.mokky.dev/settings/${id}`, {
        exercisesOptions: {
          maxWords: maxWords,
          wordsPercent: wordsPercent,
          firstShow: firstShow,
          tags,
        },
      });

      dispatch(
        changeExercisSettings({
          firstShow,
          wordsPercent,
          maxWords,
          tags,
        })
      );

      onClickCloseFunc(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Error during updating settings!");
    }
  };

  const handleChangeMaxWords = (event: SelectChangeEvent) => {
    setMaxWords(Number(event.target.value) as 10 | 20 | 30 | 40 | 50 | 100);
  };

  const handleChangeWordsPercent = (event: SelectChangeEvent) => {
    setWordsPercent(
      event.target.value as "all" | "averageLearned" | "almostLearned"
    );
  };

  const handleChangeFirstShow = (event: SelectChangeEvent) => {
    setFirstShow(
      event.target.value as
        | "random"
        | "addedLong"
        | "addedRecently"
        | "averageLearned"
        | "almostLearned"
    );
  };

  const onClickExistingTag = ({ id, user_id, value }: TagProps) => {
    setTags((prev) => [...prev, { id, user_id, value }]);
    dispatch(removeUserTag(id));
  };

  const removeSelectedTag = async ({ id, user_id, value }: TagProps) => {
    const newTagArr = tags.filter((obj) => obj.id !== id);

    if (!newTagArr) {
      return;
    }

    setTags(newTagArr);
    dispatch(addNewUserTag({ id, user_id, value }));
  };

  return (
    <Modal
      show={show}
      onHide={() => onClickCloseFunc(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title>Exercises settings</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.filterBlock}>
          <FormControl
            className={styles.filterRow}
            sx={{ minWidth: 200 }}
            size="small"
          >
            <InputLabel id="maxWords-label">Number of words</InputLabel>
            <Select
              labelId="maxWords-label"
              id="maxWords"
              value={String(maxWords)}
              fullWidth
              onChange={handleChangeMaxWords}
              label="Number of words"
            >
              <MenuItem value={10}>10 words</MenuItem>
              <MenuItem value={20}>20 words</MenuItem>
              <MenuItem value={30}>30 words</MenuItem>
              <MenuItem value={40}>40 words</MenuItem>
              <MenuItem value={50}>50 words</MenuItem>
              <MenuItem value={100}>100 words</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            className={styles.filterRow}
            sx={{ minWidth: 200 }}
            size="small"
          >
            <InputLabel id="wordsPercent-label">Learning stage</InputLabel>
            <Select
              labelId="wordsPercent-label"
              id="wordsPercent"
              value={wordsPercent}
              onChange={handleChangeWordsPercent}
              fullWidth
              label="Learning stage"
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"averageLearned"}>Average Learned</MenuItem>
              <MenuItem value={"almostLearned"}>Almost Learned</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            className={styles.filterRow}
            sx={{ minWidth: 200 }}
            size="small"
          >
            <InputLabel id="firstShow-label">Show it first</InputLabel>
            <Select
              labelId="firstShow-label"
              id="firstShow"
              value={firstShow}
              onChange={handleChangeFirstShow}
              fullWidth
              label="Show it first"
            >
              <MenuItem value={"random"}>Random</MenuItem>
              <MenuItem value={"addedLong"}>Added long ago</MenuItem>
              <MenuItem value={"addedRecently"}>Recently Added</MenuItem>
              <MenuItem value={"averageLearned"}>Average Learned</MenuItem>
              <MenuItem value={"almostLearned"}>Almost Learned</MenuItem>
            </Select>
          </FormControl>

          <div className={styles.userTags}>
            <h6>Your tags:</h6>
            <div className={styles.tags}>
              <div className={styles.tagsBlock}>
                {status === "success" &&
                  userTags
                    .filter((obj) => !tags.some((tag) => tag.id === obj.id))
                    .map((obj) => (
                      <div
                        key={obj.id}
                        onClick={() =>
                          onClickExistingTag({
                            id: obj.id,
                            user_id: obj.user_id,
                            value: obj.value,
                          })
                        }
                        className={styles.existingTagBackground}
                      >
                        {obj.value}
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className={styles.selectedTags}>
            <h6>Selected tags:</h6>
            <div className={styles.tags}>
              <div className={styles.tagsBlock}>
                {tags.map((obj) => (
                  <div key={obj.id} className={styles.existingTagBackground}>
                    <div>{obj.value}</div>
                    <div
                      className={styles.deleteButton}
                      onClick={() =>
                        removeSelectedTag({
                          id: obj.id,
                          user_id: obj.user_id,
                          value: obj.value,
                        })
                      }
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button text={"Apply"} onClickFunction={setSettings} />
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseSettings;
