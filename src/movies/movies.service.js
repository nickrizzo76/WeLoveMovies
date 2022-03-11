const knex = require("../db/connection");

const tableName = "movies";

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
  list,
  listShowing,
};