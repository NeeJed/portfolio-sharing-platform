const uuid = require('uuid');
const path = require('path');
const {Certificate, CertificateInfo} = require('../models/models');
const { json } = require('sequelize');

class CertificateController {
    async create(req, res) {
        const {name, typeId, info} = req.body
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

        const certificate = await Certificate.create({name, typeId, img: fileName})

        return res.json(certificate)
    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let certificates;
        // if (!brandId && !typeId) {
        //     devices = await Device.findAndCountAll({limit, offset})
        // }
        // if (brandId && !typeId) {
        //     devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        // }
        // if (!brandId && typeId) {
        //     devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        // }
        // if (brandId && typeId) {
        //     devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        // }
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
}

module.exports = new CertificateController()
