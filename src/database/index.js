const mongoose = require('mongoose')

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(`An error occurred: ${err}`))