const Joi = require("joi");
const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  }
});
const Library = mongoose.model("Library", librarySchema);

function validateLibrary(library) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required()
  };
  return Joi.validate(library, schema);
}

exports.librarySchema = librarySchema;
exports.Library = Library;
exports.validate = validateLibrary;
