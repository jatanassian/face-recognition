const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

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
    console.log('passwordMatch ->', passwordMatch);
    if (passwordMatch) {
      return res.json('Success');
    }
    return res.status(400).json('Error logging in');
  }
  res.status(400).json('Error logging in');
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then(hash => {
    database.users.push({
      id: '789',
      name,
      email,
      password: hash,
      entries: 0,
      joined: new Date(),
    });
    res.json(database.users.at(-1));
  });
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  const user = database.users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json('This user does not exist');
  }
  res.json(user);
});

app.post('/image', (req, res) => {
  const user = database.users.find(user => user.id === req.body.id);
  if (!user) {
    return res.status(404).json('This user does not exist');
  }
  user.entries++;
  res.json(user.entries);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
