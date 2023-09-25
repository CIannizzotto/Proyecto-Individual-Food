import { useDispatch, useSelector } from "react-redux";
import { allOrdering } from "../../redux/actions/actions";
import style from "./Ordering.module.css";

const Ordering = ({ setOrder, order }) => {
  const teme = useSelector(state => state.visualFilter);
  const dispatch = useDispatch();

  const handlerOrdering = (event) => {
    const orderEvent = event.target.value;
    dispatch(allOrdering(orderEvent));
    order === false ? setOrder(true) : setOrder(false);
  };
  return (
    <div className={style.ordenamiento}>
      <div className={teme? style.orderContent : style.orderContentBlack}>
        <select value="default" onChange={handlerOrdering}>
          <option value="default" disabled>
            ORDER
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="health score +">health score + </option>
          <option value="health score -">health score - </option>
        </select>
      </div>
    </div>
  );
};

export default Ordering;