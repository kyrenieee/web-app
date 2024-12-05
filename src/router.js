const express = require ('express');

const router = express.Router();

const controller = require('./controller.js'); // Import controller

// Route to fetch all 
router.get('/product',controller.getAllproduct);

// Route to add 
router.post('/product', controller.addproduct);
module.exports = router;