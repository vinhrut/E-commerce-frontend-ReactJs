import { container, containerInfo } from "./style.module.scss";
import { dataInfo } from "../constants";

function InfoCard() {
  return (
    <div className={container}>
      {dataInfo.map((item, index) => {
        return (
          <div className={containerInfo} key={item.id || index}>
            <img src={item.src} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InfoCard;
