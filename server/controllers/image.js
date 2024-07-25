const handleApiCall = (req, res) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: process.env.CLARIFAI_USER_ID,
      app_id: process.env.CLARIFAI_APP_ID
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
      Authorization: 'Key ' + process.env.CLARIFAI_PAT
    },
    body: raw
  };

  fetch(
    'https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs',
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
