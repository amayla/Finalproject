var express = require('express')
var router = express.Router()
const { productController } = require('../controllers')
const uploadProduct = require('../helpers/uploadProduct')

router.get('/products', productController.getProduct)
router.get('/productscat', productController.getProductByCategory)
router.get('/products/:id', productController.getProductDetail)
router.delete('/products/:id', productController.deleteProduct)
// router.post('/products', productController.createProduct)
router.post('/products', uploadProduct.single('browse_file'), productController.createProduct)
router.patch('/products/:id', productController.editProduct)
module.exports = router

 