import InfoCard from "./InfoCard/InfoCard";
import style from "./style.module.scss";
function Info() {
  const { wrapInfo, container } = style;
  return (
    <div className={wrapInfo}>
      <div className={container}>
        <InfoCard />
      </div>
    </div>
  );
}

export default Info;
