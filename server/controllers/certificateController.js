const uuid = require('uuid');
const path = require('path');
const {Certificate, CertificateInfo} = require('../models/models');
const { json } = require('sequelize');
const ApiError = require('../error/ApiError');

class CertificateController {
    async create(req, res) {
        const {name, categoryId, typeId, rankId, userId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        console.log({name, categoryId, typeId, rankId, userId, img: fileName})
        const certificate = await Certificate.create({name, categoryId, typeId, rankId, userId, img: fileName})

        if(info) {
            let information = JSON.parse(info)
            information.map(i => 
                CertificateInfo.create({
                    title: i.title,
                    description: i.description,
                    certificateId: certificate.id
                })
            )
        }

        return res.json(certificate)
    }

    async getAll(req, res) {
        let {typeId, rankId, limit, page} = req.query
        page = page || 1
        limit = limit || 1
        let offset = page * limit - limit
        let certificates;
        if (!typeId && !rankId) {
            certificates = await Certificate.findAndCountAll({limit, offset})
        }
        if (typeId && !rankId) {
            certificates = await Certificate.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (!typeId && rankId) {
            certificates = await Certificate.findAndCountAll({where: {rankId}, limit, offset})
        }
        if (typeId && rankId) {
            certificates = await Certificate.findAndCountAll({where: {typeId, rankId}, limit, offset})
        }
        return res.json(certificates)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const certificate = await Certificate.findOne(
            {
                where: {id},
                include: [{model: CertificateInfo, as: 'info'}]
            },
        )
        if (!certificate) {
            return next(ApiError.internal(`Сертификат не найден`))
        }
        return res.json(certificate)
    }

    async getAllByUserId(req, res, next) {
        const {id} = req.params
        console.log(id)
        // limit = 6;
        const certificate = await Certificate.findAndCountAll(
            {
                // limit,
                where: {userId: id},
                include: [{model: CertificateInfo, as: 'info'}]
            },
        )
        if (!certificate) {
            return next(ApiError.internal(`Сертификаты не найдены`))
        }
        return res.json(certificate)
    }

    async update(req, res, next) {
        const {id, name, categoryId, typeId, rankId, userId, info, imgURL} = req.body
        let fileName = imgURL || null
        if (req.files) {
            const {img} = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        
        console.log({name, categoryId, typeId, rankId, userId, img: fileName})
        try {
            const certificate = await Certificate.update(
                {
                    name: name, 
                    categoryId: categoryId, 
                    typeId: typeId, 
                    rankId: rankId,
                    img: fileName
                },
                {
                    where: {
                        id: id,
                    }
                }
            )
            if(info) {
                let information = JSON.parse(info)
                information.map(i => 
                    CertificateInfo.update({
                        title: i.title,
                        description: i.description,
                    })
                )
            }
            return res.json(certificate)
        } catch (e) {
            return next(ApiError.badRequest('Ошибка изменения'))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const certificate = await Certificate.destroy({
            where: {
                id: id
            }
        })
        if (!certificate) {
            return next(ApiError.internal(`Сертификат не найден`))
        }
        return res.json(certificate)
    }
}

module.exports = new CertificateController()
