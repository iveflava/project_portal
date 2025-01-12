const News = require('./models/News');
const { validationResult } = require('express-validator');
require('dotenv').config();

class NewsController {

    static async getMainNews(req, res) {
        try {
            const newsList = await News.find()
                .sort({ timestamp: -1 })
                .select('-text -__v');

            return res.status(200).json(newsList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении новостей' });
        }
    }

    // TODO: Доделать как появится облачное хранилищие для изображений
    static async addNews(req, res) {
        try {
            const { heading, text, img } = req.body;

            const news = new News({
                heading,
                text,
                timestamp: Date.now(),
                img: img,
            });

            await news.save();

            return res.status(201).json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при добавлении новости' });
        }
    }

}

module.exports = NewsController