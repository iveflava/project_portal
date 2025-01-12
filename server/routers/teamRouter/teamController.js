const Team = require('./models/Team');
const User = require('../authRouter/models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class TeamController {

    static async getTeams(req, res) {
        try {
            const teamsList = await Team.find().populate({
                path: 'members',
                select: '_id firstName secondName avatarSrc country city role',
            });

            return res.status(200).json(teamsList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении команд' });
        }
    }

    static async joinTeam(req, res) {
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

                const { teamId } = req.params;
                const team = await Team.findById(teamId);

                if (!team) {
                    return res.status(404).json({ message: 'Команда не найдена' });
                }

                const isAlreadyMember = team.members.some(
                    (memberId) => memberId.toString() === existingUser._id.toString()
                );

                if (isAlreadyMember) {
                    return res.status(400).json({ message: 'Пользователь уже является членом команды' });
                }

                team.members.push(existingUser._id);
                await team.save();

                const updatedTeam = await Team.findById(team._id)
                    .populate({
                        path: 'members',
                        select: '_id firstName secondName avatarSrc country city role',
                    });

                return res.status(200).json(updatedTeam);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при добавлении пользователя в команду' });
        }
    }
}

module.exports = TeamController