import style from "./App.module.css";
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Menu from './Components/Menu/Menu';
import Question from './Components/Question/Question';

function App() {
  return (
    <div className={style.App}>
      <Header/>
      <Question/>
      <Menu/>
      <Footer/>
    </div>
  );
}

export default App;
