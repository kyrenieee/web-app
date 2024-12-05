const database = require('../src/assets/database.js')
    
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