import style from "./Elips.module.css";

function Elips() {
  return (
    <div className={style.Elips}>
      <svg height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="3.5" fill="#F81B1B" stroke="#F2F4FC"/>
      </svg>
    </div>
  );
}

export default Elips;
