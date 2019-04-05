const db = require('../database/dbConfig');

module.exports = {
  addUser,
  getUserByFilter
};

function addUser(user) {
  db('users')
    .insert(user)
    .then(newUserId => getUserByFilter({ id: newUserId }).first())
    .catch(error => console.error(error));
}

function getUserByFilter(filter) {
  db('users')
    .select('id', 'username')
    .where(filter);
}
