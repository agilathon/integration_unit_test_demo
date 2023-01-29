// Dependencies
const express = require('express');
const { Op } = require('sequelize');
const { getUsersInfo } = require('../utils/utils');
const custommerController = require('../controllers/customerController');

// TODO: ASYNC ERROR HANDLE

// Router object
const router = express.Router();

router.get('/', custommerController.getAll);

// Show add new customer form
router.get('/add', (req, res) => {
  res.render('add');
});

// // Create new user
router.post('/add', custommerController.add);

// // Update existing user
router.get('/:userId/update', custommerController.update);

// // Remove users
router.get('/:userId/remove', custommerController.remove);

// // Search information
router.get('/search/', custommerController.search);

module.exports = router;
