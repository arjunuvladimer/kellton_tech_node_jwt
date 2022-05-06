// Importing Libraries
const router = require('express').Router()
const CONTROLLER = require('../controller/User')

// SIGNUP USER
router.post('/register',CONTROLLER.signUp)

module.exports = router