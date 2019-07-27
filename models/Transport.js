const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema

const TransportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  company_name: {
    type: String,
    required: true
  },
  company_contact: {
    type: Number,
    required: true
  },
  no_of_vehicle: {
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

  departure_date: {
    type: Date,
    required: true
  },
  departure_time: {
    type: Date,
    required: true
  },
  route_a: {
    type: String,
    required: true
  },
  route_b: {
    type: String,
    required: true
  },
  vehicle_no: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transport = mongoose.model("transport", TransportSchema);
