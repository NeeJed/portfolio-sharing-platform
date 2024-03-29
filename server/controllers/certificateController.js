const uuid = require('uuid');
const path = require('path');
// const {Certificate, CertificateInfo} = require('../models/models');
const prisma = require('../prisma')
const ApiError = require('../error/ApiError');

class CertificateController {
async create(req, res) {
    const {name, categoryId, typeId, rankId, userId, info} = req.body
    const {img} = req.files
    let fileName = uuid.v4() + ".jpg"
    img.mv(path.resolve(__dirname, '..', 'tmp/static', fileName))

    console.log({name, categoryId, typeId, rankId, userId, img: fileName})
    const certificate = await prisma.certificates.create({
        data: {
            name,
            categoryId: Number(categoryId),
            typeId: Number(typeId),
            rankId: Number(rankId),
            userId: Number(userId),
            img: fileName,
        }
    })

    if(info) {
        let information = JSON.parse(info)
        information.map(i => 
            prisma.certificate_infos.create({
                data: {
                    title: i.title,
                    description: i.description,
                    certificateId: certificate.id,
                }
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
            certificates = await prisma.certificates.findMany({limit, offset}),
            count = await prisma.certificates.count({
                limit, offset
            })
        }
        if (typeId && !rankId) {
            certificates = await prisma.certificates.findMany({where: {typeId}, limit, offset})
            count = await prisma.certificates.count({
                where: {typeId}, limit, offset
            })
        }
        if (!typeId && rankId) {
            certificates = await prisma.certificates.findMany({where: {rankId}, limit, offset})
            count = await prisma.certificates.count({
                where: {rankId}, limit, offset
            })
        }
        if (typeId && rankId) {
            certificates = await prisma.certificates.findMany({where: {typeId, rankId}, limit, offset})
            count = await prisma.certificates.count({
                where: {typeId, rankId}, limit, offset
            })
        }
        return res.json({certificates, count})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const certificate = await prisma.certificates.findUnique(
            {
                where: {id},
                include: {
                    certificate_infos: true,
                }
            },
        )
        if (!certificate) {
            return next(ApiError.internal(`Сертификат не найден`))
        }
        return res.json(certificate)
    }

    async getAllByUserId(req, res, next) {
        const {id} = req.params
        //let limit = 6;
        const certificate = await prisma.certificates.findMany({
            //limit,
            where: {userId: Number(id)},
            include: {
                certificate_infos: true,
            },
        })
        const count = await prisma.certificates.count({
            where: {userId: Number(id)},
        })
        if (!certificate) {
            return next(ApiError.internal(`Сертификаты не найдены`))
        }
        return res.json({certificate, count})
    }

    async update(req, res, next) {
        const {id, name, categoryId, typeId, rankId, userId, info, imgURL} = req.body
        let fileName = imgURL || null
        if (req.files) {
            const {img} = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'tmp/static', fileName))
        }
        
        console.log({id, name, categoryId, typeId, rankId, userId, img: fileName})
        try {
            const certificate = await prisma.certificates.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: name, 
                    categoryId: Number(categoryId), 
                    typeId: Number(typeId), 
                    rankId: Number(rankId),
                    img: fileName,
                }
            })
            if(info) {
                let information = JSON.parse(info)
                information.map(i => 
                    prisma.certificate_infos.update({
                        data: {
                            title: i.title,
                            description: i.description,
                        }
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
        const certificate = await prisma.certificates.delete({
            where: {
                id: Number(id)
            }
        })
        if (!certificate) {
            return next(ApiError.internal(`Сертификат не найден`))
        }
        return res.json(certificate)
    }
}

module.exports = new CertificateController()
