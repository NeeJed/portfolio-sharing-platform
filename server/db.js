const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        url: process.env.POSTGRES_URL,
    }
)

// const { Pool } = require('pg');

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// })

// pool.connect();

// module.exports = pool;