const product = require('./assets/database.js'); 

// Get all items from the database
exports.getAllproduct = (req, res) => {
    product.getAllproduct((err, items) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(product);
    });
};

// Add a new item to the database
exports.addproduct = (req, res) => {
    console.addproduct('Request body:', req.body); // Log the request body
    const { name, price} = req.body;

    //validation
    if (!name || !price) {
        return res.status(400).send('All fields are required.');
    }

    const quantityNumber = parseInt(price, 10);
    if (isNaN(quantityNumber)) {
        return res.status(400).send('Price must be a number.');
    }

    product.addproduct(name, quantityNumber, (err, product) => {
        if (err) {
            console.error("Error adding product:", err.message);
            return res.status(500).send(err.message);
        }
        console.log("Product added successfully:", product);
        res.status(201).json(product);
    });
};