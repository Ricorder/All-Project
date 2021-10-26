import Elips from './Elips/Elips';
import style from "./News.module.css";
import Symbols from './Symbols/Symbols';
import Text from './Text/Text';

function News() {
  return (
    <div className={style.News}>
      <Elips/>
      <Symbols />
      <Text />
    </div>
  );
}

export default News;
