const service = require("./movies.service");

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

async function list(req, res, _next) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listShowing();
    return res.json({ data });
  }
  
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  read: [movieExists, read],
  list,
  // movieExists,
};
