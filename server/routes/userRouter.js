const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/allusers', userController.getAllUsers)
router.get('/user:id', userController.getUserById)
router.get('/profile:id', userController.getUserInfoById)

module.exports = router;
