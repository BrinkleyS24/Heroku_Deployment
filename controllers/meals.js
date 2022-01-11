const express = require('express');
const mealsRouter = express.Router();
const Meal = require('../models/meal.js')
const mealSeed = require('../models/mealSeed.js')

// Seed
mealsRouter.get('/seed', (req, res) => {
    // to remove any repeat instances of seed data
    Meal.deleteMany({}, (error, allMeals) => { });

    Meal.create(mealSeed, (error, data) => {
        res.redirect('/');
    }
    );
});

// Index
mealsRouter.get('/', (req, res) => {
    Meal.find({}, (error, allMeals) => {
        res.render('index', {
            meals: allMeals,
        });
    });
});

mealsRouter.get('/new', (req, res) => {
    res.render('new')
})

mealsRouter.post('/', (req, res) => {
    Meal.create(req.body, (error, createdMeal) => {
        res.redirect('/');
    });
})



module.exports = mealsRouter;