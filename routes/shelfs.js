const { Shelf, validate } = require("../models/shelf");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const shelf = await Shelf.find().sort("name");
  res.send(shelf);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const shelf = new Shelf({
    name: req.body.name
  });
  await shelf.save();

  res.send(shelf);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const shelf = await Shelf.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );

  if (!shelf)
    return res.status(404).send("The shelf with the given ID was not found.");

  res.send(shelf);
});
router.delete("/:id", async (req, res) => {
  const shelf = await Shelf.findByIdAndRemove(req.params.id);

  if (!shelf)
    return res.status(404).send("The shelf with the given ID was not found.");

  res.send(shelf);
});
module.exports = router;
