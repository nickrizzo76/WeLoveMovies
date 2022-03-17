const service = require("./movies.service");

// middleware for checking that movie exists for movieId param
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

// list movies
async function list(req, res, _next) {
  const { is_showing } = req.query;
  // only list movies that are showing
  if (is_showing) {
    const data = await service.listShowing();
    return res.json({ data });
  }

  // list all movies
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  read: [movieExists, read],
  list,
  movieExists,
};
