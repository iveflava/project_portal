const Survey = require('./model/Survey');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class SurveyController {

    static async getSurvey(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            const userId = decoded.id;

            const surveyList = await Survey.find();
            const surveyListWithUserVoteStatus = surveyList.map(survey => {
                const userVoted = survey.answers.some(answer => answer.votes.includes(userId));
                const responseSurvey = { ...survey.toObject(), userVoted };
                delete responseSurvey.votes;
                return responseSurvey;
            });

            return res.status(200).json(surveyListWithUserVoteStatus);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении опроса' });
        }
    }

    static async vote(req, res) {
        try {
            const { surveyId, answerText } = req.body;
            const token = req.headers['authorization']?.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            const userId = decoded.id;

            if (!surveyId || !answerText) {
                return res.status(400).json({ message: 'Отсутствуют данные для голосования' });
            }

            const survey = await Survey.findById(surveyId);
            if (!survey) {
                return res.status(404).json({ message: 'Опрос не найден' });
            }

            const answer = survey.answers.find(a => a.text === answerText);
            if (!answer) {
                return res.status(404).json({ message: 'Ответ не найден' });
            }

            if (!answer.votes.includes(userId)) {
                answer.votes.push(userId);
            } else {
                return res.status(400).json({ message: 'Пользователь уже голосовал' });
            }

            await survey.save();

            return res.status(200).json({});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при голосовании' });
        }
    }
}

module.exports = SurveyController