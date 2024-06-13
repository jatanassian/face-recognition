const handleApiCall = (req, res) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID
    },
    inputs: [
      {
        data: {
          image: {
            url: req.body.input
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT
    },
    body: raw
  };

  fetch(
    `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(() => res.status(400).json('Unable to work with API'));
};

const handleImage = (req, res, db) => {
  db('users')
    .where('id', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(user => res.json(user[0].entries))
    .catch(() => res.status(400).json('Unable to get entries'));
};

module.exports = { handleImage, handleApiCall };
