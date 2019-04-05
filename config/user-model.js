const db = require('../database/dbConfig');

module.exports = {
  addUser,
  getUserByFilter,
  getUserAndPass
};

function addUser(user) {
  return db('users')
    .insert(user)
    .then(newUserId => getUserByFilter({ id: newUserId[0] }).first());
}

function getUserByFilter(filter) {
  return db('users')
    .select('id', 'username')
    .where(filter);
}

function getUserAndPass(filter) {
  return db('users')
    .select()
    .where(filter);
}
