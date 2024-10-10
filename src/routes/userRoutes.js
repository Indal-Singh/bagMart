const express = require("express");
const router = express.Router();
const { register,login,logout } = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("user Route");
});

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
module.exports = router;
