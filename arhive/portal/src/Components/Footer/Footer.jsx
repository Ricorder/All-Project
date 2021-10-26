import style from './Footer.module.css';
import Line from './Line/Line';
import Links from './Links/Links';

function Footer() {
  return (
    <div className={style.Footer}>
      <Links/>
      <Line/>
    </div>
  );
}

export default Footer;
