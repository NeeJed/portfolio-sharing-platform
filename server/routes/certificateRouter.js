const Router = require('express');
const router = new Router();
const certificateController = require('../controllers/certificateController')

router.post('/', certificateController.create)
router.get('/', certificateController.getAll)
router.get('/:id', certificateController.getOne)
router.get('/user/:id', certificateController.getAllByUserId)
router.put('/update', certificateController.update)
router.delete('/delete:id', certificateController.delete)

module.exports = router;
