const Joi = require("joi");
const mongoose = require("mongoose");
const { librarySchema } = require("./library");
const { categorySchema } = require("./category");
const { shelfSchema } = require("./shelf");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  library: {
    type: librarySchema,
    required: true
  },
  category: {
    type: categorySchema,
    required: true
  },
  shelf: {
    type: shelfSchema,
    required: true
  }
});
const Book = mongoose.model("Book", bookSchema);

function validateBook(Book) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required(),
    libraryId: Joi.objectId().required(),
    categoryId: Joi.objectId().required(),
    shelfId: Joi.objectId().required()
  };
  return Joi.validate(Book, schema);
}

exports.bookSchema = bookSchema;
exports.Book = Book;
exports.validate = validateBook;
