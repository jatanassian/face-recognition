const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('This is working');
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

/**
 * / => res = this is working
 * /sign-in => POST = success/fail (user?)
 * /register => POST = user
 * /profile/:userId => GET = user
 * /image => PUT = user
 */
