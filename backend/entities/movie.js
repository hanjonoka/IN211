const typeorm = require("typeorm");

const Movie = new typeorm.EntitySchema({
  name: "movie",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: String,
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: {
      type: "date",
      nullable: true,
    },
    poster_url: {
      type: String,
      unique: false,
    },
  },
});

module.exports = Movie;
