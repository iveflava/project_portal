const Router = require('express')
const router = new Router()
const ProfileController = require('./profileController.js')
const AuthController = require('../authRouter/authController.js')
const { check } = require('express-validator')

router.get('/profile', AuthController.verifyAccessToken, ProfileController.getProfile)
router.get('/full-profile/:id', AuthController.verifyAccessToken, ProfileController.getFullProfileById)
router.patch('/full-profile/:id', AuthController.verifyAccessToken, ProfileController.updateFullProfileById)

module.exports = router