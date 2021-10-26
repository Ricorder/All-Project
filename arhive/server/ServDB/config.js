require('dotenv').config()
const express = require('express');
const app = express();

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
}

module.exports = {
  options
}
