const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const signupRoute = require("./routes/signupRoute");
const userRoute = require("./routes/userRoute");
const signinRoute = require("./routes/signinRoute");
const changepassRoute = require("./routes/changepassRoute");
const productRoute = require("./routes/productRoute");
const forgotRoute = require("./routes/forgotRoute");
const sendtokenRoute = require("./routes/sendtokenRoute");
const resetpassRoute = require("./routes/resetpassRoute");
const cartRoute = require("./routes/cartRoute");
const fileRoute = require("./routes/fileRoute");
const adminAuthRoute = require("./routes/adminAuthRoute");
const userAdminRoute = require("./routes/admin/user.route");
const productAdminRoute = require("./routes/admin/product.route");
const orderAdminRoute = require("./routes/admin/order.route");
const authenticateToken = require("./middleware/auth");
const Product = require("./models/Product");
const adminProduct = require("./routes/adminRoutes");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const pass = process.env.PASS;
const url = `mongodb+srv://lightwing2208:${pass}@database.t4myp8j.mongodb.net/dataBase`;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/products", async (req, res) => {
  const searchTerm = req.query.term;
  const pageSize = req.query?.pageSize || 20;
  const pageIndex = req.query?.pageSize || 1;
  const offset = (pageIndex - 1) * pageSize;

  try {
    let query = {};
    if (searchTerm) {
      query = { product_name: { $regex: new RegExp(searchTerm, "i") } };
    }

    const products = await Product.find(query).skip(offset).limit(pageSize);
    const totalItems = await Product.countDocuments(query);
    res.json({ data: products, totalItems });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("An error occurred while trying to fetch products.");
  }
});

app.get("/verification", (req, res) => {
  res.send("Verification route is working!");
});

// ADMIN
app.use("/admin/auth", adminAuthRoute);
app.use("/admin/users", authenticateToken, userAdminRoute);
app.use("/admin/products", authenticateToken, productAdminRoute);
app.use("/admin/orders", authenticateToken, orderAdminRoute);

//auth
app.post("/signup", require("./routes/signupRoute"));
app.post("/signin", signinRoute);
//user
app.use("/users", authenticateToken, userRoute);
app.post("/forgot-password", forgotRoute);
app.put("/", authenticateToken, changepassRoute);
app.delete("/users", authenticateToken, userRoute);

//product
app.use("/product", productRoute);
// app.use("/products", adminProduct);

//order
app.use("/order", require("./routes/orderRoute"));
// app.use("/admin/order", require("./routes/admin.orderRoute"));
//
app.use("/", sendtokenRoute);
app.use("/", resetpassRoute);

//cart
app.use("/cart", cartRoute);

// file
app.use("/file", fileRoute);

// databaseProject.run();
app.use((req, res, next, err) => {
  res.status(500).json({ message: "Something went wrong" });
});
const connectDb = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});
