const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const transport = require("./routes/api/transport");
const bodyParser = require("body-parser");
const passport = require("passport");

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

//passport middleware

app.use(passport.initialize());

//passport config

require("./config/passport.js")(passport);

//ROUTES
app.use("/api/users", users);
app.use("/api/transport", transport);
app.use("/api/customer", customer);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port"));
