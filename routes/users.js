const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersConrtoller = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication,usersConrtoller.profile);
router.post('/update/:id', passport.checkAuthentication,usersConrtoller.update);

router.get('/sign-up', usersConrtoller.signUp);    // localhost:8000/user/sign-up
router.get('/sign-in', usersConrtoller.signIn);    // localhost:8000/user/sign-in

router.post('/create', usersConrtoller.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersConrtoller.createSession);

router.get('/sign-out', usersConrtoller.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));// Request url

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersConrtoller.createSession);// Response url


module.exports = router;