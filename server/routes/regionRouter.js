const Router = require('express');
const router = new Router();
const regionController = require('../controllers/regionController')

router.get('/', regionController.getAll)
router.get('/getOneById:id', regionController.getOneById)

module.exports = router;
