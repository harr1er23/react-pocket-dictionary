import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import styles from "./Statistics.module.scss";
// import { Radar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
import { format, parse, getTime } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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

// Chart.register(...registerables);

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

const radarData = [
  {
    subject: "Perception by ear",
    A: 3,
  },
  {
    subject: "Spelling",
    A: 5,
  },
  {
    subject: "Recognition",
    A: 8,
  },
];

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
  const [tagUsage, setTagUsage] = React.useState<
    { id: number; value: number; name: string }[]
  >([]);

  const [allWords, setAllWords] = React.useState<[] | DictionaryWordProps[]>(
    []
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const experience = userInfo !== null ? userInfo[0].experience : 0;
  const learnedWords = userInfo !== null ? userInfo[0].learnedWords : 0;
  const tagsAdded = userInfo !== null ? userInfo[0].tagsAdded : 0;
  const wordsAdded = userInfo !== null ? userInfo[0].wordsAdded : 0;
  const level = userInfo !== null ? userInfo[0].level : 0;
  const daysStreak = userInfo !== null ? userInfo[0].daysStreak : 0;

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
      //дописать получение слов за последние 7 дней

      const getAllWords = async () => {
        const { data } = await axios.get<DictionaryWordProps[]>(
          `https://9854dac21e0f0eee.mokky.dev/dictionary?user_id=${user!.data
            .id!}`
        );

        const tagMap: Map<string, number> = new Map();

        data.forEach((word) => {
          word.tags.forEach((tag) => {
            const tagValue = tag.value;
            if (tagMap.has(tagValue)) {
              tagMap.set(tagValue, tagMap.get(tagValue)! + 1);
            } else {
              tagMap.set(tagValue, 1);
            }
          });
        });

        // Формирование массива для отображения в компоненте
        const tagUsageArray: { id: number; value: number; name: string }[] = [];
        tagMap.forEach((value, key) => {
          tagUsageArray.push({ id: Number(key), value, name: key });
        });

        // Сортировка массива по убыванию количества использований тегов
        tagUsageArray.sort((a, b) => b.value - a.value);

        // Выбор топ 6 тегов или меньшего количества, если всего тегов меньше 6
        const topTags = tagUsageArray.slice(0, 6);

        // Подсчет общего количества использований тегов из топ 6
        const totalTopTagsUsage = topTags.reduce(
          (total, tag) => total + tag.value,
          0
        );

        // Создание объекта "Other" для остальных тегов
        const otherTags = {
          id: 0, // или какой-то уникальный id
          value: tagUsageArray
            .slice(6)
            .reduce((total, tag) => total + tag.value, 0),
          name: "Other",
        };

        // Установка состояния tagUsage в новый массив, включая тег "Other"
        setTagUsage([...topTags, otherTags]);

        setAllWords(data);

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
      setIsLoading(false);
    }
  }, [statisticsDataStatus]);

  const convertTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), "dd.MM");
  };

  const getColorByValue = (value: number) => {
    if (value > 25 && value <= 30) {
      return "#4d4a7b";
    } else if (value > 17 && value <= 25) {
      return "#59568f";
    } else if (value > 12 && value <= 17) {
      return "#6b68af";
    } else if (value > 6 && value <= 12) {
      return "#7773c3";
    } else if (value > 3 && value <= 6) {
      return "#8884d8";
    } else if (value > 0 && value <= 3) {
      return "#9590ec";
    } else {
      return "#3b395e";
    }
  };

  return isLoading === true ? (
    <Loader />
  ) : (
    <div className={styles.background}>
      <div className={styles.staticticsHeader}>
        <h2>Statisctics</h2>
      </div>
      <div className={styles.contentHeader}>
        <div className={styles.statisticsBlock}>
          <div className={styles.number}>{learnedWords}</div>
          <div className={styles.blockText}>Learned Words</div>
        </div>
        <div className={styles.statisticsBlock}>
          <div className={styles.number}>{wordsAdded}</div>
          <div className={styles.blockText}>Added Words</div>
        </div>
        <div className={styles.statisticsBlock}>
          <div className={styles.number}>{level * 100 + experience}</div>
          <div className={styles.blockText}>Gained Experience</div>
        </div>
        <div className={styles.statisticsBlock}>
          <div className={styles.number}>{daysStreak}</div>
          <div className={styles.blockText}>Days streak</div>
        </div>
      </div>
      <div className={styles.contentBody}>
        <div className={styles.chart}>
          <h4> Skills </h4>
          <ResponsiveContainer width={350} minWidth={300} minHeight={200}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chart}>
          <h4> Learnings of Daily Words </h4>
          <ResponsiveContainer width={325} minHeight={200} minWidth={300}>
            <BarChart data={statiscticsDataValues}>
              <XAxis dataKey="day" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <Bar dataKey="words" fill="#8884d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {
        <div className={styles.contentBottom}>
          <div className={styles.chart}>
            <h4> Tags Count </h4>
            <ResponsiveContainer width={325} minHeight={200} minWidth={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={tagUsage}
                  innerRadius={40}
                  outerRadius={80}
                  fill="#82ca9d"
                >
                  {tagUsage.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColorByValue(entry.value)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.tagsBlock}>
            {tagUsage.map((obj) => (
              <div className={styles.tag}>
                <div
                  className={styles.colorPalete}
                  style={{ backgroundColor: getColorByValue(obj.value) }}
                ></div>
                {obj.name}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Statisctics;
