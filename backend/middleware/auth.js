const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "SECRETKEYDELAFLEMME");
    const userId = decodedToken.userId;
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      res.status(403).json({ message: "invalid token" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: "Invalid request!",
    });
  }
};
