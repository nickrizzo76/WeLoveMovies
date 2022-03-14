const router = require("express").Router({ mergeParams: true });
const moviesController = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router")
const methodNotAllowed = require("../errors/methodNotAllowed");

//router.route('/:movieId/theaters', moviesController.movieExists, theatersRouter)  

router.route('/:movieId')
    .get(moviesController.read)
    .all(methodNotAllowed)

router.route('/')
    .get(moviesController.list)
    .all(methodNotAllowed)  

module.exports = router;