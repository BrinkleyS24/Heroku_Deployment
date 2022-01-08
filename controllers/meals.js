const express = require('express');
const mealsRouter = express.Router();

mealsRouter.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = mealsRouter;