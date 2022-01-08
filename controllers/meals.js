const express = require('express');
const mealsRouter = express.Router();
const mealSeed = require('../models/mealSeed')
const Meal = require('../models/meal')

mealsRouter.get('/seed', (req, res) => {
    // to remove any repeat instances of seed data
    Meal.deleteMany({}, (error, allBooks) => { });

    Meal.create(mealSeed, (error, data) => {
        res.redirect('/');
    }
    );
});

mealsRouter.get('/', (req, res) => {
    Meal.find({}, (error, allMeals) => {
        res.render('index', {
            meals: allMeals,
        });
    });
});



module.exports = mealsRouter;