const Router = require('express')
const router = new Router()
const NewsController = require('./newsController.js')
const AuthController = require('../authRouter/authController.js')
const { check } = require('express-validator')

router.get('/main-news', AuthController.verifyAccessToken, NewsController.getMainNews)

router.post('/news', [
    AuthController.verifyAccessToken,
    check('heading', 'Заголовок не может быть пустым').notEmpty(),
    check('text', 'Текст пользователя не может быть пустым').notEmpty(),
    check('heading', 'Заголовок должен быть больше 4 и меньше 70 символов').isLength({ min: 4, max: 70 }),
    check('text', 'Текст должен быть больше 4 и меньше 1000 символов').isLength({ min: 4, max: 1000 }),
    check('timestamp', 'Временная метка не может быть пустым').notEmpty(),
    check('img', 'Укажите адресс картинки').notEmpty(),
], NewsController.addNews)

module.exports = router