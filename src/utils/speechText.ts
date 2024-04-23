export const speakText = (
  synthesis: SpeechSynthesis,
  word: string,
  selectedVoice: SpeechSynthesisVoice | undefined
) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    synthesis.speak(utterance);
  } else {
    synthesis.speak(utterance);
  }
};
