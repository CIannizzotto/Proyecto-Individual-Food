import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from "../../redux/actions/actions";
import { useEffect } from "react";
import { filterDiets, filterRecipes } from "../../redux/actions/actions";
import style from "./Filters.module.css";

const Filters = ({ setRestart, restart }) => {
  const dispatch = useDispatch();
  const selectDiets = useSelector((state) => state.diets);
  const teme = useSelector(state => state.visualFilter);

  const handlerFilters = (event) => {
    const diets = event.target.value;
    dispatch(filterDiets(diets));
  };

  const handlerButton = (event) => {
    const recipesFilter = event.target.value;
    dispatch(filterRecipes(recipesFilter));
  };

  const restarting = () => {
    setRestart(!restart);
  };

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);
  return (
    <div className={style.filtersContainer}>
      <div className={teme? style.contentSelect : style.contentSelectBlack}>
        <select value="default" onChange={handlerFilters}>
          <option value="default" disabled>
            DIETS
          </option>
          {selectDiets?.map((element, index) => {
            return (
              <option key={index} value={element.name}>
                {element.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={teme? style.buttons : style.buttonsBlack}>
        <button value="Recipes Api" onClick={handlerButton}>
          Recipes Api
        </button>
        <button value="Recipes Created" onClick={handlerButton}>
          Recipes Created
        </button>
        <button value="All Recipes" onClick={restarting}>
          Restart Filter
        </button>
      </div>
    </div>
  );
};

export default Filters;
