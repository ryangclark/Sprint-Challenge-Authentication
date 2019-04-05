const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('../auth/authenticate');
const userModel = require('./user-model');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function handleServerError(res, error) {
  console.error(error);
  return res
    .status(500)
    .json({ message: 'The request could not be completed.', error: error });
}

function register(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please provide `username` and `password` properties.',
      example: { username: 'newusername', password: 'superstrongpassword' }
    });
  }
  const newUser = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 12)
  };
  userModel
    .addUser(newUser)
    .then(addedUser => res.status(201).json(addedUser))
    .catch(error => handleServerError(res, error));
}

function login(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please provide `username` and `password` properties.',
      example: { username: 'user123', password: 'superstrongpassword' }
    });
  }
  userModel
    .getUserAndPass({ username: req.body.username })
    .first()
    .then(storedUser => {
      if (
        storedUser &&
        bcrypt.compareSync(req.body.password, storedUser.password)
      ) {
        res.status(200).json({
          token: generateToken(req.body),
          userId: storedUser.id,
          username: storedUser.username
        });
      } else {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => handleServerError(res, error));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
