const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const ObjectId = require('mongoose').Types.ObjectId;


// Q-3 - Get the user's details
router.get("/:id", auth, async (req, res) => {
   try {
     let user = await User.findOne({_id: new ObjectId(req.params.id)});
     if (!user) return res.status(404).send("User does not exist");

     res.status(200).send(user);
   } catch (error) {
     res.status(400).send("ERROR in request")
   }
 });

module.exports = router;
