import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Cards = (props) => {
  console.log(props.name);
  return (
    <div className={style.container}>
      <div className={style.card}>
        <Link to={`/home/${props.id}`}>
          <img src={props.image} alt={props.name} />
        </Link>
        <div className={style.intro}>
          <p1>{props.name}</p1>
          <div className={style.containerCardDiets}>
            <div>
              {props.diets?.map((element, index) => {
                return (
                  <p key={index}> {element.name ? element.name : element}</p>
                );
              })}
            </div>
            <div className={style.healthScore}>
              <p>Score: {props.healthScore}</p>
            </div>
            <div className={style.id}>
              <p>Id: {props.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
