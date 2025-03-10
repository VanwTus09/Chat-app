const express = require("express");
const mongoose = require("mongoose");
const session = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/Authroutes")

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
