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
    database: 'YOUR_DB_NAME',
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

// Mock database - to remove once DB implemented
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: '$2b$10$/xDQNoeSuw4P8P.7vdtPUOF8w1Yu1ne7wKVKwd7GwwdOAesKPXssa',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '456',
      name: 'Jack',
      email: 'jack@gmail.com',
      password: 'jack',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res) => {
  res.json(database.users);
});

app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const passwordMatch = await bcrypt.compare(
      password,
      '$2b$10$/xDQNoeSuw4P8P.7vdtPUOF8w1Yu1ne7wKVKwd7GwwdOAesKPXssa' // 'test'
    );

    if (passwordMatch) {
      return res.json(database.users[0]);
    }
    return res.status(400).json('Error logging in');
  }
  res.status(400).json('Error logging in');
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then(hashedPassword => {
    db.transaction(transaction => {
      // Insert into login table
      transaction('login')
        .insert({
          hash: hashedPassword,
          email,
        })
        .then(() => {
          // Insert into users table
          transaction('users')
            .returning('*')
            .insert({
              name,
              email,
              joined: new Date(),
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
