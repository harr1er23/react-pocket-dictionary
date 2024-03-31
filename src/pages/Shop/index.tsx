import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Shop.module.scss";

import { ReactComponent as LightIco } from "../../assets/ico/light.svg";
import { ReactComponent as MoneyIco } from "../../assets/ico/money.svg";

import { ReactComponent as ShopCoinsIco } from "../../assets/ico/shopCoins.svg";
import { ReactComponent as ShopExperienceIco } from "../../assets/ico/medal6.svg";
import { ReactComponent as ShopLevelIco } from "../../assets/ico/shopLevel.svg";
import { ReactComponent as ShopHintIco } from "../../assets/ico/shopHint.svg";
import { ReactComponent as ShopHintsMoneyIco } from "../../assets/ico/shopHintsMoney.svg";

import { ReactComponent as OneAnswerIco } from "../../assets/ico/oneAnswer.svg";
import { ReactComponent as HalfAnswersIco } from "../../assets/ico/halfAnswers.svg";
import { ReactComponent as MoreTryIco } from "../../assets/ico/moreTry.svg";
import { ReactComponent as CorrectAnswerIco } from "../../assets/ico/correctAnswer.svg";

import { useAppDispatch } from "../../store/store";
import { selectUser } from "../../store/user/userSlice";
import {
  addUserHintsCoins,
  addUserLevel,
  fetchUserInfo,
  reduceUserCoins,
  reduceUserHintsCoins,
  selectUserInfo,
  updateHints,
  updateMultipliers,
} from "../../store/userInfo/userInfoSlice";

type ShopProps = {};

