// apps.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const db = require('./database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// middleware to expose page title to base.ejs
app.use((req, res, next) => { res.locals.pageTitle = ''; next(); });

// pages
app.get('/', (req, res) => {
  res.locals.pageTitle = 'Home';
  res.render('pages/index', { });
});

app.get('/products', (req, res) => {
  res.locals.pageTitle = 'Products';
  res.render('pages/product', { products: db.getAllProducts() });
});

app.get('/about', (req, res) => {
  res.locals.pageTitle = 'About';
  res.render('pages/about');
});

app.get('/contact', (req, res) => {
  res.locals.pageTitle = 'Contact';
  res.render('pages/contact');
});

// tiny JSON endpoint for “show price & availability”
app.get('/api/products/:id', (req, res) => {
  const p = db.getProductById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json({ id: p.id, name: p.name, daily_rate: p.daily_rate, available: p.available });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auto rental running at http://localhost:${PORT}`));
