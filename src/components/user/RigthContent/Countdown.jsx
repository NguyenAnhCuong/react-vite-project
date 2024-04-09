import { useEffect, useState } from "react";

const Countdown = (props) => {
  const initDuration = 5;
  const [duration, setDuration] = useState(initDuration);

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  useEffect(() => {
    if (duration === 0) {
      props.TimeUp();
      return;
    }
    const timer = setInterval(() => {
      setDuration((x) => x - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return <>{toHHMMSS(duration)}</>;
};
export default Countdown;
