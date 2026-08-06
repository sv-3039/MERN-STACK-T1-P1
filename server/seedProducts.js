require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.deleteMany({});

    await Product.insertMany([
      {
        name: "Fit Me Foundation",
        brand: "Maybelline",
        price: 699,
        category: "face-makeup",
        rating: 4.5,
        reviews: 124,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZZ5L5V6oQ5TkSwzJW-bw6yuRMM_kYJ8dMzs4X_FNgQ&s=10",
      },

      {
        name: "Radiance Compact Powder",
        brand: "Lakme",
        price: 399,
        category: "face-makeup",
        rating: 4.3,
        reviews: 89,
        image:
          "https://m.media-amazon.com/images/I/71TAQkyfenL._AC_UF350,350_QL80_.jpg",
      }

      // 👈 Continue adding the remaining 34 products from your App.jsx
    ]);

    console.log("Products Inserted Successfully");

    process.exit();
  })
  .catch((err) => console.log(err));