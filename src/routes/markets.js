const { Router } = require('express')

const router = Router()

const supermarkets = [
  {
    id: 1,
    store: 'Whole Foods',
    distance: 0.6
  },
  {
    id: 2,
    store: 'Trader Joes',
    distance: 2.5
  },
  {
    id: 3,
    store: 'Albertsons',
    distance: 2.8
  },
  {
    id: 4,
    store: 'Trader Joes',
    distance: 3.5
  },
  {
    id: 5,
    store: 'Albertsons',
    distance: 1.8
  },
]

router.get('', (req, res) => {
  const { distance } = req.query
  const parsedDistance = parseFloat(distance)

  if(!isNaN(parsedDistance)){
    const filteredStores = supermarkets.filter(store => store.distance <= distance)

    return res.send(filteredStores)
  }

  res.send(supermarkets)
})

module.exports = router