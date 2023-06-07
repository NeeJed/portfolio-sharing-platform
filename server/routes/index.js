const Router = require('express');
const router = new Router();
const certificateRouter = require('./certificateRouter');
const categoryRouter = require('./categoryRouter');
const typeRouter = require('./typeRouter');
const rankRouter = require('./rankRouter');
const userRouter = require('./userRouter');
const regionRouter = require('./regionRouter');
const cityRouter = require('./cityRouter');
const educationalStageRouter = require('./educationalStageRouter');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/type', typeRouter);
router.use('/rank', rankRouter)
router.use('/certificate', certificateRouter);
router.use('/region', regionRouter);
router.use('/city', cityRouter);
router.use('/educationalStage', educationalStageRouter);

module.exports = router;
