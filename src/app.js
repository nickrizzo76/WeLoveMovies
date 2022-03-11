const express = require("express");
const app = express();
const cors = require("cors");
const notFound = ("./errors/notFound")
const errorHandler = ("./errors/errorHandler")
const moviesRouter = require("./movies/movies.router");

app.use(express.json());
//app.use(cors());

app.use("/movies", moviesRouter);

// app.use(notFound);
// app.use(errorHandler);

// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
  });
  
  // Error handler
  app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });

module.exports = app;
