const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
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
};

module.exports = {
  handleRegister
};
