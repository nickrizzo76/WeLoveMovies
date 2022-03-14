const router = require("express").Router({ mergeParams: true });
const moviesController = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use('/:movieId/theaters', moviesController.movieExists, theatersRouter);
router.use('/:movieId/reviews', moviesController.movieExists, reviewsRouter);

router.route('/:movieId')
    .get(moviesController.read)
    .all(methodNotAllowed)

router.route('/')
    .get(moviesController.list)
    .all(methodNotAllowed)  

module.exports = router;