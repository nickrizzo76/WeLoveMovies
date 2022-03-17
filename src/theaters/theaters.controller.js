const service = require("./theaters.service");

// list all theaters
async function list(req, res, next) {
  // only list theaters if there is a movieId param in the route
  if (res.locals.movie) {
    const data = await service.getTheatersShowingMovie(res.locals.movie.movie_id);
    if (data) {
      return res.json({ data });
    }
    next({
      status: 404,
      message: "That movie is not currently playing in theaters", // message not specified by test cases
    });
  } else {
    // list all theaters (no movieId param)
    const data = await service.list();
    if (data) {
      return res.json({ data });
    }
    next({
      status: 404,
      message: "There are no theaters", // message not specified by test cases
    });
  }
}

module.exports = {
  list,
};
