const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const {User, UserInfo, Certificate} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
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
        let {categoryId, typeId, rankId, limit, page} = req.query
        page = page || 1
        limit = limit || 7
        categoryId = categoryId
        typeId = typeId
        rankId = rankId
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
        users = await UserInfo.findAndCountAll({where: {shareAccess: false, userId: suitableUsers}, limit, offset})
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
                // where: {shareAccess: true},
            },
        )
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
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
        const {id, name, lastName, birthday, phone} = req.body.params
        try {
            const user = await UserInfo.update(
                {
                    name: name,
                    lastName: lastName,
                    birthday: birthday,
                    phoneNumber: phone,
                }, 
                {
                    where: {
                        userId: id,
                    }
                }
            )
            return res.json(user)
        } catch (e) {
            return next(ApiError.badRequest('Ошибка изменения'))
        }
    }
}

module.exports = new UserController()
