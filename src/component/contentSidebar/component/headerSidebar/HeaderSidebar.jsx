import style from "./style.module.scss";
function HeaderSidebar({ icon, title }) {
  const { container } = style;

  return (
    <div className={container}>
      {icon}
      <div>{title}</div>
    </div>
  );
}

export default HeaderSidebar;
