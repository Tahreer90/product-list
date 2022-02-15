const express = require("express");
const res = require("express/lib/response");
let products = require("./products");
const productRoutes = require("./apis/products/routes");
const shopRoutes = require("./apis/shops/routes");
const userRoutes = require("./apis/users/routes");
const connectDb = require("./database");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use((req, res, next) => {
  const fullUrl =
    req.method + " " + req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(fullUrl);
  next();
});

app.use(cors());

app.use(productRoutes);
app.use(shopRoutes);
app.use(userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(8000);
connectDb();
