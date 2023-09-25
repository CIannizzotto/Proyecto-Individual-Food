import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import Ordering from "../Ordering/Ordering";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import style from './Cards.module.css';


const Cards = () => {
  const dispatch = useDispatch();
  const recipeState = useSelector((state) => state.recipes);
  const teme = useSelector((state) => state.visualFilter);
  console.log(recipeState, "componente");
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const [postsPerPage, setPostsPerPage] = useState(9); // vamos a mostrar nueve card por pagina
  const [order, setOrder] = useState(false);
  const [restart, setRestart] = useState(false);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = recipeState.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    dispatch(getRecipes());
    setPostsPerPage(9);
  }, [dispatch, restart]);

  useEffect(() => {}, [order]);

  return (
  
    <div className= {teme? style.backgroundWhite:style.backgroundBlack}> 
      <div>
        <br />
        <SearchBar recipeState={recipeState} />
        <div className={style.filterOrdering}>
        <div className={style.orderMenu}>
          <Filters setRestart={setRestart} restart={restart} />
          <Ordering setOrder={setOrder} order={order} />
        </div>
        </div>
      </div>
      <div className={style.containerCards1}>
      <div className={style.cardsStyle}>
        {currentPosts?.map((element, index) => {
          return (
            <Card
              id={element.id}
              key={index}
              image={element.image}
              name={element.name}
              diets={element.diets}
              healthScore={element.healthScore}
              />
              );
            })}
      </div>
      </div>
      <Pagination
        totalPosts={recipeState.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        />
    </div>
  );
};

export default Cards;

