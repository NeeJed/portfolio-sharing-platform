const {Region} = require('../models/models');
const ApiError = require('../error/ApiError');

class RegionController {
    async getAll(req, res) {
        const regions = await Region.findAll({
            attributes: ['id', 'name']
        })
        return res.json(regions)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const region = await Region.findOne(
            {
                where: {id},
                attributes: ['id', 'name'],
            },
        )
        if (!region) {
            return next(ApiError.badRequest('Регион не найден'))
        }
        return res.json(region)
    }

}

module.exports = new RegionController()
