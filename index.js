const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
app.use(cors());

//import your models
require("./models/quote");

mongoose
  .connect("mongodb+srv://jitendra:anti7@12@herokudeploy.lqcfa.mongodb.net/Quotes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require("./routes/quoteRoute.js")(app);

const PORT = process.env.PORT || 5000;

//Accessing the path module

const path = require("path");

//step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));

//step 2:
app.get("*", function(request, response){
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});