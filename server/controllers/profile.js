const getProfile = (req, res, db) => {
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
};

module.exports = { getProfile };
