const handleImage = (req, res, db) => {
  db('users')
    .where('id', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(user => res.json(user[0].entries))
    .catch(() => res.status(400).json('Unable to get entries'));
};

module.exports = { handleImage };
