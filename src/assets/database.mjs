const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./Xip.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Function to create the 'customer' table if it doesn't exist
const createTableIfNotExists = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS customers (
    customerId INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER FOREIGN KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (productId) references product(productID) 
    );

    CREATE TABLE IF NOT EXISTS customers (
    productID INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    productPrice REAL NOT NULL
    );`
    ;
  
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "customers , product" is ready (created or already exists).');
    }
  });
};

// Call the function to ensure the table is created
createTableIfNotExists();

// Function to get all users from the database
exports.getAllcustomer = (callback) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

exports.getAllproduct = (callback) => {
  db.all('SELECT * FROM product', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};


// Function to add new
exports.addcustomer = (productID,firstName,lastName,Quantity,callback) => {
  const stmt = db.prepare('INSERT INTO Customers (productID,firstName,lastName,Quantity) VALUES (?, ?, ? ,?)');
  stmt.run([productID,firstName,lastName,Quantity], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { customerID: this.lastID,productID,firstName,lastName,Quantity});
  });
  stmt.finalize();
};

exports.addproduct = (productID,productName,productPrice,callback) => {
  const stmt = db.prepare('INSERT INTO Customers (productID,productName,productPrice) VALUES (?, ?, ? )');
  stmt.run([productID,productName,productPrice], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { productID: this.lastID,firstName,lastName,Quantity});
  });
  stmt.finalize();
};