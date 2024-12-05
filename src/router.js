const express = require ('express');

const router = express.Router();

const controller = require('./controller.js'); // Import controller

// Route to fetch all 
router.get('/product',controller.getProduct);

// Route to add 
router.post('/product', controller.addProduct);
module.exports = router;
