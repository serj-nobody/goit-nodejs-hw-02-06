const express = require('express');
const ctrl = require('../../controllers/auth');
const router = express.Router();

const { authenticate, upload } = require('../../middlewares');

router.post('/register', ctrl.register);

router.get('/verify/:verificationToken', ctrl.verify);

router.post('/verify', ctrl.resendEmail);

router.post('/login', ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.get('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;