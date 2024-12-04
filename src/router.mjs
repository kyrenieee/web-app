import express from 'express';

const router = express.Router();

const controller = require('../src/controller.mjs'); // Import controller

// Route to fetch all 
router.get('/customer', controller.getAllcustomer);
router.get('/product',controller.getAllproduct);

// Route to add 
router.post('/customer', controller.addcustomer);
router.post('/customer', controller.addproduct);
module.exports = router;