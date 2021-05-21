const router = require("express").Router();
const Songs = require("./songs-model");

router.get("/", async (req, res) => {
  res.status(200).json(await Songs.getAll());
});

router.post("/", async (req, res) => {
  res.status(201).json(await Songs.create(req.body));
});
router.delete("/:id", async (req, res) => {
  res.status(200).json(await Songs.remove(req.params.id));
});
module.exports = router;
