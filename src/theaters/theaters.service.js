const knex = require("../db/connection");

function read(movie_id) {
  // join between theaters table and movies_theaters table
  return knex("movies")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "m.movie_id": "mt.movie_id" })
    .groupBy(theater_id);
}

function list() {
    return knex("theaters")
}


module.exports = {
  list,
  read,
};