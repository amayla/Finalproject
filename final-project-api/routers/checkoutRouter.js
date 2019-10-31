var express = require('express')
var router = express.Router()
const { checkoutController } = require('../controllers')

router.post('/checkout', checkoutController.addToTransaction)
router.delete('/checkout', checkoutController.cartCheckout)
module.exports = router
