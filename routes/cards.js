const express = require("express");
const router = express.Router();
const joi = require("joi");
const _ = require("lodash");
const Card = require("../models/Card");
const auth = require("../middlewares/auth");


const cardSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required().min(2).max(255),
    address: joi.string().required().min(2),
    phone: joi.string().required().min(0),
    image: joi.string().required()
  });

  //Q-4 - Create a business card and issuing a random number
  router.post("/", auth, async (req, res) => {
    try {
      // joi validation
      const { error } = cardSchema.validate(req.body);
      if (error) return res.status(400).send(error.message);
  
      // create random bizNumber
      do  {
        var rndNumber = _.random(8000, 9999999);
        let res = await Card.findOne({ cardId: rndNumber });
      } 
      while (!res)

      // add new card
      card = new Card(req.body);
      card.cardId = rndNumber;
      card.userId = req.payload._id;
      await card.save();
  
      res.status(201).send(card);
    } catch (error) {
      res.status(400).send(error);
    }
  });


  const idSchema = joi.object({
    cardId: joi.number().required()
  });


// Q-5 - Get all the card's detailed
  router.get("/:id", auth, async (req, res) => {
    try {
      let cardDetail = await Card.findOne({cardId: req.params.id});
      if (!cardDetail) return res.status(404).send("Theres no such card");

      res.status(200).send(cardDetail);
    } catch (error) {
      res.status(400).send("ERROR in request")
    }
  });


  //Q-6 - Edit card details
  router.put("/:id", auth, async (req, res) => {
    try {
      const { error } = cardSchema.validate(req.body);
      if (error) return res.status(400).send(error.message);

      let editCard = await Card.findOne({cardId: req.params.id});
      if (!editCard) return res.status(404).send("Theres no such card");

      newCard = await Card.findOneAndUpdate(
        { cardId: req.params.id },
        req.body,
        { new: true }
      );

      res.status(200).send("Card update successfully!");

    } catch (error) {
       res.status(400).send("ERROR in request")
    }
});


//Q-7 - Delete a card
router.delete("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findOneAndRemove({cardId: req.params.id});
    if (!card) return res.status(404).send("Theres no such card");

    res.status(200).send("Card deleted  successfully!");
  } catch (error) {
    res.status(400).send("Error in delete card");
  }
});

//Q-8 - Get all the user's cards
router.get("/getcards/:userId", auth, async (req, res) => {
  try {
    let bizCard = await Card.find({userId: req.params.userId});

    res.status(200).send(bizCard);
  } catch (error) {
    res.status(400).send("ERROR in request")
  }
});


//Q-9 - Get all cards
router.get("/",auth,  async (req, res) => {
  try {
    let allCards = await Card.find();

    res.status(200).send(allCards);
  } catch (error) {
    res.status(400).send("ERROR in request")
  }
});


  module.exports = router;
