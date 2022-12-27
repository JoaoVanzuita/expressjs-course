const { Router } = require('express')
const User = require('../database/schemas/user')

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username && !password) {
    return res.send(401)
  }

  if (req.session.user) {
    // eslint-disable-next-line quotes
    return res.send(req.session.actualUser)
  }

  req.session.actualUser = {
    username
  }

  return res.send(req.session)
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  const userDB = await User.findOne({
    $or: [{ username }, { email }]
  })

  if(userDB){
    return res.status(400).send('user already exists')
  }

  const newUser = await User.create({username, email, password})

  return res.status(201).send(newUser)

})

module.exports = router