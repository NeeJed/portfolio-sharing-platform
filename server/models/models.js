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
    birthday: {type: DataTypes.DATE},
    phoneNumber: {type: DataTypes.STRING},
})

const Certificate = sequelize.define('certificate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false, allowNull: false},
})

const Rank = sequelize.define('rank', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
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

const Region = sequelize.define('region', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const EducationalStage = sequelize.define('educational_stage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Certificate)
Certificate.belongsTo(User)

EducationalStage.hasMany(UserInfo)
UserInfo.belongsTo(EducationalStage)

Region.hasMany(City)
City.belongsTo(Region)

City.hasMany(UserInfo)
UserInfo.belongsTo(City)

Category.hasMany(Type)
Type.belongsTo(Category)

Category.hasMany(Certificate)
Certificate.belongsTo(Category)

Type.hasMany(Certificate)
Certificate.belongsTo(Type)

Rank.hasMany(Certificate)
Certificate.belongsTo(Rank)

Certificate.hasMany(CertificateInfo, {as: 'info'})
CertificateInfo.belongsTo(Certificate)

module.exports = {
    User,
    UserInfo,
    Certificate,
    Category,
    Type,
    Rank,
    Rating,
    CertificateInfo,
    Region,
    City,
    EducationalStage,
}
