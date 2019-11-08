var express = require('express')
var router = express.Router()
const { authController } = require('../controllers')

router.get('/users', authController.getUser)
router.get('/users/:id', authController.getUser)
router.post('/users', authController.createUser)
router.get('/login', authController.loginUser)

module.exports = router