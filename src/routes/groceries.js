const { Router } = require('express')

const router = Router()

const groceryList = [
  {
    item: 'milk',
    quantity: 2,
  },
  {
    item: 'cereal',
    quantity: 1,
  },
  {
    item: 'pop-tarts',
    quantity: 1,
  },
]

router.get('/', (req, res) => {
  res.cookie('visited', true, {
    maxAge: 24000 * 3600
  })

  res.send(groceryList)
})


router.post('/', (req, res) => {
  console.log(req.body)
  groceryList.push(req.body)
  res.send(201)
})

router.post('/cart/item', (req, res) => {
  const { item, quantity } = req.body
  const cartItem = { item, quantity }
  const { cart } = req.session

  if (cart) {
    req.session.cart.items.push(cartItem)
  } else {
    req.session.cart = {
      items: [cartItem]
    }
  }

  res.send(201)
})

router.get('/cart/items', (req, res) => {
  const { cart } = req.session

  if (!cart) {
    return res.send('You have no cart session')
  }

  res.send(cart)
})

router.get('/:item', (req, res) => {

  const { item } = req.params
  const groceryItem = groceryList.find(grocery => grocery.item === item)
  res.send(groceryItem)
})

module.exports = router
