const express = require('express');
const router = express.Router();
const City = require('../model/City');
const User = require('../model/User');
const auth = require('../Middleware/auth');


router.post('/city', auth, (req, res) => {
  const city = new City({
    coord: req.body.coord,
    main: req.body.main,
    dt: req.body.dt,
    sys: req.body.sys,
    timezone: req.body.timezone,
    name: req.body.name,
    date: req.body.date,
    user_id: req.user.id
  })
  city.save(function (err, saved) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(saved)
    }
  })
})


router.get('/city', auth, (req, res) => {
  City.find({ user_id: req.user.id }, function (err, data) {
    if (err || !data) {
      res.status(500).json(err)
    } else {
      res.status(200).json(data)
    }
  })
});


router.delete('/city', auth, (req, res) => {
  City.findByIdAndDelete(req.query.id, function (err, result) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router;