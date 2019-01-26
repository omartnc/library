const { Book, validate } = require("../models/book");
const { Library } = require("../models/library");
const { Category } = require("../models/category");
const { Shelf } = require("../models/shelf");
const { Member } = require("../models/member");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const shelf = await Shelf.findById(req.body.shelfId);
  if (!shelf) return res.status(400).send("Invalid shelf.");

  const member = await Member.findById(req.body.memberId);
  if (!member) return res.status(400).send("Invalid member.");

  const library = await Library.findById(req.body.libraryId);
  if (!library) return res.status(400).send("Invalid library.");

  const book = new Book({
    name: req.body.name,
    category: {
      name: category.name
    },
    library: {
      name: library.name
    },
    shelf: {
      name: shelf.name
    },
    member: {
      name: member.name
    }
  });
  await book.save();
});

module.exports = router;
