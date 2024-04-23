import axios from "axios";
import { AchivementsProps } from "../store/achivements/achivementsSlice";
import { UserAchivementsProps } from "../store/userInfo/userInfoSlice";

export const updateUserAchivements = async (
  findAchivement: AchivementsProps | undefined,
  userAchivemets: UserAchivementsProps[],
  userId: number
) => {
  try {
    const newAchivements = [
      ...userAchivemets,
      {
        achivement_id: findAchivement?.achivement_id,
        cost: findAchivement?.cost,
        accepted: false,
        rewardType: findAchivement?.rewardType,
      },
    ];

    await axios.patch(`https://9854dac21e0f0eee.mokky.dev/userInfo/${userId}`, {
      achivements: newAchivements,
    });
  } catch (err: any) {
    console.log(err);
  }
};
