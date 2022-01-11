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
// New 
mealsRouter.get('/new', (req, res) => {
    res.render('new')
})

// Delete
mealsRouter.delete("/:id", (req, res) => {
    Meal.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/')
    })
  })


// Update
mealsRouter.put("/:id", (req, res) => {
    Meal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedBook) => {
            res.redirect(`/meals/${req.params.id}`)
        }
    )
})

// Create
mealsRouter.post('/', (req, res) => {
    Meal.create(req.body, (error, createdMeal) => {
        res.redirect('/');
    });
})

// Edit
mealsRouter.get('/:id/edit', (req, res) => {
    Meal.findById(req.params.id, (err, foundMeal) => {
        res.render('edit', {
            meal: foundMeal,
        })
    })
})

//Show
mealsRouter.get('/:id', (req, res) => {
    Meal.findById(req.params.id, (err, foundMeal) => {
        res.render('show', {meal: foundMeal})
    })
})



module.exports = mealsRouter;