const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.post('/sign-in', (req, res) => signin.handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.getProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/image-url', (req, res) => image.handleApiCall(req, res));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
