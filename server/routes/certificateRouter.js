const Router = require('express');
const router = new Router();
const certificateController = require('../controllers/certificateController')

router.post('/', certificateController.create)
router.get('/', certificateController.getAll)
router.get('/:id', certificateController.getOne)

module.exports = router;