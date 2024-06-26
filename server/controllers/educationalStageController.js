// const {EducationalStage} = require('../models/models');
const prisma = require('../prisma')
const ApiError = require('../error/ApiError');

class EducationalStageController {
    async create(req, res) {
        const {name} = req.body
        const alreadyExists = await prisma.educational_stages.findUnique({where: {name}})
        if (alreadyExists) {
            return next(ApiError.badRequest(`Уровень образования с таким именем уже существует`))
        }
        const educationalStage = await prisma.educational_stages.create({
            data: {name}
        })
        return res.json(educationalStage)
    }

    async getAll(req, res) {
        const educationalStages = await prisma.educational_stages.findMany({
            //attributes: ['id', 'name']
        })
        return res.json(educationalStages)
    }

    async getOneById(req, res, next) {
        const {id} = req.params
        const educationalStage = await prisma.educational_stages.findUnique(
            {
                where: {id},
                //attributes: ['id', 'name'],
            },
        )
        if (!educationalStage) {
            return next(ApiError.badRequest('Уровень образования не найден'))
        }
        return res.json(educationalStage)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const educationalStage = await prisma.educational_stages.delete({
            where: {
                id: Number(id)
            }
        })
        if (!educationalStage) {
            return next(ApiError.internal(`Уровень образования не найден`))
        }
        return res.json(educationalStage)
    }
}

module.exports = new EducationalStageController()
