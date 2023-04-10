const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const UserInfo = sequelize.define('user_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    shareAccess: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const Certificate = sequelize.define('certificate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const CertificateInfo = sequelize.define('certificate_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
})

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Certificate)
Certificate.belongsTo(User)

Type.hasMany(Certificate)
Certificate.belongsTo(Type)

Certificate.hasMany(CertificateInfo, {as: 'info'})
CertificateInfo.belongsTo(Certificate)

module.exports = {
    User,
    UserInfo,
    Certificate,
    Type,
    Rating,
    CertificateInfo,
}
