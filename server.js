const express = require("express");

const bodyParser = require("body-parser")

const app = express();

const PORT = 8000;

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoute = require("./routes/user_route");

app.use(`/user`, userRoute);

app.listen(PORT, () => {
  console.log(`Hotel Library runs on port 
${PORT}`);
});
