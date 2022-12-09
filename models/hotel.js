const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const hotelScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  urlMaps: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Hotel", hotelScheme);
