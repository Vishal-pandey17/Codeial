const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile', usersConrtoller.profile);

router.get('/sign-up', usersConrtoller.signUp);    // localhost:8000/user/sign-up
router.get('/sign-in', usersConrtoller.signIn);    // localhost:8000/user/sign-in

router.post('/create', usersConrtoller.create);
module.exports = router;