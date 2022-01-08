const express = require('express');
const mealsRouter = express.Router();

mealsRouter.get('/', (req, res) => {
    res.send('Hello People');
});

module.exports = mealsRouter;