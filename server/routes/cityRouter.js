const Router = require('express');
const router = new Router();
const cityController = require('../controllers/cityController')

router.get('/', cityController.getAll)
router.get('/getOneById:cityId', cityController.getOneById)
router.get('/byRegionId:regionId', cityController.getByRegionId)

module.exports = router;
