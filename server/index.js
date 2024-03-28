require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// const sequelize = require('./db');
// const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use(cors());
app.use('/api', router);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, post, get');
header("Access-Control-Max-Age", "3600");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Access-Control-Allow-Credentials", "true");

// error last midl
app.use(errorHandler);

const start = async () => {
    try {
        // await sequelize.authenticate();
        // await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started in PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();
