const express = require("express");
const ownerModel = require("../models/owner.model");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Owner Route");
});

if (process.env.NODE_ENV == "development") {
  router.post("/create", async (req, res) => {
    const { name, email, password } = req.body;
    let owners = await ownerModel.find();
    if (owners.length > 0)
      res.status(503).send("You Don`t Have Permisttion To create Owners.");

    let createdUser = await ownerModel.create({
      fullname: name,
      email,
      password,
    });

    res.status(201).json(createdUser);
  });
}

module.exports = router;
