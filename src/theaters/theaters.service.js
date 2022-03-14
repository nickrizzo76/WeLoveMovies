const { add } = require("lodash");
const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const moviesReduce = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .then(moviesReduce);
}

function read(movie_id) {
  // join between theaters table and movies_theaters table
  return knex("movies")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "m.movie_id": "mt.movie_id" })
    .groupBy(theater_id);
}


module.exports = {
  list,
  read,
};