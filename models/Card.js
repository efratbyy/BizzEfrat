const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    cardId: {
      type: Number,
      required: true,
      unique: true
    },
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    address: {
      type: String,
      required: true,
      minlength: 2
    },
    phone: {
      type: String,
      required: true,
      minlength: 0
    },
    image: {
        type: String,
        required: true
    }
  });
  
  const User = mongoose.model("cards", cardSchema);
  module.exports = User;
  