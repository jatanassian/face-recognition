const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'YOUR_USER',
    password: 'YOUR_PASSWORD',
    database: 'YOUR_DB_NAME'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Error logging in');
  }

  db.select('email', 'hash')
    .from('login')
    .where({ email })
    .then(async data => {
      const user = data[0];
      const isPasswordValid = await bcrypt.compare(password, user.hash);
      if (!isPasswordValid) {
        return res.status(400).json('Error logging in');
      }
      return db
        .select('*')
        .from('users')
        .where({ email })
        .then(users => res.json(users[0]))
        .catch(() => res.status(400).json('Error logging in'));
    })
    .catch(() => res.status(400).json('Error logging in'));
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then(hashedPassword => {
    db.transaction(transaction => {
      // Insert into login table
      transaction('login')
        .insert({
          hash: hashedPassword,
          email
        })
        .then(() => {
          // Insert into users table
          transaction('users')
            .returning('*')
            .insert({
              name,
              email,
              joined: new Date()
            })
            .then(user => res.json(user[0]));
        })
        .then(transaction.commit)
        .catch(transaction.rollback);
    }).catch(() => res.status(400).json('Unable to register'));
  });
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  db('users')
    .select('*')
    .where({ id })
    .then(users => {
      if (users.length) {
        return res.json(users[0]);
      }
      res.status(404).json('This user does not exist');
    });
});

app.put('/image', (req, res) => {
  db('users')
    .where('id', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(user => res.json(user[0].entries))
    .catch(() => res.status(400).json('Unable do get entries'));
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
