const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ItemBase.db', (err) => {
    if (err) {
        return console.error("Error opening database " + err.message);
    } else {
        console.log("Connected to database");
        db.run(`CREATE TABLE IF NOT EXISTS product (
        productID INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        productPrice INT NOT NULL
        )`, (err) => {
            if (err) {
                return console.error("error adding constraint" + err.message);
            } else {
                console.log("Items Table created or already exists");
            }
        });
    }
});

const getProduct = (callback) => {
  db.all('SELECT * FROM product', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// Function to add new
const addProduct = (productID,productName,productPrice,callback) => {
  const sql ='INSERT INTO product (productID,productName,productPrice) VALUES (?, ?, ? )';
  db.run(sql,[productID,productName,productPrice], function (err) {
    if (err) {
      return callback(err);
    }
    console.log("Inserted Product with ID:", this.lastID);
    callback(null, { productID: this.lastID,productName,productPrice});
  });
};

module.exports = {
  getProduct,
  addProduct
};