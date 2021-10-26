import style from "./Notifications.module.css";
import Symbols from './Symbols/Symbols';
import Text from './Text/Text';

function Notifications() {
  return (
    <div className={style.Notifications}>
      <Symbols/>
      <Text/>
    </div>
  );
}

export default Notifications;
