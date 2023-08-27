const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//const User = require("../models/User");
const { User, validateUpdateUser } = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  updateuser,
  deleteuser,
  getalluser,
  getuser,
} = require("../controllers/userController");
router.put("/:id", verifyTokenAndAuthorization, updateuser);
router.get("/", getalluser);
//verifyTokenAndAdmin
router.get("/:id", getuser);
//verifyTokenAndAuthorization
router.delete("/:id", verifyTokenAndAuthorization, deleteuser);
module.exports = router;
