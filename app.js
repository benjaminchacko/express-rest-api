const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Top-Level Routes (Routes that are not nested under a specific route)s
app.use("/posts", require("./routes/posts"));
app.use("/signup", require("./routes/signup"));
app.use("/admin", require("./routes/admin"));

/*app.use('/login', loginRoutes); */

dotenv.config();

// MongoDB Connection
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DB_CONNECTION, {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection to MongoDB server: success"))
  .catch((err) => console.error(err));
mongoose.Promise = global.Promise;

// eslint-disable-next-line no-undef
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
