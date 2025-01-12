const Router = require('express')
const router = new Router()
const TeamController = require('./teamController.js')
const AuthController = require('../authRouter/authController.js')

router.get('/teams', AuthController.verifyAccessToken, TeamController.getTeams)
router.get('/teams/:teamId/add-member', AuthController.verifyAccessToken, TeamController.joinTeam)


module.exports = router