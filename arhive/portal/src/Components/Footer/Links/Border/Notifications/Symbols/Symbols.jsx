import Bigbell from './Bigbell/Bigbell';
import Smallbell from './Smallbell/Smallbell';
import style from "./Symbols.module.css";

function Symbols() {
  return (
    <div className={style.Symbols}>
      <Bigbell/>
      <Smallbell/>
    </div>
  );
}

export default Symbols;
