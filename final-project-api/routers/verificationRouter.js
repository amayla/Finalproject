var express = require('express')
var router = express.Router()
const { verificationController } = require('../controllers')


router.post('/sendmail', verificationController.sendVerificationEmail)
router.get('/sendmailnotice', verificationController.sendConfirmVerify)
router.get('/verifyuser', verificationController.verifyUser)

// router.get('/sendpdf', transactionController.sendPdf)
module.exports = router