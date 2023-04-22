const Router = require('express');
const router = new Router();
const certificateRouter = require('./certificateRouter');
const typeRouter = require('./typeRouter');
const rankRouter = require('./rankRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/rank', rankRouter)
router.use('/certificate', certificateRouter);

module.exports = router;
