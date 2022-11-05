const express = require('express');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

const { isValidId, authenticate } = require('../../middlewares');


router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContactById);

router.put('/:contactId', authenticate, isValidId, ctrl.updateContactById);

router.patch('/:contactId/favorite', authenticate, isValidId, ctrl.updateFavorite);

module.exports = router;
