const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');//mongoosePaginate is a plugin for Mongoose that adds pagination support to the models.

const prodschema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number
});
prodschema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", prodschema);
//code defines a Mongoose schema for the "Product" collection, applies the mongoosePaginate plugin to enable pagination support, and exports the model for usage in other parts of the application.
//Body-parser is used to require daata from forms and currently loaded page.
