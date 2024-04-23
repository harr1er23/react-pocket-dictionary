import wrongSound from "../assets/mp3/duolingo-wrong.mp3";

export const wrongSoundPlay = () => {
  new Audio(wrongSound).play();
};
