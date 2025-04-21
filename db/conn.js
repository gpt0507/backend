const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB)
  .then(() => console.log('mongodb connected successfully. . .'))
  .catch((error) => console.log('error in database connection', error))