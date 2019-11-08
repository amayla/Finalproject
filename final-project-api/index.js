var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')


const app = express()
const port = 1001
const { authRouter, productRouter, cartRouter,checkoutRouter,transactionRouter } = require('./routers')



app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome to this API")
})



app.use(authRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(checkoutRouter)
app.use(transactionRouter)
app.use('/files/transferproof', express.static('./uploads/transfer'))
app.use('/files/products', express.static('./uploads/products'))

app.listen(port, () => console.log("Server up in port " + port))
