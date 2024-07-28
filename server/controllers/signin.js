const handleSignIn = async (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Error logging in');
  }

  // Get user's id by email, then use user id to get login by user_id
  db.select('*')
    .from('users')
    .where({ email })
    .then(userData => {
      const { id, ...user } = userData[0];
      return db
        .select('hash')
        .from('logins')
        .where({ user_id: id })
        .then(async loginData => {
          const login = loginData[0];
          const isPasswordValid = await bcrypt.compare(password, login.hash);
          if (!isPasswordValid) {
            return res.status(400).json('Error logging in');
          }
          return res.json(user);
        })
        .catch(() => res.status(400).json('Error logging in'));
    })
    .catch(() => res.status(400).json('Error logging in'));
};

module.exports = { handleSignIn };
