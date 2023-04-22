const uuid = require('uuid');
const path = require('path');
const {Certificate, CertificateInfo} = require('../models/models');
const { json } = require('sequelize');

class CertificateController {
    async create(req, res) {
        const {name, typeId, rankId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        if(info) {
            info = JSON.parse(info)
            info.foreach(i => 
                CertificateInfo.create({
                    title: i.title,
                    description: i.description,
                    certificateId: certificate.id
                })    
            )
        }

        const certificate = await Certificate.create({name, typeId, rankId, img: fileName})

        return res.json(certificate)
    }

    async getAll(req, res) {
        let {typeId, rankId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
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

    async getOne(req, res) {
        const {id} = req.params
        const certificate = await Certificate.findOne(
            {
                where: {id},
                include: [{model: CertificateInfo, as: 'info'}]
            },
        )
        return res.json(certificate)
    }

    async getAllByUserId(req, res) {
        const {id} = req.params
        limit = 6;
        const certificate = await Certificate.findAndCountAll(
            {
                limit,
                where: {userId: id},
                include: [{model: CertificateInfo, as: 'info'}]
            },
        )
        return res.json(certificate)
    }
}

module.exports = new CertificateController()
