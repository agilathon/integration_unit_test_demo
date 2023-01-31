// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const customerRouter = require('./routes/customers');

const app = express();
app.use(express.json());

// Handlebars settings
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.sendStatus(200);
});

// Settings to parse body of a POST request
app.use(express.urlencoded({ extended: true }));

// Use a separate router for the paths following /customers
app.use('/customers', customerRouter);
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
