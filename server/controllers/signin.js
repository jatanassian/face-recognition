const handleSignIn = async (req, res, db, bcrypt) => {
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
};

module.exports = { handleSignIn };
