import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import styles from "./Statistics.module.scss";
import { format, startOfDay, subDays } from "date-fns";
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

interface DayData {
  day: number;
  words: number;
  name: string;
}

const Statisctics = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);

  const { statisticsData, status: statisticsDataStatus } =
    useSelector(selectStatisticsData);

  const [statiscticsDataValues, setStatisticsDataValues] =
    React.useState<DayData[]>();
  const [tagUsage, setTagUsage] = React.useState<
    { value: number; name: string }[]
  >([]);

  console.log(tagUsage)

  const [radarData, setRadarData] = React.useState([
    {
      subject: "Perception by ear",
      value: 1,
    },
    {
      subject: "Spelling",
      value: 1,
    },
    {
      subject: "Recognition",
      value: 1,
    },
  ]);

  console.log(radarData)

  const [isLoading, setIsLoading] = React.useState(false);

  const experience = userInfo !== null ? userInfo[0].experience : 0;
  const learnedWords = userInfo !== null ? userInfo[0].learnedWords : 0;
  const wordsAdded = userInfo !== null ? userInfo[0].wordsAdded : 0;
  const level = userInfo !== null ? userInfo[0].level : 0;
  const daysStreak = userInfo !== null ? userInfo[0].daysStreak : 0;

  const dates: DayData[] = [];

  const currentDate = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = subDays(startOfDay(currentDate), i);
    const timestamp = date.getTime();
    const name = format(date, "E");
    dates.push({ day: timestamp, words: 0, name });
  }

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUserInfo({ id: user!.data.id!, token: user!.token! }));
  }, [user]);

  React.useEffect(() => {
    if (userInfoStatus === "success") {
      dispatch(
        fetchStatisticsData({
          userId: user!.data.id!,
          currentDay: dates[6].day,
          forDay: dates[0].day,
        })
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

        setCountTags(data);

        if (data.length === 0) {
          const newData = radarData.map((item) => ({ ...item, value: 1 }));
          setRadarData(newData);
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

        const newData = radarData.map((item, index) => {
          switch (index) {
            case 0:
              return { ...item, value: averageHearing };
            case 1:
              return { ...item, value: averageCorrectSpelling };
            case 2:
              return { ...item, value: averageCorrectRecognition };
            default:
              return item;
          }
        });

        setRadarData(newData);
      };

      getAllWords();
    }
  }, [statisticsDataStatus, user]);

  React.useEffect(() => {
    if (statisticsDataStatus === "success") {
      for (const data of statisticsData) {
        const index = dates.findIndex((dayData) => dayData.day === data.data);
        if (index !== -1) {
          dates[index].words = data.words.length;
        }
      }

      setStatisticsDataValues(dates);
      setIsLoading(false);
    }
  }, [statisticsDataStatus]);

  const setCountTags = (data: DictionaryWordProps[]) => {
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
    const tagUsageArray: { value: number; name: string }[] = [];
    tagMap.forEach((value, key) => {
      tagUsageArray.push({ value, name: key });
    });

    const totalUsage = tagUsageArray.reduce(
      (total, tag) => total + tag.value,
      0
    );

    // Сортировка массива по убыванию количества использований тегов
    tagUsageArray.sort((a, b) => b.value - a.value);

    // Выбор топ 6 тегов или меньшего количества, если всего тегов меньше 6
    const topTags = tagUsageArray.slice(0, 5);

    // Подсчет общего количества использований тегов из топ 6
    const totalTopTagsUsage = topTags.reduce(
      (total, tag) => total + tag.value,
      0
    );

    // Создание объекта "Other" для остальных тегов
    const otherTags = {
      value: totalUsage - totalTopTagsUsage,
      name: "Other",
    };

    // Установка состояния tagUsage в новый массив, включая тег "Other"
    setTagUsage([...topTags, otherTags]);
  };


  const getColorByValue = (value: number) => {
    if (value === 0) {
      return "#9590c3";
    } else if (value === 1) {
      return "#8580c3";
    } else if (value === 2) {
      return "#7570c3";
    } else if (value === 3) {
      return "#6560c3";
    } else if (value === 4) {
      return "#59568f";
    } else if (value === 5) {
      return "#4d4a7b";
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
          <div className={styles.number}>{level !== 1 ? (level * 100 + experience) : (experience)}</div>
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
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chart}>
          <h4> Learnings of Daily Words </h4>
          <ResponsiveContainer width={350} minHeight={200} minWidth={300}>
            <BarChart data={statiscticsDataValues}>
              <XAxis dataKey="name" stroke="#8884d8" />
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
                      fill={getColorByValue(index)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.tagsBlock}>
            {tagUsage.map((obj, index) => (
              <div key={obj.name} className={styles.tag}>
                <div
                  className={styles.colorPalete}
                  style={{ backgroundColor: getColorByValue(index) }}
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
