import style from "./style.module.scss";

function Banner() {
  const { container, content, title, banner_button } = style;
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>Vinh Rut Shop</h1>
        <div>Chất lượng là trên hết</div>
      </div>
    </div>
  );
}

export default Banner;
