const typeorm = require("typeorm");

const Comment = new typeorm.EntitySchema({
  name: "comment",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: String,
    },
    mark: {
      type: "int",
      nullable: false,
    },
    user_id: {
      type: "uuid",
      nullable: false,
    },
    movie_id: {
      type: "uuid",
      nullable: false,
    },
    text: {
      type: "text",
      nullable: true,
    },
  },
  checks: [{ expression: `"mark" >= 0 AND "mark" <= 5` }],
});

module.exports = Comment;
