const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  bcrypt.hash(password, 10).then(hashedPassword => {
    db.transaction(transaction => {
      // Insert into users table
      transaction('users')
        .returning('*')
        .insert({
          name,
          email,
          created_at: new Date()
        })
        .then(user => {
          // Insert into login table
          transaction('logins')
            .insert({
              hash: hashedPassword,
              user_id: user[0].id
            })
            .then(() => res.json(user[0]));
        })
        .then(transaction.commit)
        .catch(transaction.rollback);
    }).catch(() => res.status(400).json('Unable to register'));
  });
};

module.exports = {
  handleRegister
};
