const express = require('express');
const mealsRouter = express.Router();

mealsRouter.get('/', (req, res) => {
    res.render('home');
});

module.exports = mealsRouter;