const {Rank} = require('../models/models');
const ApiError = require('../error/ApiError');

class RankController {
    async create(req, res) {
        const {name} = req.body
        const alreadyExists = await Rank.findOne({where: {name}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Уровень с таким именем уже существует`))
        }
        const rank = await Rank.create({name})
        return res.json(rank)
    }

    async getAll(req, res) {
        const ranks = await Rank.findAll()
        return res.json(ranks)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const rank = await Rank.findOne(
            {
                where: {id},
            },
        )
        if (!rank) {
            return next(ApiError.badRequest('Уровень не найден'))
        }
        return res.json(rank)
    }

    async deleteRank(req, res, next) {
        const {rankId} = req.params
        const rank = await Rank.destroy({
            where: {
                id: rankId
            }
        })
        if (!rank) {
            return next(ApiError.internal(`Уровень не найден`))
        }
        return res.json(rank)
    }

}

module.exports = new RankController()
