const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      process.env.DB_NAME
  )
  .then(() => {
    console.log("Connecting to mongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to mongoDB", err);
  });
