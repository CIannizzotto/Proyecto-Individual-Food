import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVisualFilter } from '../../redux/actions/actions';
import SearchBar from '../SearchBar/SearchBar';

import style from './Nav.module.css';

function Nav() {
    const teme = useSelector((state) => state.visualFilter); // Me traigo del reducer el estado visualFilter 
    const dispatch = useDispatch(); // me traigo de react-redux el useDispatch para poder despachar actions 
    // const recipeState = useSelector((state) => state.recipes);

    const handleClick = () => {
      dispatch(setVisualFilter()); // hago un dispatch de la action e invierte el valor de teme
    };

  return (
    <div className={style.navbar}>
      <div className={style.navbarLinks}>
      <button className={teme ? style.ligth : style.black} onClick={handleClick}>{teme?'Dark':'Light'}</button> 
      {/* <SearchBar recipeState={recipeState} /> */}
        <Link to="/form" className={teme ? style.ligth : style.black}>
          Create
        </Link>
        <Link to="/home" className={teme ? style.ligth : style.black}>
          Home
        </Link>
        <Link to="/" className={teme ? style.ligth : style.black}>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Nav;
