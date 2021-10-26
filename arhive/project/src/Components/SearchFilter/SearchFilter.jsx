import Filter from "./Filter/Filter";
import Search from "./Search/Search";
import style from "./SearchFilter.module.css";

function SearchFilter() {
  return (
    <div className={style.SearchFilter}>
      <Search/>
      <Filter/>
    </div>
  );
}

export default SearchFilter;
