const Joi = require("joi");
const config = require("config");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const books = require("./routes/books");
const libraries = require("./routes/libraries");
const categories = require("./routes/categories");
const shelfs = require("./routes/shelfs");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/libraryDb")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/books", books);
app.use("/api/libraries", libraries);
app.use("/api/categories", categories);
app.use("/api/shelfs", shelfs);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
