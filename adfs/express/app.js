require('dotenv').config();
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const cookieParser = require("cookie-parser");
const { createErr, cathErrAndSendAnswer } = require('./middleware/checkErrors');
const PORT = process.env.PORT || 3005;
const app = express();

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));

app.use('/', require('./router'));

app.use(createErr, cathErrAndSendAnswer);

app.listen(PORT, () => {
  console.log('Сервер газанул ', PORT)
})
