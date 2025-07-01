import style from "../../About us/style.module.scss";

function ContentItem({ image, text }) {
  const { containerContentItem } = style;
  return (
    <div className={containerContentItem}>
      <div>
        <img src={image} alt="" style={{ width: "390px", height: "520px" }} />
      </div>
      <div>
        <p style={{ textAlign: "left", width: "390px" }}>{text}</p>
      </div>
    </div>
  );
}

export default ContentItem;
