const { getRepository } = require("typeorm");
const Movie = require("../entities/movie");
const axios = require("axios");
const Comment = require("../entities/comment");
const User = require("../entities/user");

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
      overview: req.body.overview,
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
        overview: response.data.overview,
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

const addComment = async function (req, res) {
  const commentRepository = getRepository(Comment);
  const newComment = commentRepository.create({
    mark: req.body.mark,
    user_id: req.body.user_id,
    movie_id: req.body.movie_id,
    text: req.body.comment,
  });

  let comments = await commentRepository
    .createQueryBuilder()
    .where("movie_id = :movie_id", { movie_id: req.body.movie_id })
    .andWhere("user_id = :user_id", { user_id: req.body.user_id })
    .getMany();
  console.log(comments.length);
  if (comments.length > 0) {
    res.status(500).json({ message: "already commented" });
    return;
  }

  commentRepository
    .insert(newComment)
    .then(async function (newDocument) {
      res.status(201).json(newDocument);
      let comments = await commentRepository
        .createQueryBuilder()
        .select("*")
        .where("movie_id = :movie_id", { movie_id: req.body.movie_id })
        .execute();
      let mean = 0.0;
      comments.map((c) => {
        mean += parseFloat(c.mark);
      });
      mean /= comments.length;
      getRepository(Movie)
        .createQueryBuilder()
        .update({ mean_mark: mean })
        .where("id = :id", { id: req.body.movie_id })
        .execute();

      console.log(mean);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: "Error while creating comment" });
    });
};

const getComments = async function (req, res) {
  const commentRepository = getRepository(Comment);
  console.log(req.query);

  let comments = await commentRepository
    .createQueryBuilder()
    .select("*")
    .from(User, "user")
    .where("comment.movie_id = :movie_id", {
      movie_id: req.query.movie_id,
    })
    .andWhere("user.id = comment.user_id")
    .getRawMany();

  res.status(200).json(comments);
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
              overview: m.overview,
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
module.exports.addComment = addComment;
module.exports.getComments = getComments;
