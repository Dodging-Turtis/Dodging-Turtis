// Fisher-Yates (aka Knuth) Shuffle.
export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function formatTime(timeInSeconds: number): string {
  // const hours = Math.floor(this.timeSeconds / 3600);
  const secondsPostHours = timeInSeconds % 3600;
  const minutes = Math.floor(secondsPostHours / 60);
  const seconds: number = secondsPostHours % 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
}
