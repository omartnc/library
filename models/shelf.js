const Joi = require("joi");
const mongoose = require("mongoose");

const shelfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  }
});
const Shelf = mongoose.model("Shelf", shelfSchema);

function validateShelf(Shelf) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required()
  };
  return Joi.validate(Shelf, schema);
}

exports.shelfSchema = shelfSchema;
exports.Shelf = Shelf;
exports.validate = validateShelf;
