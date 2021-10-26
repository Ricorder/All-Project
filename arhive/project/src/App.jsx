import style from "./App.module.css";
import Header from "./Components/Header/Header";
import SearchFilter from "./Components/SearchFilter/SearchFilter";
import Title from "./Components/Title/Title";

function App() {
  return (
    <div className={style.App}>
      <Header/>
      <Title/>
      <SearchFilter/>
    </div>
  );
}

export default App;
