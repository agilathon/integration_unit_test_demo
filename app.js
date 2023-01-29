// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const customerRouter = require('./routes/customers');

const app = express();
app.use(express.json());

// Handlebars settings
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// Settings to parse body of a POST request
app.use(express.urlencoded({ extended: true }));

// Use a separate router for the paths following /customers
app.use('/customers', customerRouter);

module.exports = app;
