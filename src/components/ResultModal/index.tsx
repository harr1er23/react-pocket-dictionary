import React from "react";

import Modal from "react-bootstrap/Modal";

import styles from "./ResultModal.module.scss";

import { ReactComponent as MoneyIco } from "../../assets/ico/shopCoins.svg";
import { ReactComponent as ExperienceIco } from "../../assets/ico/medal6.svg";
import { ReactComponent as HintCoinsIco } from "../../assets/ico/shopHintsMoney.svg";
import { ReactComponent as VideoIco } from "../../assets/ico/video.svg";

import RewardPicture from "../RewardPicture";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "../../store/userInfo/userInfoSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";

type ResultModalProps = {
  show: boolean;
  onClickCloseFunc: (value: boolean) => void;
  rewardExp: number;
  rewardMoney: number;
  rewardHintMoney: number;
  showResult: React.Dispatch<React.SetStateAction<boolean>>
};

const ResultModal: React.FC<ResultModalProps> = ({
  show,
  showResult,
  onClickCloseFunc,
  rewardExp,
  rewardMoney,
  rewardHintMoney,
}) => {
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);
  const { userInfo, status: userInfoStatus } = useSelector(selectUserInfo);

  const expMultipliers =
    userInfo !== null ? userInfo[0].multipliers[1].percent : 1;
  const moneyMultipliers =
    userInfo !== null ? userInfo[0].multipliers[0].percent : 1;
  const hintsMoneyMultipliers =
    userInfo !== null ? userInfo[0].multipliers[2].percent : 1;

  const [newMoney, setNewMoney] = React.useState(0);
  const [newExp, setNewExp] = React.useState(0);
  const [newHintsMoney, setNewHintsMoney] = React.useState(0);

  React.useEffect(() => {
    setNewExp(
      expMultipliers === 0
        ? rewardExp
        : rewardExp + (expMultipliers / 100) * rewardExp
    );
    setNewMoney(
      moneyMultipliers < 0
        ? rewardMoney
        : rewardMoney + (moneyMultipliers / 100) * rewardMoney
    );
    setNewHintsMoney(
      hintsMoneyMultipliers < 0
        ? rewardHintMoney
        : rewardHintMoney + (hintsMoneyMultipliers / 100) * rewardHintMoney
    );
  }, [rewardExp, rewardHintMoney, rewardMoney, expMultipliers, moneyMultipliers, hintsMoneyMultipliers]);

  const levelUp = async () => {
    if (userInfo === null) return;
    const expSum = userInfo[0].experience + newExp;

    if (expSum >= 100) {
      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          level: userInfo[0].level + 1,
          experience: Math.round(expSum) - 100,
        }
      );
    } else {
      await axios.patch(
        `https://9854dac21e0f0eee.mokky.dev/userInfo/${userInfo[0].id}`,
        {
          experience: Math.round(expSum),
        }
      );
    }
  };

  const applyReward = async () => {
    if (userInfo === null) return;
    //получить награду

    await levelUp();

    await axios.patch(
      `https://9854dac21e0f0eee.mokky.dev/userInfo/${user!.data.id!}`,
      {
        money: Math.round(newMoney) + userInfo[0].money,
        hintsMoney: Math.round(newHintsMoney) + userInfo[0].hintsMoney,
      }
    );

    showResult(false);
    navigate("/app/exercises");
  };

  return (
    <Modal
      show={show}
      onHide={() => onClickCloseFunc(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className={styles.modalHeader}></Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.rewardIco}>
          <RewardPicture />
        </div>
        <div className={styles.rewardValues}>
          <div className={styles.rewardBlock}>
            <MoneyIco />
            <div className={styles.rewardValue}>x{Math.round(newMoney)}</div>
          </div>
          <div className={styles.rewardBlock}>
            <ExperienceIco />
            <div className={styles.rewardValue}>x{Math.round(newExp)}</div>
          </div>
          <div className={styles.rewardBlock}>
            <HintCoinsIco />
            <div className={styles.rewardValue}>x{Math.round(newHintsMoney)}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button
          text={"Increase the reward x2"}
          ico={<VideoIco className={styles.videoIco} />}
        />
        <div className={styles.continueButton} onClick={() => applyReward()}>
          Coninue without bonus
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
