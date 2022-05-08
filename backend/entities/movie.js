const typeorm = require("typeorm");

const Movie = new typeorm.EntitySchema({
  name: "movie",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: "uuid",
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: {
      type: "date",
      nullable: true,
    },
    overview: {
      type: "text",
      nullable: true,
    },
    poster_url: {
      type: String,
      unique: false,
    },
    mean_mark: {
      type: "float",
      nullable: false,
      default: -1,
    },
  },
});

module.exports = Movie;
