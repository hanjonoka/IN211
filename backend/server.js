const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const typeorm = require("typeorm");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const routeNotFoundJsonHandler = require("./services/routeNotFoundJsonHandler");
const jsonErrorHandler = require("./services/jsonErrorHandler");

typeorm.createConnection().then(() => {
  const app = express();

  app.use(logger("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Register routes
  app.use("/", indexRouter);
  app.use("/users", usersRouter);

  // Register 404 middleware and error handler
  app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
  app.use(jsonErrorHandler); // this error handler must be registered after all middlewares to catch all errors

  const port = parseInt(process.env.PORT || "8000");

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
