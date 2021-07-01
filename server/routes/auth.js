const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/auth');
require('dotenv').config();


router.post('/register', async (req, res) => {
  const confirmPassword = req.body.confirmPassword

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  let errorsList = [];

  let isEmailValid = true
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (regexEmail.test(user.email) === false) {
    isEmailValid = false
    errorsList.push('Please enter a valid e-mail');
  }

  let isPasswordValid = true;
  if (user.password.length < 8) {
    errorsList.push('Password must be at least 8 characters long');
    isPasswordValid = false;
  }

  if (/[A-Z]/.test(user.password) === false) {
    errorsList.push('Password must contain an uppercase letter');
    isPasswordValid = false;
  }

  if (/\d/.test(user.password) === false) {
    errorsList.push('Password must contain at least one number');
    isPasswordValid = false;
  }

  if (/[^(A-Za-z\d)]/.test(user.password) === false) {
    errorsList.push('Password must contain at least one special character');
    isPasswordValid = false;
  }

  if (user.password !== confirmPassword) {
    errorsList.push('Password mismatch')
  }

  if (errorsList.length > 0) {
    res.status(400).send({ isDataValid: false, errorsList });
    return;
  }
  res.status(200).send({ message: 'Data is valid. User created.' })


  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const saveUser = await user.save()

});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean()

  if (!user) {
    return res.status(404).json({ status: 'error', error: 'Invalid email/password' })
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({
      id: user._id,
      email: user.email
    },
      process.env.SECRET,
      { algorithm: 'HS256' },
      { expiresIn: '2h' }
    )
    return res.json({ status: 'ok', token: "Bearer " + token })
  }
  return res.status(404).json({ status: 'error', error: 'Invalid email/password' })
})

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: 'error' });
  }
});


module.exports = router;




