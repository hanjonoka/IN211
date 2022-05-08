const express = require("express");
const moviesHandler = require("../services/moviesApiHandler.js");
const { getRepository } = require("typeorm");
const Movie = require("../entities/movie");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.get("/", function (req, res) {
  getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.get("/list", (req, res) => moviesHandler.moviesListHandler(req, res));

router.get("/search", (req, res) =>
  moviesHandler.moviesSearchListHandler(req, res)
);

router.post("/new", (req, res) => moviesHandler.addMovieHandler(req, res));

router.delete("/delete/:movieId", function (req, res) {
  getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(200).json({ message: "Movie successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the movie" });
    });
});

router.post("/addComment", auth, (req, res) =>
  moviesHandler.addComment(req, res)
);

router.get("/getComments", (req, res) => moviesHandler.getComments(req, res));

router.post("/populate", (req, res) => moviesHandler.populate(req, res));

router.delete("/reset", function (req, res) {
  getRepository(Movie)
    .clear()
    .then(function () {
      res.status(200).json({ message: "Movies successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the movies" });
    });
});

module.exports = router;
