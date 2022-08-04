const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.ojnc7.mongodb.net/panda-project"
  )
  .then(() => {
    console.log("Connecting to mongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to mongoDB", err);
  });
