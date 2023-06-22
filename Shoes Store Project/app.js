const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const emailModule = require("./utils/email"); // Import the email module
const app = express();

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to the database");
}) 
.catch((error) => {
  console.error("Error connecting to the database", error);
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  const pageNumber = req.query.page || 1;
  const pageSize = 10;

  Product.paginate({}, { page: pageNumber, limit: pageSize })
    .then((result) => {
      const { docs, total, limit, page, pages } = result;
      const emailTo = 'gargr0109@gmail.com';
      const emailSubject = 'New Shoe Added';
      const emailText = JSON.stringify(docs);
      emailModule.sendEmail(emailTo, emailSubject, emailText);
      res.render("index", { products: docs, total, limit, page, pages });
    })
    .catch((err) => {
      console.log(err);

      res.redirect("/");
    });
});

// Add Product
app.post("/add", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var newProduct = { name: name, image: image, price: price };

  Product.create(newProduct)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    
    });
});

// Get EditForm
app.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("edit", { product: product });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Edit Put request
app.put("/:id/edit", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body.product)
    .then((updatedata) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Delete the product
app.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

app.listen(3005, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started At PORT 3005");
  }
});
