const Router = require('express')
const router = new Router()
const EventController = require('./eventController.js')
const AuthController = require('../authRouter/authController.js')
const { check } = require('express-validator')

router.get('/main-events', AuthController.verifyAccessToken, EventController.getEvents)

module.exports = router