const Shop: React.FC<ShopProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUser);
  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);

  React.useEffect(() => {
    dispatch(fetchUserInfo({ id: user!.data.id!, token: user!.token! }));
  }, [user]);

  const hintsMoney = userInfo !== null ? userInfo[0].hintsMoney : 0;
  const money = userInfo !== null ? userInfo[0].money : 0;
  const level = userInfo !== null ? userInfo[0].level : 0;
  const hints = userInfo !== null ? userInfo[0].hints : [];
  const multipliers = userInfo !== null ? userInfo[0].multipliers : [];

  const byHintsCoins = 1000;

  let levelUpCost: number;

  switch (true) {
    case level >= 0 && level <= 5:
      levelUpCost = 500;
      break;
    case level > 5 && level <= 10:
      levelUpCost = 1000;
      break;
    case level > 10 && level <= 20:
      levelUpCost = 1500;
      break;
    case level > 20 && level <= 30:
      levelUpCost = 2000;
      break;
    case level > 30 && level <= 40:
      levelUpCost = 2500;
      break;
    case level > 40 && level <= 50:
      levelUpCost = 3000;
      break;
    default:
      levelUpCost = 5000;
  }

  const checkMoneyAmount = (allMoney: number, moneyCost: number) => {
    console.log(allMoney, moneyCost);
    if (allMoney < moneyCost) {
      return true;
    }

    return false;
  };

  const onClickBuyHintsCoins = async () => {
    if (userInfo === null) {
      return;
    }

    try {
      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          money: money - 1000,
          hintsMoney: hintsMoney + 10,
        }
      );

      dispatch(addUserHintsCoins(10));
      dispatch(reduceUserCoins(1000));
      toast.success("You got 10 hint-coins!");
    } catch (err: any) {
      console.log(err);
      toast.error("Purchase error! Try again later.");
    }
  };

  const onClickBuyLevel = async (cost: number) => {
    if (userInfo === null) {
      return;
    }

    try {
      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          level: level + 1,
          money: money - cost,
        }
      );

      dispatch(addUserLevel(1));
      dispatch(reduceUserCoins(cost));
      toast.success("Your level has been raised!");
    } catch (err: any) {
      console.log(err);
      toast.error("Purchase error! Try again later.");
    }
  };

  const onClickBuyMultiplier = async (multiplierType: number, cost: number) => {
    if (userInfo === null) {
      return;
    }

    try {
      const hewMultipliers = multipliers.map((obj) => {
        if (obj.type === multiplierType) {
          return {
            ...obj,
            percent: obj.percent + 5,
            cost: obj.cost + 50,
          };
        } else {
          return obj;
        }
      });

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          money: money - cost,
          multipliers: hewMultipliers,
        }
      );

      dispatch(reduceUserCoins(cost));
      dispatch(updateMultipliers(hewMultipliers));
      toast.success("You have improved the statistics!");
    } catch (err: any) {
      console.log(err);
      toast.error("Purchase error! Try again later.");
    }
  };

  const onClickBuyHints = async (hintsType: number, cost: number) => {
    if (userInfo === null) {
      return;
    }

    try {
      const hewHints = hints.map((obj) => {
        if (obj.type === hintsType) {
          return {
            ...obj,
            value: obj.value + 1,
          };
        } else {
          return obj;
        }
      });

      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          hintsMoney: hintsMoney - cost,
          hints: hewHints,
        }
      );

      dispatch(reduceUserHintsCoins(cost));
      dispatch(updateHints(hewHints));
      toast.success("You got a hint!");
    } catch (err: any) {
      console.log(err);
      toast.error("Purchase error! Try again later.");
    }
  };

  return (
    <div className={styles.shopBackground}>
      <div className={styles.shopHeader}>
        <Link to="/app/profile" className={styles.backButton}>
          {"< Back"}
        </Link>
        <h3>Improve stats</h3>
        <div className={styles.shopValues}>
          <div className={styles.hintsValue}>
            {hintsMoney} <LightIco />
          </div>
          <div className={styles.moneyValue}>
            {money} <MoneyIco />
          </div>
        </div>
      </div>
      <div className={styles.statsBlock}>
        <div className={styles.statsCards}>
          {multipliers.map((obj, index) => (
            <div key={obj.name} className={styles.statsCard}>
              <div className={styles.cardIco}>
                {obj.type === 1 ? (
                  <ShopCoinsIco />
                ) : obj.type === 2 ? (
                  <ShopExperienceIco />
                ) : (
                  obj.type === 3 && <ShopHintIco />
                )}
                <div className={styles.percentValue}>{obj.percent}%</div>
              </div>
              <div className={styles.statsText}>
                <h6>{obj.name}</h6>
                <p>Increase by 5%</p>
                {obj.percent !== 100 && (
                  <button
                    onClick={() => onClickBuyMultiplier(obj.type, obj.cost)}
                    disabled={checkMoneyAmount(money, obj.cost)}
                  >
                    Buy for {obj.cost} <MoneyIco />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className={styles.statsCard}>
            <div className={styles.cardIco}>
              <ShopLevelIco />
            </div>
            <div className={styles.statsText}>
              <h6>Level Up</h6>
              <p>Increase by 1 lvl</p>
              <button
                onClick={() => onClickBuyLevel(levelUpCost)}
                disabled={checkMoneyAmount(money, levelUpCost)}
              >
                Buy for {levelUpCost} <MoneyIco />
              </button>
            </div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.cardIco}>
              <ShopHintsMoneyIco />
            </div>
            <div className={styles.statsText}>
              <h6>Buy 10 hint coins</h6>
              <p>Increase by 10 coins</p>
              <button
                onClick={() => onClickBuyHintsCoins()}
                disabled={checkMoneyAmount(money, byHintsCoins)}
              >
                Buy for {byHintsCoins} <MoneyIco />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.hintContent}>
        <h3>Buy hints</h3>
        <div className={styles.hintBlock}>
          <div className={styles.hintCards}>
            {hints.map((obj, index) => (
              <div key={obj.hintName} className={styles.hintCard}>
                <div className={styles.topBlock}>
                  <div className={styles.hintsIco}>
                    {obj.type === 1 ? (
                      <OneAnswerIco />
                    ) : obj.type === 2 ? (
                      <HalfAnswersIco />
                    ) : obj.type === 3 ? (
                      <MoreTryIco />
                    ) : (
                      obj.type === 4 && <CorrectAnswerIco />
                    )}
                  </div>
                  <div className={styles.hintsCounter}>{obj.value}</div>
                </div>
                <div className={styles.bottomBlock}>
                  <div className={styles.hintCardText}>{obj.hintName}</div>
                  <button
                    onClick={() => onClickBuyHints(obj.type, obj.cost)}
                    disabled={checkMoneyAmount(hintsMoney, obj.cost)}
                  >
                    Buy for {obj.cost} <LightIco />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
