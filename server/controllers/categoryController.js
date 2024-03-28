// const {Category} = require('../models/models');
const ApiError = require('../error/ApiError');
const prisma = require('../prisma')

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const alreadyExists = await prisma.categories.findUnique({where: {name}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Категория с таким именем уже существует`))
        }
        const category = await prisma.categories.create({
            data: {name}
        })
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await prisma.categories.findMany()
        return res.json(categories)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const category = await prisma.categories.findUnique(
            {
                where: {id},
            },
        )
        if (!category) {
            return next(ApiError.badRequest('Категория не найдена'))
        }
        return res.json(category)
    }

    async deleteCategory(req, res, next) {
        const {categoryId} = req.params
        const category = await prisma.categories.delete({
            where: {
                id: Number(categoryId)
            }
        })
        if (!category) {
            return next(ApiError.internal(`Категория не найдена`))
        }
        return res.json(category)
    }

}

module.exports = new CategoryController()
