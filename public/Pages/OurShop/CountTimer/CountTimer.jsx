import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const CountTimer = ({ targetTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval} className={styles["time-segment"]}>
        <span>{timeLeft[interval]}</span>
        <span className={styles.label}>{interval}</span>
      </div>
    );
  });

  return (
    <div className={styles["countdown-wrapper"]}>
      {timerComponents.length ? (
        <>
          <div className={styles["countdown-title"]}>
            The classics make a comeback
          </div>
          <div>{timerComponents}</div>
        </>
      ) : (
        <div className={styles["expired"]}>Time's up!</div>
      )}
    </div>
  );
};

export default CountTimer;
