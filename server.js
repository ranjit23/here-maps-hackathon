const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const bodyParser = require("body-parser");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
//CONNECT
mongoose
  .connect(db)
  .then(() => console.log("mongo connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("HEllo"));

//ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port ${port}"));
