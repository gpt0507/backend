require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const port = 1300
require('./db/conn')

app.use(cors());
app.use(express.json());

// user routes
const userAuthroutes = require("./routes/user/userAuthRoutes")
app.use("/userauth/api", userAuthroutes);

app.get('/', (req, res) => {
  console.log("Home page API called")
  res.status(200).json("server start")
})

// start server
app.listen(port, () => {
  console.log(`Server start at port no. http://localhost:${port}`)
})
