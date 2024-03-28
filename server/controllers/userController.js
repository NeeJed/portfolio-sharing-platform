const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const uuid = require('uuid');
// const {User, UserInfo, Certificate} = require('../models/models');
const prisma = require('../prisma');
const { user_infos } = require('../prisma');
// users, user_infos, certificates

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
        const candidate = await prisma.users.findUnique({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await prisma.users.create({data: {
            email,
            role,
            password: hashPassword,
        }})
        const token = generateJwt(user.id, user.email, user.role)
        await prisma.user_infos.create({
            data: {
                img: 'defaultUserImage.jpg',
                userId: Number(user.id),
                name: user.email,
            }
        })
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await prisma.users.findUnique({where: {email}})
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
        page = Number(page) || 1
        limit = Number(limit) || 6
        categoryId = Number(categoryId)
        typeId = Number(typeId)
        rankId = Number(rankId)
        educationalStageId = educationalStageId
        let skip = page * limit - limit

        let users
        let certificates
        let count
        if (!categoryId && !typeId && !rankId) {
            certificates = await prisma.certificates.findMany()
        } else if (categoryId && !typeId && !rankId) {
            certificates = await prisma.certificates.findMany({where: {categoryId}})
        } else if (!categoryId && typeId && !rankId) {
            certificates = await prisma.certificates.findMany({where: {typeId}})
        } else if (!categoryId && !typeId && rankId) {
            certificates = await prisma.certificates.findMany({where: {rankId}})
        } else if (categoryId && typeId && !rankId) {
            certificates = await prisma.certificates.findMany({where: {categoryId, typeId}})
        } else if (categoryId && !typeId && rankId) {
            certificates = await prisma.certificates.findMany({where: {categoryId, rankId}})
        } else if (!categoryId && typeId && rankId) {
            certificates = await prisma.certificates.findMany({where: {typeId, rankId}})
        } else if (categoryId && typeId && rankId) {
            certificates = await prisma.certificates.findMany({where: {
                categoryId,
                typeId,
                rankId,
            }})
        }
        let suitableUsers = []
        certificates.map(certificate => suitableUsers.push(certificate.userId))
        suitableUsers = Array.from(new Set(suitableUsers))
        if (educationalStageId) {
            users = await prisma.user_infos.findMany({
                where: {
                    shareAccess: true,
                    userId: {contains: suitableUsers},
                    educationalStageId: educationalStageId,
                },
                take: limit,
                skip: skip,
            })
            count = await prisma.user_infos.count({
                where: {
                    shareAccess: true,
                    userId: {contains: suitableUsers},
                    educationalStageId: educationalStageId,
                },
            })
        } else {
            users = await prisma.user_infos.findMany({
                where: {
                    shareAccess: true,
                    userId: {in: suitableUsers},
                },
                take: limit,
                skip: skip,
            })
            count = await prisma.user_infos.count({
                where: {
                    shareAccess: true,
                    userId: {in: suitableUsers},
                    educationalStageId: educationalStageId,
                },
            })
        }
        return res.json({users, count})
    }

    async getUserById(req, res, next) {
        const {id} = req.params
        const user = await prisma.users.findUnique(
            {
                where: {id},
                include: {
                    user_infos: true,
                }
            },
        )
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        return res.json(user)
    }

    async getUserInfoById(req, res, next) {
        const {id} = req.params
        const user = await prisma.user_infos.findUnique(
            {
                where: {
                    id: Number(id),
                    userId: Number(id),
                },
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
            const user = await prisma.user_infos.update({
                where: {
                    id: Number(id),
                },
                data: {
                    shareAccess: newAccess,
                }
            })
            return res.json(user)
        } catch (e) {
            console.log('ошибка')
            return next(ApiError.badRequest('Ошибка изменения доступа'))
        }
    }

    async updateUserInfo(req, res, next) {
        const {id, name, lastName, birthday, phone, city, educationalStage, imgURL} = req.body
        console.log(req.body)
        let fileName = imgURL || 'defaultUserImage.jpg'
        if (req.files) {
            const {img} = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        // try {
            let user = await prisma.user_infos.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: name,
                    img: fileName,
                }
            })
            if (lastName && lastName !== 'null') {
                user = await prisma.user_infos.update({
                    data: {
                        lastName: lastName
                    },
                    where: {
                        id: Number(id)
                    }
                })
            }
            if (birthday && birthday !== 'null') {
                user = await prisma.user_infos.update({
                    data: {
                        birthday: new Date(birthday)
                    },
                    where: {
                        id: Number(id)
                    }
                })
            }
            if (phone && phone !== 'null') {
                user = await prisma.user_infos.update({
                    data: {
                        phoneNumber: phone
                    },
                    where: {
                        id: Number(id)
                    }
                })
            }
            if (city && city !== 'null') {
                user = await prisma.user_infos.update({
                    data: {
                        cityId: Number(city)
                    },
                    where: {
                        id: Number(id)
                    }
                }) 
            }
            if (educationalStage && educationalStage !== 'null') {
                user = await prisma.user_infos.update({
                    data: {
                        educationalStageId: Number(educationalStage)
                    },
                    where: {
                        id: Number(id)
                    }
                }) 
            }
            return res.json(user)
        // } catch (e) {
        //     return next(ApiError.badRequest('Ошибка изменения'))
        // }
    }
}

module.exports = new UserController()
