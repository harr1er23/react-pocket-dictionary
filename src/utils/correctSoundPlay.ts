import correctSound from "../assets/mp3/duolingo-correct.mp3";

export const correctSoundPlay = () => {
  new Audio(correctSound).play();
};
