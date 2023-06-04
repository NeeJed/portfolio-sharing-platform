const {Category} = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const alreadyExists = await Category.findOne({where: {name}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Категория с таким именем уже существует`))
        }
        const category = await Category.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const category = await Category.findOne(
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
        const category = await Category.destroy({
            where: {
                id: categoryId
            }
        })
        if (!category) {
            return next(ApiError.internal(`Категория не найдена`))
        }
        return res.json(category)
    }

}

module.exports = new CategoryController()
