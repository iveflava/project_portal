const User = require('../authRouter/models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const formidable = require('formidable');
const fs = require('fs');
const axios = require('axios')

class ProfileController {

    static async getProfile(req, res) {
        try {
            const accessToken = req.headers['authorization']?.split(' ')[1];

            if (!accessToken) {
                return res.status(401).json({ message: 'Отсутствует accessToken' });
            }

            jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Неверный или истекший accessToken' });
                }

                const existingUser = await User.findById(user.id);
                if (!existingUser) {
                    return res.status(404).json({ message: 'Пользователь не найден' });
                }

                return res.status(200).json({
                    _id: user.id,
                    firstName: existingUser.firstName,
                    secondName: existingUser.secondName,
                    avatarSrc: existingUser.avatarSrc,
                });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении профиля пользователя' });
        }
    }

    static async getFullProfileById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Отсутствует ID пользователя' });
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            return res.status(200).json({
                _id: user.id,
                firstName: user.firstName,
                secondName: user.secondName,
                aboutUser: user.aboutUser,
                country: user.country,
                city: user.city,
                role: user.role,
                birthday: user.birthday,
                hardwareAndSoftware: user.hardwareAndSoftware,
                books: user.books,
                accounts: {
                    instagram: user.accounts.instagram,
                    telegram: user.accounts.telegram,
                    mail: user.accounts.mail,
                },
                avatarSrc: user.avatarSrc,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении профиля пользователя' });
        }
    }

    static async updateFullProfileById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Отсутствует ID пользователя' });
            }

            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка при обработке формы' });
                }

                const data = {};
                for (let key in fields) {
                    if (Array.isArray(fields[key])) {
                        data[key] = fields[key][0];
                    } else {
                        data[key] = fields[key];
                    }
                }

                if (!data) {
                    return res.status(400).json({ message: 'Отсутствуют данные для обновления' });
                }

                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'Пользователь не найден' });
                }

                user.firstName = data.firstName || '';
                user.secondName = data.secondName || '';
                user.aboutUser = data.aboutUser || '';
                user.country = data.country || '';
                user.city = data.city || '';
                user.role = data.role || '';
                user.birthday = data.birthday || '';
                user.hardwareAndSoftware = data.hardwareAndSoftware || '';
                user.books = data.books || '';
                user.accounts.instagram = data.instagram || '';
                user.accounts.telegram = data.telegram || '';
                user.accounts.mail = data.mail || '';

                if (data.avatarBlob === 'HAS_BEEN_UPLOAD') {

                } else if (files.avatarBlob) {
                    console.log('Файл получен:', files.avatarBlob);

                    const imagePath = files.avatarBlob[0].filepath;

                    const imageBuffer = fs.readFileSync(imagePath);

                    const formData = new FormData();
                    formData.append('image', imageBuffer.toString('base64'));

                    try {
                        const response = await axios.post(
                            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }
                        );

                        if (response.data && response.data.data && response.data.data.url) {
                            user.avatarSrc = response.data.data.url;
                        } else {
                            return res.status(500).json({ message: 'Не удалось загрузить изображение' });
                        }
                    } catch (uploadError) {
                        console.error('Ошибка при загрузке изображения:', uploadError);
                        return res.status(500).json({ message: 'Ошибка при загрузке изображения на облако' });
                    }
                } else {
                    user.avatarSrc = '';
                }

                await user.save();

                const userResponse = {
                    id: user.id,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    aboutUser: user.aboutUser,
                    country: user.country,
                    city: user.city,
                    role: user.role,
                    birthday: user.birthday,
                    hardwareAndSoftware: user.hardwareAndSoftware,
                    books: user.books,
                    accounts: {
                        instagram: user.accounts.instagram,
                        telegram: user.accounts.telegram,
                        mail: user.accounts.mail,
                    },
                    avatarSrc: user.avatarSrc,
                };

                return res.status(200).json(userResponse);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при обновлении профиля' });
        }
    }
}

module.exports = ProfileController