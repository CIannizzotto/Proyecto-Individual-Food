const { Router } = require("express");
const { getDiets } = require('../handlers/dietsHandler.js');
const { getAllMatches,
    getAllRecipes,
    getDetail,
    postRecipes,
    } = require('../handlers/recipeHandler.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use(recipesRoutes);
router.get('/diets',getDiets);
router.get('/recipes/:id', getDetail);
router.get('/recipe', getAllMatches);
router.get('/recipes', getAllRecipes);
router.post('/recipes', postRecipes);

module.exports = router;

/* 
JSON Para probar el post:

{
	"name": "huevos fritos",
    "image": "asdasdas",
    "summary": "se frien y chao",
    "healthScore": "30",
    "steps": "como dije, se frien los huevos en aceite y tamos ready",
    "diets": "vegetariano"
}
*/