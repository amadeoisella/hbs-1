const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.URI)
  .then(() => console.log("Db connect"))
  .catch((error) => console.log("Error connection" + error));
