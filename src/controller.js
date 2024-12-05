const product = require('./assets/database.js'); 

// Get all items from the database
exports.getProduct = (req, res) => {
    product.getProduct((err, product) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(product);
    });
};

// Add a new item to the database
exports.addProduct = (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { Name, Price } = req.body;

    // Validation
    if (!Name || !Price) {
        return res.status(400).send('All fields are required.');
    }

    const quantityNumber = parseInt(Price, 10);
    if (isNaN(quantityNumber)) {
        return res.status(400).send('Price must be a number.');
    }

    product.addProduct(null, Name, quantityNumber, (err, product) => {
        if (err) {
            console.error("Error adding product:", err.message);
            return res.status(500).send(err.message);
        }
        console.log("Product added successfully:", product);
        res.status(201).json(product);
    });
};
