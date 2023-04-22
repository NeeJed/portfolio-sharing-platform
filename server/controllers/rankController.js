const {Rank} = require('../models/models');
const ApiError = require('../error/ApiError');

class RankController {
    async create(req, res) {
        const {name} = req.body
        const rank = await Rank.create({name})
        return res.json(rank)
    }

    async getAll(req, res) {
        const ranks = await Rank.findAll()
        return res.json(ranks)
    }

    async deleteRank(req, res) {
        const {rankId} = req.params
        const rank = await Rank.destroy({
            where: {
                id: rankId
            }
        })
        return res.json(rank)
    }

}

module.exports = new RankController()
