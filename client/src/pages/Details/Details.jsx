import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearRecipeDetail, getRecipeDetail } from "../../redux/actions/actions";
import "./Details.css";
import vegetal from "../../images/vegetal.png";

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeDetail = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(clearRecipeDetail());
    };
  }, [dispatch, id]);

  return (
    <div className="container-detail">
      {recipeDetail.name ? (
        <div>
          <h2>{recipeDetail.name}</h2>
          <div className="card-detail">
            <img src={recipeDetail.image} alt={recipeDetail.name} />
            <div className="info-container">
              <h2>Summary</h2>
              <p>{recipeDetail.summary}</p>
            </div>
            <div className="vegetales">
              <img src={vegetal} alt="vegetal" />
              <h3>{recipeDetail.healthScore}</h3>
            </div>
          </div>
          <div className="diets-container">
            <h3>Diets</h3>
            {recipeDetail.diets?.map((diet, index) => {
              return <p key={index}>{diet.name ? diet.name : diet}</p>;
            })}
          </div>
          <div className="steps-container">
            <h3>Steps</h3>
            {recipeDetail.created
              ? recipeDetail.steps
              : recipeDetail.steps?.map((step, index) => {
                  return (
                    <p key={index}>
                      {index + 1}-{step.step}
                    </p>
                  );
                })}
          </div>
        </div>
      ) : (
        <div className="container-spinner">
        <div className="custom-loader">
        </div>
        </div>
      )}
    </div>
  );
}

export default Details;
