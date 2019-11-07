var express = require('express')
var router = express.Router()
const { productController } = require('../controllers')

router.get('/products', productController.getProduct)
router.get('/products/:id', productController.getProductDetail)
router.post('/products', productController.createProduct)
router.patch('/products/:id', productController.editProduct)
module.exports = router

