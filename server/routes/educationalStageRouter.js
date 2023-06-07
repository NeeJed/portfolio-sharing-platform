const Router = require('express');
const router = new Router();
const educationalStageController = require('../controllers/educationalStageController')

router.get('/', educationalStageController.getAll)
router.get('/getOneById:id', educationalStageController.getOneById)
router.post('/', educationalStageController.create)
router.delete('/deleteById:id', educationalStageController.delete)

module.exports = router;
