const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema

const CustomerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  customer_name: {
    type: String,
    required: true
  },
  customer_contact_no: {
    type: Number,
    required: true
  },
  type_of_good: {
    type: Number,
    required: true
  },
  volume_length: {
    type: Number,
    required: true
  },
  volume_breadth: {
    type: Number,
    required: true
  },
  volume_height: {
    type: Number,
    required: true
  },

  route_a: {
    type: String,
    required: false
  },
  route_b: {
    type: String,
    required: false
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
