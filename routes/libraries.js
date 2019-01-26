const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Library, validate } = require("../models/library");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const libraries = await Library.find().sort("name");
  res.send(libraries);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const library = new Library({
    name: req.body.name
  });
  await library.save();
  res.send(library);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const library = await Library.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );

  if (!library)
    return res.status(404).send("The library with the given ID was not found.");
  res.send(library);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const library = await Library.findByIdAndRemove(req.params.id);

  if (!library)
    return res.status(404).send("The library with the given ID was not found.");

  res.send(library);
});
module.exports = router;
