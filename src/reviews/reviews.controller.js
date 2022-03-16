const service = require("./reviews.service");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "/cannot be found/i",
  });
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };

  const data = await service.update(updatedReview);
  if (data) {
    return res.json({ data });
  }
  next({
    status: 404,
    message: "Review not updated",
  });
}

async function destroy(req, res, next) {
  const deleted = await service.delete(res.locals.review.review_id);
  if (deleted) return res.sendStatus(204);
  return next({ status: 500, message: `Review not deleted` });
}

async function list(req, res, next) {
    const { movie_id } = res.locals.movie
    const data = await service.list(movie_id)
    if(data) {
        return res.json({ data })
    }

}

module.exports = {
  list,
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
