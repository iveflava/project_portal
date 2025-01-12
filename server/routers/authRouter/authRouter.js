const Router = require('express')
const router = new Router()
const AuthController = require('./authController.js')
const { check } = require('express-validator')

router.post('/registration', [
    check('login', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4').isLength({ min: 4 }),
], AuthController.registration)
router.post('/login', AuthController.login)
router.post('/refresh', AuthController.refreshTokens)
router.post('/verify', AuthController.verifyTokens)

module.exports = router