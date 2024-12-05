import express from 'express';
import path from 'path';
import route from './router.mjs'; 

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/customer', route);
app.use('/product', route);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});