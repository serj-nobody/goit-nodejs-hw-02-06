const express = require('express');
const ctrl = require('../../controllers/auth');
const router = express.Router();

const { authenticate } = require('../../middlewares');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.get('/logout', authenticate, ctrl.logout);

module.exports = router;