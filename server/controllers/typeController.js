const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        const {name, categoryId} = req.body
        const alreadyExists = await Type.findOne({where: {name, categoryId}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Тип с таким именем в этой категории уже существует`))
        }
        const type = await Type.create({
            name: name,
            categoryId: categoryId,
        })
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const type = await Type.findOne(
            {
                where: {id},
            },
        )
        if (!type) {
            return next(ApiError.badRequest('Тип не найден'))
        }
        return res.json(type)
    }

    async getByCategoryId(req, res) {
        const {categoryId} = req.params
        const types = await Type.findAll({where: {categoryId: categoryId}})
        if (!types) {
            return next(ApiError.internal(`Типов относящихся к этой категории не существует`))
        }
        return res.json(types)
    }

    async deleteType(req, res, next) {
        const {typeId} = req.params
        const type = await Type.destroy({
            where: {
                id: typeId
            }
        })
        if (!type) {
            return next(ApiError.internal(`Тип не найден`))
        }
        return res.json(type)
    }

}

module.exports = new TypeController()
