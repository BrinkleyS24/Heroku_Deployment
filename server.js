//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const mealsController = require('./controllers/meals')
const morgan = require('morgan');

require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;
const SECRET = process.env.SECRET
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  // Error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));


app.set('view engine', 'ejs')
//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static(__dirname + '../public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use('/meals', mealsController)

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.get('/', (req, res) => res.redirect('/meals'));
//___________________
// Routes
//___________________
//localhost:3000


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));

