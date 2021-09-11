const app = require('express')();
const cors = require('cors');

app.use(cors());

const USER_LOGIN_CONNECTION_URL = process.env.USER_LOGIN_CONNECTION_URL
const APP_CONNECTION_URL = process.env.APP_CONNECTION_URL
