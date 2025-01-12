const User = require('./models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {

    static generateTokens({ id, login }) {
        const accessToken = jwt.sign({ id, login }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id, login }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken }
    }

    static async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (errors.length) return res.status(400).send({ message: 'Ошибка регистрации', errors })

            const { login, password } = req.body;
            const candidate = await User.findOne({ login });

            if (candidate) {
                return res.status(400).send({ message: 'Пользователь с таким логином уже существует' })
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({
                login,
                password: hashPassword,
                firstName: '',
                secondName: '',
                country: '',
                city: '',
                accounts: {
                    instagram: '',
                    telegram: '',
                    mail: '',
                },
                role: '',
                aboutUser: '',
                birthday: '',
                hardwareAndSoftware: '',
                books: '',
                avatarSrc: '',
            });

            await user.save()

            const tokens = AuthController.generateTokens({ id: user.id, login })
            return res.status(200).json(tokens)
        } catch (e) {
            console.error(e)
            res.status(400).json({ message: 'Ошибка регистрации' })
        }
    }

    static async login(req, res) {
        const { login, password } = req.body
        const user = await User.findOne({ login })

        if (!user) return res.status(400).json({ message: `Пользователь не найден` })

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) return res.status(400).json({ message: `Неверный пароль` })

        const tokens = AuthController.generateTokens({ id: user.id, login })
        return res.status(200).json(tokens)
    }

    static async verifyAccessToken(req, res, next) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Неверный токен' });
            }
            req.user = user;
            next();
        });
    }

    static async refreshTokens(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(401).json({ message: 'Отсутствует refreshToken' });
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        const existingUser = await User.findById(user.id);
                        if (!existingUser) {
                            return res.status(404).json({ message: 'Пользователь не найден' });
                        }

                        const newRefreshToken = jwt.sign(
                            { id: user.id, login: user.login },
                            process.env.JWT_REFRESH_SECRET,
                            { expiresIn: '30d' }
                        );

                        const newAccessToken = jwt.sign(
                            { id: user.id, login: user.login },
                            process.env.JWT_ACCESS_SECRET,
                            { expiresIn: '15m' }
                        );

                        return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
                    }

                    return res.status(403).json({ message: 'Неверный refreshToken' });
                }

                const newAccessToken = jwt.sign(
                    { id: user.id, login: user.login },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: '15m' }
                );

                return res.status(200).json({ accessToken: newAccessToken, refreshToken });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при обновлении refreshToken' });
        }
    }

    static async verifyTokens(req, res) {
        try {
            const accessToken = req.headers['authorization']?.split(' ')[1];
            const refreshToken = req.body.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({ message: 'Отсутствует refreshToken' });
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Неверный refreshToken' });
                }

                if (accessToken) {
                    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err) => {
                        if (err) {
                            return res.status(403).json({ message: 'Неверный или истекший accessToken' });
                        }

                        return res.status(200).json({});
                    });
                } else {
                    return res.status(400).json({ message: 'Отсутствует accessToken' });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при проверке токенов' });
        }
    }


    static async mainNews(req, res) {
        return res.status(200).json([{ name: 'postilla' }, { name: 'maia' }]);
    }
}

module.exports = AuthController