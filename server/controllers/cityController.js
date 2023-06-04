const {City} = require('../models/models');
const ApiError = require('../error/ApiError');

class CityController {
    async getAll(req, res) {
        const cities = await City.findAll({
            attributes: ['id', 'name']
        })
        return res.json(cities)
    }

    async getOneById(req, res, next) {
        const {cityId} = req.params
        console.log(cityId)
        try {
            const city = await City.findOne(
                {
                    where: {id: cityId},
                    attributes: ['id', 'name'],
                },
            )
            if (!city) {
                return next(ApiError.badRequest('Регион не найден'))
            }
            return res.json(city)
        } catch {
            return res.json(null)
        }
    }

    async getByRegionId(req, res) {
        const {regionId} = req.params
        const cities = await City.findAll({
            where: {regionId: regionId},
            attributes: ['id', 'name'],
        })
        if (!cities) {
            return next(ApiError.internal(`Городов, относящихся к этому региону не найдено`))
        }
        return res.json(cities)
    }

}

module.exports = new CityController()
