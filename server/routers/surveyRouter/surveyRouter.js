const Router = require('express')
const router = new Router()
const SurveyController = require('../surveyRouter/surveyController.js')
const AuthController = require('../authRouter/authController.js')
const { check } = require('express-validator')

router.get('/survey', AuthController.verifyAccessToken, SurveyController.getSurvey)
router.post('/vote', AuthController.verifyAccessToken, SurveyController.vote)

module.exports = router