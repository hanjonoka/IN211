const typeorm = require("typeorm");

const User = new typeorm.EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: String,
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
});

module.exports = User;
