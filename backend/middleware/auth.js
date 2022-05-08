const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      req.isloggedin = false;
    } else {
      req.isloggedin = true;
      next();
    }
  } catch {
    res.status(401).json({
      message: 'Invalid request!',
    });
  }
};
