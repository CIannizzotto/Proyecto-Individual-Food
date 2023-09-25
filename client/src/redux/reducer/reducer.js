import {
    ALL_DIETS,
    ALL_ORDERING,
    ALL_RECIPES,
    CLEAR_RECIPE_DETAIL,
    GET_RECIPE_DETAIL,
    FILTER_DIETS,
    FILTER_RECIPES,
    POST_RECIPE,
    SEARCH_RECIPE,
    VISUAL_FILTER} from "../actions/actions";

const inicialState = {
  recipes: [],
  recipeCopy: [],
  diets: [],
  recipeCreate: [],
  recipeDetail: [],
  visualFilter: false,
}

const reducer = (state = inicialState, action) => {
  // console.log(state.recipes,"soy estado global");
    switch (action.type) {
    //-------------------------------ALL_DIETS-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo ALL_DIETS, entro al switch y hago una copia del estado y en el diets guardo lo que me llega por payload
    case ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    //-------------------------------ALL_ORDERING-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo ALL_ORDERING, si el payload es "A-Z" hago una copia del estado y ordeno las recetas de orden alfabetico 
    // ascendente, si el payload es "Z-A" hago una copia del estado y ordeno las recetas de orden alfabetico descendente, si el payload
    // es "health score -" ordeno las recetas por el health score de menor a mayor y si el payload es "health score +" ordeno las recetas 
    // por el health score de mayor a menor
    case ALL_ORDERING:
      if (action.payload === "A-Z") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "Z-A") {
        return {
          ...state,
          recipes: state.recipes.sort((b, a) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "health score -") {
        return {
          ...state,
          recipes: state.recipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) {
              return -1;
            }
            if (a.healthScore > b.healthScore) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "health score +") {
        return {
          ...state,
          recipes: state.recipes.sort((b, a) => {
            if (a.healthScore < b.healthScore) {
              return -1;
            }
            if (a.healthScore > b.healthScore) {
              return 1;
            }
            return 0;
          }),
        };
      }
      break;
    //-------------------------------ALL_RECIPES-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo ALL_RECIPES y hago una copia del estado, en el recipes y recipesCopy utilizo los valores obtenidos por payload
    case ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipeCopy: action.payload,
      };
    //-------------------------------CLEAR_RECIPE_DETAIL-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo CLEAR_RECIPE_DETAIL y hago una copia del estado y el recipeDetail lo "limpio" seteandolo en un array vacio
    case CLEAR_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: [],
      };
    //-------------------------------GET_RECIPE_DETAIL-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo GET_RECIPE_DETAIL y hago una copia del estado, en recipeDetail utilizo los valores obtenidos por payload
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    //-------------------------------FILTER_DIETS-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo FILTER_DIETS, hago una copia del estado y en recipes filtro las recetas de dietas coincidentes al recibido por payload
    case FILTER_DIETS:
      
      return {
        ...state,
        recipes: state.recipeCopy.filter(
          (element) =>
            element.diets.includes(action.payload) ||
            element.diets.map((diet) => diet.name).includes(action.payload)
            ),
          };
    //-------------------------------FILTER_RECIPES-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo FILTER_RECIPES, hago una copia del estado y filtro las recetas dependiendo del payload
    // si es "Recipes Created" busco las recetas en la base de datos, si es "Recipes Api" busco las recetas de la api
    case FILTER_RECIPES:
      if (action.payload === "Recipes Created") {
        return {
          ...state,
          recipes: state.recipeCopy.slice(100)
          };
        }
      if (action.payload === "Recipes Api") {
        return {
          ...state,
          recipes: state.recipeCopy.filter((element) =>
            element.created ? null : element
          ),
        };
      }
      break;
    //-------------------------------POST_RECIPE-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo POST_RECIPE, hago una copia del estado y en recipeCreate utilizo los valores obtenido por payload
    case POST_RECIPE:
      return {
        ...state,
        recipeCreate: action.payload,
      };
    //-------------------------------SEARCH_RECIPE-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo SEARCH_RECIPE, hago una copia del estado y busco las recetas coincidentes con el nombre recibido en payload
    case SEARCH_RECIPE:
      console.log(action.payload);
      return {
        ...state,
        recipes: action.payload,
      };
    //-------------------------------VISUAL_FILTER-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Recibo la action.type de tipo VISUAL_FILTER, hago una copia del estado, y seteo el visualFilter con el valor de verdad contrario al que tiene
    case VISUAL_FILTER:
            return{
            ...state,
            visualFilter: !state.visualFilter}
    default: return {...state};
        }
}

export default reducer;