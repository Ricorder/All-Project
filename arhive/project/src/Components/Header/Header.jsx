import style from "./Header.module.css";
import LabelName from "./LabelName/LabelName";

function Header() {
  return (
    <div className={style.Header}>
      <LabelName/>
    </div>
  );
}

export default Header;
