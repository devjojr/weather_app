const express = require("express");
const app = express();
require("dotenv").config();

const mainRouter = require("./routes/main");

// middleware
app.use(express.static("./public"));

app.use("/", mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
