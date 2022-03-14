const service = require("./reviews.service");

async function reviewExists(req, res, next) {
    console.log(`req.params.reviewId: ${req.params.reviewId}`)
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    console.log(`res.locals.review.review_id: ${res.locals.review_id}`)
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function update(req, res, next) {
  // IMPLEMENT
  res.status(200);
}

async function destroy(req, res, next) {
    console.log(`review_id in controller ${res.locals.review.review_id}`)
  const deleted = await service.delete(res.locals.review.review_id);
  if (deleted) return res.sendStatus(204);
  return next({ status: 500, message: `Review not deleted` });
}


module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
