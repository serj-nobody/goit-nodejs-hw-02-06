const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const removeContactById = require('./removeContactById');
const updateContactById = require('./updateContactById');
const updateFavorite = require('./updateFavorite');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateFavorite,
}