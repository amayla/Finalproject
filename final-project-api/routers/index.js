const authRouter = require('./authRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const checkoutRouter = require('./checkoutRouter')
const transactionRouter = require('./transactionRouter')
const verificationRouter = require('./verificationRouter')

module.exports = {
    authRouter, 
    productRouter,
    cartRouter,
    checkoutRouter,
    transactionRouter,
    verificationRouter
}
