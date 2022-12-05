const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  hotelId: [
    {
      type: ObjectId,
      ref: "Hotel",
    },
  ],
});

module.exports = mongoose.model("Category", categoryScheme);
