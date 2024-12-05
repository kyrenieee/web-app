const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./Xip.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

const createTableIfNotExists = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS product (
    productID INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    productPrice INT NOT NULL
    );`
    ;
  
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "product" is ready (created or already exists).');
    }
  });
};


createTableIfNotExists();


exports.getAllproduct = (callback) => {
  db.all('SELECT * FROM product', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};


// Function to add new
exports.addproduct = (productID,productName,productPrice,callback) => {
  const stmt = db.prepare('INSERT INTO product (productID,productName,productPrice) VALUES (?, ?, ? )');
  stmt.run([productID,productName,productPrice], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { productID: this.lastID,firstName,lastName,Quantity});
  });
  stmt.finalize();
};