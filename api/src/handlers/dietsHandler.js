const {dietsController} = require("../controllers/dietsController.js");
const getDiets = async (req, res) => {
  try {
    const dietsAll = await dietsController();
    res.status(200).send(dietsAll);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getDiets,
};