const mongoose = require('mongoose');
require('./User');

const CitySchema = new mongoose.Schema({

  coord: {
    lon: Number,
    lat: Number
  },
  main: {
    temp: Number,
    temp_min: Number,
    temp_max: Number,
  },
  dt: Number,
  name: {
    type: String
  },
  sys: {
    type: { type: Number },
    id: Number,
    country: String,
  },
  timezone: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('City', CitySchema);