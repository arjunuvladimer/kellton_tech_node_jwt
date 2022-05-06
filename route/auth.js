// Importing Libraries
const router = require('express').Router()
const CONTROLLER = require('../controller/User')
const verify = require('./authVerify')

// SIGNUP USER
router.post('/register',CONTROLLER.signUp)


// LOGIN USER
router.post('/login', CONTROLLER.login)

// GET ALL USERS
router.get('/get__all',verify, CONTROLLER.getAllUsers)

module.exports = router