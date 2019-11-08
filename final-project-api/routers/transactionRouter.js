var express = require('express')
var router = express.Router()
let uploadProof = require('../helpers/uploadProof')
const { transactionController } = require('../controllers')

router.get('/transaction', transactionController.getTransaction)
router.get('/transaction/:id', transactionController.getTransactionbyId)
router.get('/transactionbyuser', transactionController.getTransactionbyUserId)
router.patch('/transaction/:id', transactionController.updateTransactionStatus)
router.patch('/transhipstatus/:id', transactionController.updateShipping)
router.post('/transaction', transactionController.addToTransaction)
router.patch('/transactionproof/:id', uploadProof.single('browse_file'), transactionController.addTransferProof)
// router.get('/sendpdf', transactionController.sendPdf)
module.exports = router

