var express = require('express')
var router = express.Router()
let uploadProof = require('../helpers/uploadProof')
const { transactionController } = require('../controllers')

router.get('/transaction', transactionController.getTransaction)
router.get('/transaction/:id', transactionController.getTransactionbyId)
router.patch('/transaction/:id', transactionController.updateTransaction)
router.post('/transaction', transactionController.addToTransaction)
router.patch('/transactionproof/:id', uploadProof.single('browse_file'), transactionController.addTransferProof)

module.exports = router

