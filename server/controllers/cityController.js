// const {City} = require('../models/models');
const prisma = require('../prisma')
const ApiError = require('../error/ApiError');

class CityController {
    async getAll(req, res) {
        const cities = await prisma.cities.findMany({
            //attributes: ['id', 'name']
        })
        console.log(cities)
        return res.json(cities)
    }

    async getOneById(req, res, next) {
        const {cityId} = req.params
        console.log(cityId)
        try {
            const city = await prisma.cities.findUnique(
                {
                    where: {
                        id: Number(cityId)
                    },
                    //attributes: ['id', 'name'],
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
        const cities = await prisma.cities.findMany({
            where: {
                regionId: Number(regionId),
            },
            //attributes: ['id', 'name'],
        })
        if (!cities) {
            return next(ApiError.internal(`Городов, относящихся к этому региону не найдено`))
        }
        return res.json(cities)
    }

}

module.exports = new CityController()
