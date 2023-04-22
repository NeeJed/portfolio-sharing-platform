const Router = require('express');
const router = new Router();
const rankController = require('../controllers/rankController')

router.post('/', rankController.create)
router.get('/', rankController.getAll)
router.delete('/deleteById:rankId', rankController.deleteRank)

module.exports = router;
