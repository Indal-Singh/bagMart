const express = require("express");
const router = express.Router();
const { register } = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("user Route");
});

router.post("/register", register);
module.exports = router;
