import style from "../../OurShop/style.module.scss";
import CountTimer from "../../OurShop/CountTimer/CountTimer";

function Banner() {
  const { containerBanner, btnBuyBanner, bannerContent } = style;
  const targetTime = "2025-12-31T23:59:59";
  return (
    <>
      <div className={containerBanner}>
        <div className={bannerContent}>
          <div>
            <CountTimer targetTime={targetTime} />
          </div>
          <button className={btnBuyBanner}>Buy now</button>
        </div>
      </div>
    </>
  );
}

export default Banner;
