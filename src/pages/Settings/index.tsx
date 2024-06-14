import React from "react";

import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import styles from "./Settings.module.scss";
import { useAppDispatch } from "../../store/store";
import {
  changeAppShowTranscription,
  changeAppSwitchLevelMode,
  changeLearnedLanguage,
  changeNativeLanguage,
  changeVoiceName,
  fetchOptions,
  selectOptions,
} from "../../store/options/optionsSlice";
import { selectUser } from "../../store/user/userSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[200],
    "&:hover": {
      backgroundColor: alpha(green[200], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[200],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const Settings: React.FC = ({}) => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);
  const { id, appOptions, status } = useSelector(selectOptions);

  const transcriptionsChecked =
    appOptions !== null && appOptions.showTransciption;
  const levelSwitchChecked =
    appOptions !== null && appOptions.automaticallySwitchExercise;
  const voiceName =
    appOptions !== null ? appOptions.voiceActing : "Google US English";
  const studyLanguage =
    appOptions !== null ? appOptions.learnedLanguage : "English";
  const nativeLanguage =
    appOptions !== null ? appOptions.nativeLanguage : "English";

  React.useEffect(() => {
    dispatch(fetchOptions({ userId: user!.data.id! }));
  }, []);

  const handleTranscriptionsChange = async () => {
    try {
      await axios.patch(`https://9854dac21e0f0eee.mokky.dev/settings/${id}`, {
        appOptions: {
          ...appOptions,
          showTransciption: !transcriptionsChecked,
        },
      });

      dispatch(changeAppShowTranscription());
    } catch (err: any) {
      console.log(err);
      toast.error("Error during updating settings!");
    }
  };

  const handleLevelSwitchChange = async () => {
    try {
      await axios.patch(`https://9854dac21e0f0eee.mokky.dev/settings/${id}`, {
        appOptions: {
          ...appOptions,
          automaticallySwitchExercise: !levelSwitchChecked,
        },
      });

      dispatch(changeAppSwitchLevelMode());
    } catch (err: any) {
      console.log(err);
      toast.error("Error during updating settings!");
    }
  };

  const handleChangeVoice = async (event: SelectChangeEvent) => {
    try {
      await axios.patch(`https://9854dac21e0f0eee.mokky.dev/settings/${id}`, {
        appOptions: {
          ...appOptions,
          voiceActing: event.target.value,
        },
      });

      dispatch(changeVoiceName(event.target.value));
    } catch (err: any) {
      console.log(err);
      toast.error("Error during updating settings!");
    }
  };

  const handleChangeStudyLanguage = async (event: SelectChangeEvent) => {
    try {
      await axios.patch(`https://9854dac21e0f0eee.mokky.dev/settings/${id}`, {
        appOptions: {
          ...appOptions,
          learnedLanguage: event.target.value,
        },
      });

      dispatch(changeLearnedLanguage(event.target.value));
    } catch (err: any) {
      console.log(err);
      toast.error("Error during updating settings!");
    }
  };

  const handleChangeNativeLanguage = async (event: SelectChangeEvent) => {
    try {
      await axios.patch(`https://9854dac21e0f0eee.mokky.dev/settings/${id}`, {
        appOptions: {
          ...appOptions,
          nativeLanguage: event.target.value,
        },
      });

      dispatch(changeNativeLanguage(event.target.value));
    } catch (err: any) {
      console.log(err);
      toast.error("Error during updating settings!");
    }
  };

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className={styles.settingsBackground}>
      <div className={styles.settingsHeader}>
        <h2>Settings</h2>
      </div>
      <div className={styles.settingsTop}>
        <div className={styles.settingsRow}>
          <div className={styles.rowTop}>
            <h5>Disable transcription</h5>
            <p>Disable the display of transcription in words</p>
          </div>
          <GreenSwitch
            {...label}
            checked={transcriptionsChecked}
            onChange={handleTranscriptionsChange}
          />
        </div>
        <div className={styles.settingsRow}>
          <div className={styles.rowTop}>
            <h5>Study language</h5>
            <p>Change the language of study</p>
          </div>
          <div className={styles.filterParameter}>
            <FormControl sx={{ minWidth: 150 }}  size="small">
              <InputLabel id="studyLanguage-label">Study language</InputLabel>
              <Select
                labelId="studyLanguage-label"
                id="studyLanguage"
                value={studyLanguage}
                onChange={handleChangeStudyLanguage}
                autoWidth
                label="Study language"
              >
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Russian"}>Russian</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={styles.settingsRow}>
          <div className={styles.rowTop}>
            <h5>Native language</h5>
            <p>Choose your native language</p>
          </div>
          <div className={styles.filterParameter}>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="nativeLanguage-label">Native Language</InputLabel>
              <Select
                labelId="nativeLanguage-label"
                id="nativeLanguage"
                value={nativeLanguage}
                onChange={handleChangeNativeLanguage}
                autoWidth
                label="Native Language"
              >
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Russian"}>Russian</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={styles.settingsRow}>
          <div className={styles.rowTop}>
            <h5>Voice acting</h5>
            <p>Select the voice acting heads</p>
          </div>
          <div className={styles.filterParameter}>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="voice-label">Voice</InputLabel>
              <Select
                labelId="voice-label"
                id="voice"
                value={voiceName}
                onChange={handleChangeVoice}
                autoWidth
                label="Voice"
              >
                <MenuItem value={"Google US English"}>
                  Google US English
                </MenuItem>
                <MenuItem value={"Google UK English Female"}>
                  Google UK English Female
                </MenuItem>
                <MenuItem value={"Google UK English Male"}>
                  Google UK English Male
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={styles.settingsRow}>
          <div className={styles.rowTop}>
            <h5>Automatically scroll</h5>
            <p>Automatically scroll through tasks</p>
          </div>
          <GreenSwitch
            {...label}
            checked={levelSwitchChecked}
            onChange={handleLevelSwitchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
