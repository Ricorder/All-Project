import Grossline from './Grossline/Grossline';
import style from "./Border.module.css";
import Notifications from './Notifications/Notifications';
import News from './News/News';
import Main from './Main/Main';

function Border() {
  return (
    <div className={style.Border}>
      <Main/>
      <News/>
      <Notifications/>
      <Grossline/>
    </div>
  );
}

export default Border;
