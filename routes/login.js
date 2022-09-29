const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginSchemaJoi = joi.object({
    email: joi.string().required().email().min(5),
    password: joi.string().required().min(8)
});

//Q-2 - Login - V
router.post("/", async (req, res) => {
    try {
        const { error } = loginSchemaJoi.validate(req.body);
        if (error) return res.status(400).send(error.message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Wrong email or password");

        const comparResult = await bcrypt.compare(
            req.body.password,
            user.password
            );
        if (!comparResult) return res.status(400).send("Wrong email or password");
    
        const genToken = jwt.sign({_id: user._id, biz: user.biz}, process.env.secretKey);

        res.status(200).send({ token: genToken });

    } catch (error) {
        res.status(400).send("ERROR in login");
    }
});

module.exports = router;
