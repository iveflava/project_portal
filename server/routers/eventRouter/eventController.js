const Event = require('./model/Event');
const { validationResult } = require('express-validator');
require('dotenv').config();

class EventsController {

    static async getEvents(req, res) {
        try {
            const events = await Event.find();

            return res.status(200).json(events);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении событий' });
        }
    }
}

module.exports = EventsController