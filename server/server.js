const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

const PORT = process.env.PORT;
// INITIALIZE APP
const app = express();

// USE OF MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)


// CONNECT TO DATABASE
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });



// APP LISTENING
app.listen(PORT, () => {
  console.log(`App is listening on port number: ${PORT}`);
});
