const authController = require('./authController')
const productController = require('./productController')
const cartController = require('./cartController')
const checkoutController = require ('./checkoutController')
const transactionController = require ('./transactionController')
const verificationController = require ('./verificationController')

module.exports = {
    authController, 
    productController,
    cartController,
    checkoutController,
    transactionController,
    verificationController
}