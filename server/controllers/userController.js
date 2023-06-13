const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const uuid = require('uuid');
const {User, UserInfo, Certificate} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '168h'},
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        await UserInfo.create({
            img: 'defaultUserImage.jpg',
            userId: user.id,
            name: user.email,
        })
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAllUsers(req, res, next) {
        let {categoryId, typeId, rankId, educationalStageId, limit, page} = req.query
        page = page || 1
        limit = limit || 7
        categoryId = categoryId
        typeId = typeId
        rankId = rankId
        educationalStageId = educationalStageId
        let offset = page * limit - limit
        let users
        let certificates
        if (!categoryId && !typeId && !rankId) {
            certificates = await Certificate.findAll()
        } else if (categoryId && !typeId && !rankId) {
            certificates = await Certificate.findAll({where: {categoryId}})
        } else if (!categoryId && typeId && !rankId) {
            certificates = await Certificate.findAll({where: {typeId}})
        } else if (!categoryId && !typeId && rankId) {
            certificates = await Certificate.findAll({where: {rankId}})
        } else if (categoryId && typeId && !rankId) {
            certificates = await Certificate.findAll({where: {categoryId, typeId}})
        } else if (categoryId && !typeId && rankId) {
            certificates = await Certificate.findAll({where: {categoryId, rankId}})
        } else if (!categoryId && typeId && rankId) {
            certificates = await Certificate.findAll({where: {typeId, rankId}})
        } else if (categoryId && typeId && rankId) {
            certificates = await Certificate.findAll({where: {
                categoryId,
                typeId,
                rankId,
            }})
        }
        let suitableUsers = []
        certificates.map(certificate => suitableUsers.push(certificate.dataValues.userId))
        suitableUsers = Array.from(new Set(suitableUsers))
        if (educationalStageId) {
            users = await UserInfo.findAndCountAll({
                where: {
                    shareAccess: true,
                    userId: suitableUsers,
                    educationalStageId: educationalStageId,
                }, limit, offset
            })
        } else {
            users = await UserInfo.findAndCountAll({
                where: { shareAccess: true, userId: suitableUsers,}, limit, offset
            })
        }
        return res.json(users)
    }

    async getUserById(req, res, next) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
                include: [{model: UserInfo}]
            },
        )
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        return res.json(user)
    }

    async getUserInfoById(req, res, next) {
        const {id} = req.params
        const user = await UserInfo.findOne(
            {
                where: {userId: id},
            },
        )
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        // if (user.shareAccess === false) {
        //     return next(ApiError.forbidden('Пользователь запретил доступ к просмотру профиля'))
        // }
        return res.json(user)
    }

    async updateUserShareAccess(req, res, next) {
        const {id, access} = req.params
        let newAccess = access === 'true' ? false : true
        try {
            const user = await UserInfo.update(
                {
                    shareAccess: newAccess,
                }, 
                {
                    where: {
                        userId: id,
                    }
                }
            )
            return res.json(user)
        } catch (e) {
            return next(ApiError.badRequest('Ошибка изменения доступа'))
        }
    }

    async updateUserInfo(req, res, next) {
        const {id, name, lastName, birthday, phone, city, educationalStage, imgURL} = req.body
        let fileName = imgURL || 'defaultUserImage.jpg'
        if (req.files) {
            const {img} = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        try {
            const user = await UserInfo.update(
                {
                    name: name,
                    img: fileName,
                }, 
                {
                    where: {
                        userId: id,
                    }
                }
            )
            if (lastName && lastName !== 'null') {
                const user = await UserInfo.update({lastName: lastName,}, 
                    {where: {userId: id}
                })
            }
            if (birthday && birthday !== 'null') {
                const user = await UserInfo.update({birthday: birthday}, 
                    {where: {userId: id}
                })
            }
            if (phone && phone !== 'null') {
                const user = await UserInfo.update({phoneNumber: phone}, 
                    {where: {userId: id}
                })
            }
            if (city && city !== 'null') {
                const user = await UserInfo.update({cityId: city}, 
                    {where: {userId: id}
                })
            }
            if (educationalStage && educationalStage !== 'null') {
                const user = await UserInfo.update({educationalStageId: educationalStage}, 
                    {where: {userId: id}
                })
            }
            return res.json(user)
        } catch (e) {
            return next(ApiError.badRequest('Ошибка изменения'))
        }
    }
}

module.exports = new UserController()
