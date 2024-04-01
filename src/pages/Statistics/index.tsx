import React from "react";
import { useSelector } from "react-redux";
import styles from "./Statistics.module.scss";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { format, parse, getTime } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useAppDispatch } from "../../store/store";
import { DictionaryWordProps } from "../../store/dictionaryWords/dictionaryWordsSlice";
import { selectUser } from "../../store/user/userSlice";
import {
  fetchUserInfo,
  selectUserInfo,
} from "../../store/userInfo/userInfoSlice";
import {
  fetchStatisticsData,
  selectStatisticsData,
} from "../../store/statisticsData/statisticsDataSlice";
import Loader from "../../components/Loader";
import axios from "axios";

Chart.register(...registerables);

export const dataRadar = {
  labels: ["Perception by ear", "Spelling", "Word recognition"],
  datasets: [
    {
      label: "Language Skills Chart",
      data: [0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
      fill: true,
      borderWidth: 2,
    },
  ],
};

type StatisticsProps = {
  day: string;
  words: number;
};

const Statisctics = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);

  const { statisticsData, status: statisticsDataStatus } =
    useSelector(selectStatisticsData);

  const [statiscticsDataValues, setStatisticsDataValues] =
    React.useState<StatisticsProps[]>();

  const [allWords, setAllWords] = React.useState<[] | DictionaryWordProps[]>(
    []
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const experience = userInfo !== null ? userInfo[0].experience : 0;
  const learnedWords = userInfo !== null ? userInfo[0].learnedWords : 0;
  const tagsAdded = userInfo !== null ? userInfo[0].tagsAdded : 0;
  const wordsAdded = userInfo !== null ? userInfo[0].wordsAdded : 0;

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUserInfo({ id: user!.data.id!, token: user!.token! }));
  }, [user]);

  React.useEffect(() => {
    if (userInfoStatus === "success") {
      dispatch(
        fetchStatisticsData({ token: user!.token!, userId: user!.data.id! })
      );
    }
  }, [userInfoStatus, user]);

  React.useEffect(() => {
    if (statisticsDataStatus === "success") {
      const getAllWords = async () => {
        const { data } = await axios.get<DictionaryWordProps[]>(
          `https://9854dac21e0f0eee.mokky.dev/dictionary?user_id=${user!.data
            .id!}`
        );

        setAllWords(data);
        setIsLoading(false);

        if (data.length === 0) {
          dataRadar.datasets[0].data = [1, 1, 1];
          return;
        }

        const totalWords = data.length;
        let totalHearing = 0;
        let totalCorrectSpelling = 0;
        let totalCorrectRecognition = 0;

        data.forEach((word) => {
          totalHearing += word.hearing;
          totalCorrectSpelling += word.correctSpelling;
          totalCorrectRecognition += word.correctRecognition;
        });

        const averageHearing = Math.round(totalHearing / totalWords);
        const averageCorrectSpelling = Math.round(
          totalCorrectSpelling / totalWords
        );
        const averageCorrectRecognition = Math.round(
          totalCorrectRecognition / totalWords
        );

        const newDataRadar = [
          averageHearing,
          averageCorrectSpelling,
          averageCorrectRecognition,
        ];

        dataRadar.datasets[0].data = newDataRadar;
      };

      getAllWords();
    }
  }, [statisticsDataStatus, user]);

  React.useEffect(() => {
    if (statisticsDataStatus === "success") {
      const data = statisticsData.map((obj) => ({
        day: convertTimestamp(obj.data),
        words: obj.words.length,
      }));

      setStatisticsDataValues(data);
    }
  }, [statisticsDataStatus]);

  const convertTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), 'dd.MM');
  };

  return isLoading === true ? (
    <Loader />
  ) : (
    <div className={styles.background}>
      <div className={styles.linerGistogram}>
        <Radar data={dataRadar} />
      </div>
      <div className={styles.linerGistogram}>
        <BarChart width={400} height={200} data={statiscticsDataValues}>
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Bar dataKey="words" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
};

export default Statisctics;
