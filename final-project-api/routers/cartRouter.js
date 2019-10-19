var express = require('express')
var router = express.Router()
const { cartController } = require('../controllers')


router.get('/carts', cartController.getCart)
router.post('/carts', cartController.addToCart)
router.patch('/carts', cartController.updateCart)
router.delete('/carts', cartController.deleteCart)
module.exports = router