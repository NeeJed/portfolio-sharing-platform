//const {Rank} = require('../models/models');
const prisma = require('../prisma')
const ApiError = require('../error/ApiError');

class RankController {
    async create(req, res) {
        const {name} = req.body
        const alreadyExists = await prisma.ranks.findUnique({where: {name}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Уровень с таким именем уже существует`))
        }
        const rank = await prisma.ranks.create({
            data: {name}
        })
        return res.json(rank)
    }

    async getAll(req, res) {
        const ranks = await prisma.ranks.findMany()
        return res.json(ranks)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const rank = await prisma.ranks.findUnique(
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
        const rank = await prisma.ranks.delete({
            where: {
                id: Number(rankId),
            }
        })
        if (!rank) {
            return next(ApiError.internal(`Уровень не найден`))
        }
        return res.json(rank)
    }

}

module.exports = new RankController()
