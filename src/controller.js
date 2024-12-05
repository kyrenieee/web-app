const database = require('../src/assets/database.mjs')
// Get all customer from the database
exports.getAllcustomer = (req, res) => {
  database.getAllcustomer((err,customer) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(customer);
  });
};

// Add a new customer to the database
exports.addcustomer = (req, res) => {
  const { productID,firstName,lastName,Quantity } = req.body;
  database.addcustomer(productID,firstName,lastName,Quantity, (err, customer) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json(customer);
  });
};

//add new product

exports.getAllproduct = (req, res) => {
  database.getAllproduct((err,product) => {
   if (err) {
    return res.status(500).send(err.message);
    }
    res.json(product);
  })
};

exports.addproduct = (req, res) => {
  const  {productName,productPrice } = req.body;
  database.addproduct(productName,productPrice,  (err,product) => {
    if (err) {
     return res.status(500).send(err.message);
     }
     res.json(product);
  });
};