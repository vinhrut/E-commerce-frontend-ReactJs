import { container } from "./style.module.scss";
import CountTimer from "../CountTimer/CountTimer";

function CountdownBanner() {
  const targetTime = "2025-12-31T23:59:59"; // Example target time
  return (
    <div className={container}>
      <CountTimer targetTime={targetTime} />
      <button>More Detail</button>
    </div>
  );
}

export default CountdownBanner;
