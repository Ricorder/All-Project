import style from "./Main.module.css";
import Symbols from "./Symbols/Symbols";
import Text from './Text/Text';

function Main() {
  return (
    <div className={style.Main}>
      <Symbols />
      <Text />
    </div>
  );
}

export default Main;
