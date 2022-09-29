const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middlewares/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
    try {
      let user = await User.findById(req.payload._id);
      if (!user) return res.status(401).send("Unauthorized");
    } catch (error) {
      return res.status(400).send(error);
    }
  });

module.exports = router;
