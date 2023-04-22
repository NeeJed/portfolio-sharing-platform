const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const {User, UserInfo} = require('../models/models');

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
            name: email,
            // img: path.resolve(__dirname, '..', 'static', "defaultUserImage.jpg"),
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

    async getAllUsers(req, res) {
        // let {limit, page} = req.query
        // page = page || 1
        // limit = limit || 9
        // let offset = page * limit - limit
        let users;
        users = await UserInfo.findAll()
        // users = await User.findAndCountAll({where: {shareAccess: true}, limit, offset})
        return res.json(users)
    }

    async getUserById(req, res) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
                include: [{model: UserInfo}]
            },
        )
        return res.json(user)
    }

    async getUserInfoById(req, res) {
        const {id} = req.params
            const user = await UserInfo.findOne(
            {
                where: {userId: id},
                // where: {shareAccess: true},
            },
        )
        return res.json(user)
    }
}

module.exports = new UserController()
