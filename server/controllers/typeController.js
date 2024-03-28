// const {Type} = require('../models/models');
const prisma = require('../prisma')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        const {name, categoryId} = req.body
        const alreadyExists = await prisma.types.findUnique({where: {name, categoryId}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Тип с таким именем в этой категории уже существует`))
        }
        const type = await prisma.types.create({
            data: {
                name: name,
                categoryId: Number(categoryId),
            }
        })
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await prisma.types.findMany()
        return res.json(types)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const type = await prisma.types.findUnique(
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
        const types = await prisma.types.findMany({where: {
            categoryId: Number(categoryId)
        }})
        if (!types) {
            return next(ApiError.internal(`Типов относящихся к этой категории не существует`))
        }
        return res.json(types)
    }

    async deleteType(req, res, next) {
        const {typeId} = req.params
        const type = await prisma.types.delete({
            where: {
                id: Number(typeId)
            }
        })
        if (!type) {
            return next(ApiError.internal(`Тип не найден`))
        }
        return res.json(type)
    }
}

module.exports = new TypeController()
