const express = require('express');
const mealsRouter = express.Router();
const Meal = require('../models/meal.js')


// Seed

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

mealsRouter.put('/meal/:id/cart', (req, res) => {
    Product.updateOne({_id: req.params.id}, {$inc:{'qty' : +1}},
    (error, product) => {
        res.redirect(`/products/${req.params.id}`)
    });
});

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
        res.render('show', { meal: foundMeal })
    })
})



module.exports = mealsRouter;