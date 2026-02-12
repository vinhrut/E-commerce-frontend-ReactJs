import { container, content } from "./style.module.scss";
import countImage_1 from "../../assets/icon/images/countImage_1.jpg";
import countImage_2 from "../../assets/icon/images/countImage_2.jpg";
import useTranslateXImage from "./translateXImage";

function SaleHomePage() {
  const { translateXPosition } = useTranslateXImage();

  return (
    <div className={container}>
      <div
        style={{
          transform: `translateX(${translateXPosition}px)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        <img src={countImage_1} alt="" />
      </div>
      <div className={content}>
        <h2>Sale of the year</h2>
        <p>
          Libero sed faucibus facilisis fermentum. Est nibh sed massa sodales.
        </p>
        <button>Read more</button>
      </div>
      <div
        style={{
          transform: `translateX(-${translateXPosition}px)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        <img src={countImage_2} alt="" />
      </div>
    </div>
  );
}

export default SaleHomePage;
