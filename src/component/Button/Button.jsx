import style from "./style.module.scss";

function Button({ content }) {
  const { btn } = style;
  return <button className={btn}>{content}</button>;
}

export default Button;
