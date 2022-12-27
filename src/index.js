const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const groceriesRouter = require('./routes/groceries')
const marketsRouter = require('./routes/markets')
const authRouter = require('./routes/auth')
require('./database')

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

app.use('/api/auth', authRouter)

app.use((req, res, next) => {
  if (!req.session.actualUser) {
    return res.send(401)
  }
  next()
})

app.use('/api/groceries', groceriesRouter)
app.use('/api/markets', marketsRouter)

app.listen(PORT, () => console.log(`Server Online - Running on Port ${PORT}`))