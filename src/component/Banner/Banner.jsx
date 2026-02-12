import style from "./style.module.scss";

function Banner() {
  const { container, content, title, banner_button } = style;
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>VISCA BARCELONA</h1>
        <div>FC Barcelona – Más que un club </div>
        <button className={banner_button}>Shop Now</button>
      </div>
    </div>
  );
}

export default Banner;
