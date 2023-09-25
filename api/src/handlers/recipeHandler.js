const {
    allRecipesControllers,
    allRecipesControllersDb,
    createRecipeDb,
    recipeIdControllers,
    recipeIdControllersDb,
    recipeNameControllers,
    recipeNameControllersDb,
  } = require("../controllers/recipeController");
 
  //------------------------------------getAllMatches--------------------------------------------------------------------------------------------------------
  //
  const getAllMatches = async (req, res) => {
    try {
      const { name } = req.query;
      name.toLowerCase();
      const recipeApi = await recipeNameControllers(name);
      if (recipeApi === "Recipe not found" || recipeApi.length === 0) {
        const recipeBd = await recipeNameControllersDb(name);
        res.status(200).send(recipeBd);
      } else {
        res.status(200).send(recipeApi);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  };
  
  //------------------------------------getAllRecipes--------------------------------------------------------------------------------------------------------
  //
  const getAllRecipes = async (req, res) => {
    try {
      const allApi = await allRecipesControllers();
      console.log(allApi, "Soy allApi");
      const allBd = await allRecipesControllersDb();
      if (allBd === "Recipe not found") {
        res.status(200).send(allApi);
      } else {
        const all = allApi.concat(allBd);
        res.status(200).send(all);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  };

  //------------------------------------getDetail--------------------------------------------------------------------------------------------------------
  //
  const getDetail = async (req, res) => {
    const { id } = req.params;
  
    try {
      const findRecipeApi = await recipeIdControllers(id);
      if (findRecipeApi === "Recipe not found") {
        const findRecipeBd = await recipeIdControllersDb(id)
        if (findRecipeBd){
          res.status(200).json(findRecipeBd);
        } else {
          res.status(404).json("Recipe not found");
        }
      } else {
        res.status(200).json(findRecipeApi);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //------------------------------------postRecipes--------------------------------------------------------------------------------------------------------
  //
  const postRecipes = async (req, res) => {
    try {
    const { name, image, summary, healthScore, steps, diets } = req.body;
      if (
        !name ||
        !image ||
        !summary ||
        !healthScore ||
        !steps ||
        !diets ||
        !chef
      ) {
        return res
          .status(401)
          .json({ error: "Faltan datos para crear la receta" });
      }
  
      // const recipeExists = await recipeNameControllersDb(name);
  
      // if (recipeExists) {
      //   res.status(200).json({ message: `La receta de ${name} ya existe` });
      // } else {
        const createRecipe = await createRecipeDb(
          name,
          image,
          summary,
          healthScore,
          steps,
          diets,
          chef
        );
        res.status(200).json(createRecipe);
      } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllMatches,
    getAllRecipes,
    getDetail,
    postRecipes
};
  