export const randomInt = (max: number, min: number = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const sToMSS = (seconds: number) => {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const ss = Math.floor(seconds % 60);
  return `${m}:${ss < 10 ? "0" + ss : ss}`;
};
