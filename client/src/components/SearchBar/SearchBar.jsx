import { useDispatch, useSelector } from "react-redux";
import { getSearchRecipe } from "../../redux/actions/actions";
import { useState } from "react";
import style from "./SearchBar.module.css";


const SearchBar = () => {
  const teme = useSelector (state => state.visualFilter)
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerSearch = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(getSearchRecipe(name));
  };

  return (
    <div className={style.container}>
      <form >
        <input
          className={teme? style.searchContainerLigth : style.searchContainerBlack}
          type="search"
          placeholder="Search Recipe"
          onChange={handlerSearch}
        ></input>
        <button className={teme? style.buttonLigth : style.buttonBlack} type="submit" onClick={(event) => handlerSubmit(event)}>
        🔎
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
