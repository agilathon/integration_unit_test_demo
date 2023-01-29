// Dependencies
const express = require('express');
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

/// json block

router.get('/json', custommerController.getAllJson);

// // Create new user
router.post('/json/add', custommerController.addJson);

// // Update existing user
router.get('/json/:userId/update', custommerController.updateJson);

// // Remove users
router.get('/json/:userId/remove', custommerController.removeJson);

// // Search information
router.get('/json/search/', custommerController.searchJson);

/// json block

module.exports = router;
