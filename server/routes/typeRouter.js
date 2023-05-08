const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.get('/byCategoryId:categoryId', typeController.getByCategoryId)
router.delete('/deleteById:typeId', typeController.deleteType)

module.exports = router;
