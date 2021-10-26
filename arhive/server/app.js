const fs = require('fs');
const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const { createErr, cathErrAndSendAnswer } = require('./middleware/checkErrors');
const cookieParser = require("cookie-parser");


const app = express();

// app.set('trust proxy', 1);
// app.set('cookieName', 'connect.sid');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));

const apiRouterServer = require('./routes/apiRouterServer');
app.use('/api/v1/server', apiRouterServer);

app.use(createErr, cathErrAndSendAnswer);

module.exports = app;