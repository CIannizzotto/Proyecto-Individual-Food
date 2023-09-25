const axios = require('axios');
const { Diet } = require('../db');

const apiKey = process.env.API_KEY;
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`;

console.log(process.env.API_KEY);

const dietsController = async () => {
  const allDiets = await axios.get(
    apiUrl
  );
  const dietsData = allDiets.data.results.map((element) => {
    return {
      diets: element.diets.map((diet) => {
        return diet;
      }),
    };
  });

  const diets = dietsData.map((element) => {
    return element.diets;
  });

  const dietsUnique = [...new Set(diets.flat())];

  const dietsName = dietsUnique.map((diet) => {
    return {
      name: diet,
    };
  });

  const dietsBd = await Diet.findAll();
  if (dietsBd.length === 0) {
    const dietsBd = await Diet.bulkCreate(dietsName);
    return dietsBd;
  } else {
    return dietsBd;
  }
};
module.exports = {dietsController};

