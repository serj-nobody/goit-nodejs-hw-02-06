const express = require('express');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

const { isValidId } = require('../../middlewares');


router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContactById);

router.put('/:contactId', isValidId, ctrl.updateContactById);

router.patch('/:contactId/favorite', isValidId, ctrl.updateFavorite);

module.exports = router;
