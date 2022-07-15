const express = require("express");

const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');
const toiletsRoutes = require('./routes/toilets');
const reportsRoutes = require('./routes/reports');
const imagesRoutes = require('./routes/images');

const router = express.Router();
router.use('/users', usersRoutes);
router.use('/toilets', toiletsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/reports', reportsRoutes);
router.use('/images', imagesRoutes);

module.exports = router;