import axios, { Axios } from "axios";

export const ALL_DIETS = "ALL_DIETS";
export const ALL_ORDERING = "ALL_ORDERING";
export const ALL_RECIPES = "ALL_RECIPES";
export const CLEAR_RECIPE_DETAIL = "CLEAR_RECIPE_DETAIL";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const POST_RECIPE = "POST_RECIPE";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const VISUAL_FILTER = "VISUAL_FILTER";

//-------------------------------getAllDiets-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Obtengo desde el servidor todas las dietas con el axios, al ser una promesa necesito esperar por el resultado, hacer un await, 
// de manera que la funcion será async, y despacho la action con el type ALL_DIETS y de payload le mando la respuesta del axios.get
export const getAllDiets = () => async (dispatch) => {
  const responseDiets = await axios.get('http://localhost:3001/diets')
  dispatch({
    type: ALL_DIETS,
    payload: responseDiets.data,
  })
}

//-------------------------------allOrdering-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Despacho la action con el type ALL_ORDERING y en el payload le expecifico como quiero que me haga el ordenamiento 
// si de "A-Z","Z-A","health score -","health score +"
export const allOrdering = (payload) => (dispatch) => {
  dispatch({
    type: ALL_ORDERING,
    payload: payload,
  })
}
//-------------------------------getRecipes-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Obtengo desde el servidor todas las recetas con el axios, al ser una promesa necesito esperar por el resultado, hacer un await,
// de manera que la función sera async, y despacho la action con el type ALL_RECIPE y envio en el payload la respuesta del axios.get
export const getRecipes = () => async (dispatch) => {
  const recipesAll = await axios.get("http://localhost:3001/recipes");
  const response = recipesAll.data;
  // console.log(response, "soy action");
  dispatch({
    type: ALL_RECIPES,
    payload: response,
  });
};

//-------------------------------clearRecipeDetail-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Despacho una action hacia el reducer con el type CLEAR_RECIPE_DETAIL, que no necesita payload porque "limpia" el detalle de la receta
export const clearRecipeDetail = () => (dispatch) => {
  dispatch({
    type: CLEAR_RECIPE_DETAIL,
    payload: {},
  })
}

//-------------------------------getRecipeDetail-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Obtengo desde el servidor una receta en especifica por id, al ser una promesa debo esperar por el resultado, hacer un await, 
// de manera que la funcion debe ser async, y despacho la action con el type GET_RECIPE_DETAIL y envio en el payload la respuesta del axios.get
export const getRecipeDetail = (id) => async (dispatch) => {
  const responseDetail = await axios.get(`http://localhost:3001/recipes/${id}`);
  dispatch({
    type: GET_RECIPE_DETAIL,
    payload: responseDetail.data,
  })
}

//-------------------------------filterDiets-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Despacho una action con el type FILTER_DIETS y en el payload le envio el nombre de la dieta que quiero filtrar
export const filterDiets = (payload) => (dispatch) => {
  dispatch({
    type: FILTER_DIETS,
    payload: payload,
  })
}

//-------------------------------filterRecipes-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Despacho la action con el typetype FILTER_RECIPES y en el payload le envio para filtrar por recetas de la api o de la base de datos
export const filterRecipes = (payload) => (dispatch) => {
  dispatch({
    type: FILTER_RECIPES,
    payload: payload,
  })
}

//-------------------------------postRecipe-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Creo en la base de datos una nueva receta enviando el parámetro "create" a través del axios.post y espero por la respuesta
// por lo que debe ser una funcion async y despacho la action con el type POST_RECIPES y en el payload le mando lo devuelvo por el 
// servidor al intentar crear la receta
export const postRecipe = (create) => async (dispatch) => {
  const responsePost = await axios.post('http://localhost:3001/recipes', create)
  dispatch({
    type: POST_RECIPE,
    payload: responsePost.data,
  });
}

//-------------------------------getSearchRecipe-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Obtengo desde el servidor una o varias recetas por el nombre, hago un try-catch para el caso en el que no encuentre ninguna receta
// debo hacer la funcion async para esperar la respuesta, si la promesa se resuelve de manera fullfiled despacho la action con el type
// 
export const getSearchRecipe = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/recipe?name=${name}`);
    dispatch({
      type: SEARCH_RECIPE,
      payload: response.data,
    });
  } catch (error) {
   dispatch({
      type: SEARCH_RECIPE,
      payload: ["Recipe not found"],
    });
  }
}

//------------------------------setVisualFilter------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Despacho una action al reducer con el type VISUAL_FILTER y no necesita payload porque la action solo
// cambia el valor de verdad del estado visualFilter
export const setVisualFilter = () => (dispatch) => {
    dispatch({
        type: VISUAL_FILTER,
      });
    };
