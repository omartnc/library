const Joi = require("joi");
const mongoose = require("mongoose");
const { librarySchema } = require("./library");

const Member = mongoose.model(
  "Member",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200
    },
    surName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200
    },
    library: {
      type: librarySchema,
      required: true
    }
  })
);

function validateMember(member) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required(),
    libraryId: Joi.objectId().required()
  };
  return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;
