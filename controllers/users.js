const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');

// login routes

router.get('/login', (req, res) => {
    res.render('login.ejs', {error: ''});
});

router.post('/login', (req, res) =>{
    /*
    1.)lookup user in database on email
        if email doesnt exist, let user know credentials are invalid
        if email exist, begin password compare process
    2,)check if plain-text psswrd matches encrypted psswrd
        if no match, let user know credentials invalid
        if there is a match, create session
    3.)create user session w req.session
    4.)take user to landing page
    */
   User.findOne({email: req.body.email}, (err, user) => {
       if(!user) return res.render('login', {error: 'invalid credentials'});
       
       const isMatched = bcrypt.compareSync(req.body.password, user.password);
       if(!isMatched) return res.render('login', {error: 'invalid credentials'});
       
       req.session.user = user._id // creates session
        res.redirect('/')
    })
})

// signup routes

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) =>{
    // encrypt their plain-text password w bcrypt
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    // create user
    // redirect to login
    User.create(req.body, (err, user) => {
        res.redirect('/login');
    });
})

router.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    })
});

module.exports = router;