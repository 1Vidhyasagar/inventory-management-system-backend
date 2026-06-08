require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const Product = require("./models/product");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);

  res.json(product);
});

app.put("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });

  res.json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log("Server Running");
});
