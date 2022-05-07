const { getRepository } = require("typeorm");
const Movie = require("../entities/movie");
const axios = require("axios");

/*
API parameters : offset, limit, field, order(ASC|DESC)
*/
const moviesListHandler = async function (req, res) {
  let movieRepository = getRepository(Movie);

  let offset = req.query.offset ? parseInt(req.query.offset) : 0;
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let order =
    req.query.order === "ASC" || req.query.order === "DESC"
      ? req.query.order
      : "ASC";

  let filter = {
    skip: offset,
    take: limit,
    order: {},
  };
  req.query.field
    ? (filter.order[req.query.field] = order)
    : (filter.order["title"] = order);
  let moviesList = await movieRepository.find(filter);

  res.status(200).json(moviesList);
};

const moviesSearchListHandler = async function (req, res) {
  let movieRepository = getRepository(Movie);
  let moviesList = await movieRepository
    .createQueryBuilder()
    .where("UPPER(title) LIKE UPPER(:search)", {
      search: "%" + req.query.search + "%",
    })
    .orderBy("title")
    .getMany();

  res.status(200).json(moviesList);
};

const addMovieHandler = async function (req, res) {
  const movieRepository = getRepository(Movie);

  if (req.body.tmdb_id === "") {
    const newMovie = movieRepository.create({
      title: req.body.title,
      date: req.body.date,
      poster_url: req.body.poster_url,
    });

    movieRepository
      .insert(newMovie)
      .then(function (newDocument) {
        res.status(201).json(newDocument);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ message: "Error while creating the movie." });
      });
  }
  axios
    .get(`https://api.themoviedb.org/3/movie/${req.body.tmdb_id}`, {
      params: { api_key: "a0a7e40dc8162ed7e37aa2fc97db5654" },
    })
    .then((response) => {
      const movieRepository = getRepository(Movie);
      const newMovie = movieRepository.create({
        title: response.data.original_title,
        release_date: response.data.release_date,
        poster_url:
          "https://image.tmdb.org/t/p/w200" + response.data.poster_path,
      });
      movieRepository
        .insert(newMovie)
        .then(function (newDocument) {
          res.status(201).json(newDocument);
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).json({ message: "Error while creating the movie!" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error while creating movie" });
    });
};

const populate = async function (req, res) {
  let movieRepository = getRepository(Movie);
  for (let i = 1; i < 21; i++) {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?page=` + i, {
        params: { api_key: "a0a7e40dc8162ed7e37aa2fc97db5654" },
      })
      .then((response) => {
        let table_mov = [];
        response.data.results.map((m) => {
          table_mov.push(
            movieRepository.create({
              title: m.original_title,
              release_date: m.release_date ? m.release_date : null,
              poster_url: "https://image.tmdb.org/t/p/w200" + m.poster_path,
            })
          );
        });
        getRepository(Movie)
          .insert(table_mov)
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    getRepository(Movie);
  }
  res.status(200).json({ message: "Database populated" });
};

module.exports.moviesListHandler = moviesListHandler;
module.exports.populate = populate;
module.exports.moviesSearchListHandler = moviesSearchListHandler;
module.exports.addMovieHandler = addMovieHandler;
