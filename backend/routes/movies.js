const express = require("express");
const moviesHandler = require("../services/moviesApiHandler.js");
const { getRepository } = require("typeorm");
const Movie = require("../entities/movie");
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

router.post("/new", function (req, res) {
  const movieRepository = getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    release_date: req.body.release_date,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
    });
});

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
