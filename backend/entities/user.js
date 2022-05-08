const typeorm = require("typeorm");

const User = new typeorm.EntitySchema({
  name: "user",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: "uuid",
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
    pwd_hash: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    comments: {
      type: "one-to-many",
      target: "comment",
      cascade: true,
      inverseSide: "user",
    },
  },
});

module.exports = User;
