const knex = require("../db/connection");

// query reviews for a movie with critic information emedded into each review
function list(movie_id) {
  if (movie_id) {
    return knex("reviews as r")
      .select("r.*")
      .join("movies as m", "m.movie_id", "r.movie_id")
      .where({ "r.movie_id": movie_id })
      .then((reviews) => Promise.all(reviews.map(review => getWithCritic(review) )));
  }
}

// query review
function read(review_id) {
  return knex("reviews").where({ review_id: review_id }).first();
}

// query critic info
function getCriticInfo(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

// query review with critic info embedded into review object
async function getWithCritic(review) {
  review.critic = await getCriticInfo(review.critic_id);
  return review;
}

// delete review
function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

// update review with new review and with critic info
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => read(updatedReview.review_id))
    .then((review) => getWithCritic(review));
}

module.exports = {
  list,
  read,
  delete: destroy,
  update,
};
