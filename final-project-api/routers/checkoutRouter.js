var express = require('express')
var router = express.Router()
const { checkoutController } = require('../controllers')

router.delete('/checkout', checkoutController.cartCheckout)
router.patch('/checkout', checkoutController.updateStock)
module.exports = router
