const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize')
const apiKey = process.env.API_KEY;

//-----------------------------allRecipesControllers----------------------------------------------------------------------------------------------------------------
//
const allRecipesControllers = async () => {
  const allRecipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
    );
  const recipeData = allRecipes.data.results.map((element) => {
    return {
      id: element.id,
      image: element.image,
      name: element.title,
      diets: element.diets.map((diet) => {
        return diet;
      }),
      healthScore: element.healthScore,
    };
  });
  return recipeData;
};

//-----------------------------allRecipesControllersDb----------------------------------------------------------------------------------------------------------------
//
const allRecipesControllersDb = async () => {
  try {
    const allRecipesDb = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    
    return allRecipesDb;
  } catch (error) {
    return "Recipe not found";
  }
};

//-----------------------------createRecipeDb----------------------------------------------------------------------------------------------------------------
//
  const createRecipeDb = async (
    name,
    image,
    summary,
    healthScore,
    steps,
    diets,
    chef
  ) => {
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      chef
    });
  
    const dietsAll = await Diet.findAll({
      where: {
        name: diets,
      },
    });
    await newRecipe.addDiets(dietsAll.map((diet) => diet.id));
  
    return newRecipe;
  };

  //-----------------------------recipeIdControllers----------------------------------------------------------------------------------------------------------------
  //
  const recipeIdControllers = async (id) => {
    try {
      const recipeId = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
      );
  
      const dataId = {
        id: recipeId.data.id,
        name: recipeId.data.title,
        image: recipeId.data.image,
        summary: recipeId.data.summary.replace(/<[^>]*>?/gm, ""),
        healthScore: recipeId.data.healthScore,
        diets: recipeId.data.diets,
        steps: recipeId.data.analyzedInstructions[0].steps.map((step) => {
          return {
            step: step.step,
          };
        }),
      };
  
      return dataId;
    } catch (error) {
      return "Recipe not found";
    }
  };
  
  //-----------------------------recipeIdControllersDb----------------------------------------------------------------------------------------------------------------
  //
  const recipeIdControllersDb = async (id) => {
    const recipeIdDb = await Recipe.findByPk(id, {
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return recipeIdDb;
  };

//-----------------------------recipeNameControllers----------------------------------------------------------------------------------------------------------------
//
const recipeNameControllers = async (name) => {
  try {
    const recipeName = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&query=${name}`
    );

    const recipeData = recipeName.data.results.map((element) => {
      return {
        id: element.id,
        image: element.image,
        name: element.title,
        diets: element.diets.map((diet) => {
          return diet;
        }),
        healthScore: element.healthScore,
      };
    });
    console.log(recipeData);
    return recipeData;

  } catch (error) {
    return "Recipe not found";
  }
};

//-----------------------------recipeNameControllersDb----------------------------------------------------------------------------------------------------------------
//
const recipeNameControllersDb = async (name) => {
  try {
    const recipeNameBd = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (recipeNameBd.length === 0) {
      throw new Error("Recipe not found");
    }
    return recipeNameBd;
  } catch (error) {
    return "Recipe not found";
  }
};


  
  module.exports = {
    allRecipesControllers, //
    allRecipesControllersDb, //
    createRecipeDb, //
    recipeIdControllers, //
    recipeIdControllersDb, //
    recipeNameControllers, //
    recipeNameControllersDb, //
  };

  