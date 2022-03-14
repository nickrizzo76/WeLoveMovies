const knex = require("../db/connection");

function read(review_id) {
    return knex("reviews")
        .where({ review_id: review_id})
        .first();
}

function destroy(review_id) {
    console.log(`review_id: ${review_id}`)
    return knex("reviews")
        .where({ 'review_id': review_id }).del()
  }

module.exports = {
  read,
  delete: destroy,
};
