const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();


mongoose.connect(process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true

  }, () => console.log('connected to db'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.options('*', cors());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/weather', require('./routes/weather'));
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server is running  ${PORT}`))




