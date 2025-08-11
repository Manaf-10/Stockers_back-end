const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const AuthRouter = require("./routes/AuthRouter");
const PostRouter = require("./routes/PostRouter");
const StocksRouter = require("./routes/StocksRouter");
const TransactionRouter = require("./routes/TransactionRouter");
const ListRouter = require('./routes/ListingRouter')

const PORT = process.env.PORT || 3000;
const db = require("./db");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", AuthRouter);
app.use("/posts", PostRouter);
app.use("/stocks", StocksRouter);
app.use("/transactions", TransactionRouter);
app.use('/List', ListRouter)

app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/avatars", express.static(path.join(process.cwd(), "public/avatars")));

app.use("/", (req, res) => {
  res.send(`Connected!`);
});


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
