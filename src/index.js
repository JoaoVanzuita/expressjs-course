const express = require('express')
const groceriesRoute = require('./routes/groceries')
const marketsRoute = require('./routes/markets')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser())

app.use(session({
  secret: '6b32d4de-d256-41a6-8d13-ae6ca6f49773',
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`)
  next()
})

app.use('/api/groceries', groceriesRoute)
app.use('/api/markets', marketsRoute)

app.listen(PORT, () => console.log(`Server Online - Running on Port ${PORT}`))