var express = require('express')
var router = express.Router()
const { checkoutController } = require('../controllers')

router.delete('/checkout', checkoutController.cartCheckout)
router.patch('/checkoutqty', checkoutController.updateStock)
router.patch('/checkoutqtyoffline', checkoutController.updateStockOffline)
router.patch('/returnqty', checkoutController.returnStock)

module.exports = router
