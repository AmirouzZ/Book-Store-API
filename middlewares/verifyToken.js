const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json("invalid token");
    }
  } else {
    res.status(401).json("no token provided");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("you are not allowed");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    //if (req.user.id === "6416dfaa42218a2c2c05db33")
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json(req.user.isAdmin);
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
