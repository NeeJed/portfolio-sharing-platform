// const uuid = require('uuid');
// const path = require('path');
// const {Basket} = require('../models/models');
// const { json } = require('sequelize');

// class BasketController {
//     async create(req, res) {
//         const {name, typeId, info} = req.body
//         const {img} = req.files
//         let fileName = uuid.v4() + ".jpg"
//         img.mv(path.resolve(__dirname, '..', 'static', fileName))

//         if(info) {
//             info = JSON.parse(info)
//             info.foreach(i => 
//                 CertificateInfo.create({
//                     title: i.title,
//                     description: i.description,
//                     certificateId: certificate.id
//                 })    
//             )
//         }

//         const certificate = await Certificate.create({name, typeId, img: fileName})

//         return res.json(certificate)
//     }
// }

// module.exports = new BasketController()
