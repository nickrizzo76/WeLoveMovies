const knex = require("../db/connection");

const tableName = "movies";

function read(movie_id) {
  return knex(tableName)
    .select("*")
    .where({ movie_id: movie_id })
    .first()
}

function list() {
  return knex(tableName).select("*");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

module.exports = {
  read,
  list,
  listShowing,
};