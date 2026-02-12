import {
  wrapLayout,
  container,
  headline,
  containerMiddleBox,
  des,
  title,
} from "./style.module.scss";

function AdvanceHeading() {
  return (
    <div className={wrapLayout}>
      <div className={container}>
        <div className={headline}></div>
        <div className={containerMiddleBox}>
          <p className={des}>DON'N MISS SUPUR</p>
          <p className={title}>Our beast proech </p>
        </div>
        <div className={headline}></div>
      </div>
    </div>
  );
}

export default AdvanceHeading;
