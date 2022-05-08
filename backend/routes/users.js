const express = require("express");
const { getRepository } = require("typeorm");
const User = require("../entities/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.get("/getById", function (req, res) {
  getRepository(User)
    .findOne({ where: { id: req.query.id } })
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "could not fetch user" });
    });
});

router.post("/new", async function (req, res) {
  const userRepository = getRepository(User);
  const pwd_hash = await bcrypt.hash(req.body.password, 10);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    pwd_hash: pwd_hash,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === "23505") {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

router.post("/login", function (req, res) {
  const userRepository = getRepository(User);
  userRepository
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Unknown account" });
        return;
      }
      bcrypt
        .compare(req.body.password, user.pwd_hash)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Wrong password" });
            return;
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "SECRETKEYDELAFLEMME", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          res.status(500).json({ message: "error on compare" });
          console.log(error);
          return;
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "error on login" });
      console.log(error);
      return;
    });
});

router.delete("/delete/:userId", function (req, res) {
  getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: "User successfully deleted" });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: "Error while deleting the user" });
    });
});

module.exports = router;
