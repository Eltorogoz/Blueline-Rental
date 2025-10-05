// database.js
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'inventory.sqlite'));
db.pragma('journal_mode = WAL');

db.prepare(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  daily_rate REAL NOT NULL,
  available INTEGER NOT NULL,
  image_url TEXT NOT NULL
)`).run();

const { c } = db.prepare('SELECT COUNT(*) AS c FROM products').get();
if (!c) {
  const rows = [
    ["Civic (2022)", "Honda", "Compact", "Reliable compact sedan with great mileage.", 44.99, 6, "/public/img/cars/hondaCivic.jpg"],
    ["RAV4 AWD (2023)", "Toyota", "SUV", "Compact SUV with AWD.", 69.00, 4, "/public/img/cars/toyotaRav4.jpg"],
    ["Mustang (2021)", "Ford", "Sport", "Fun coupe for weekends.", 95.00, 2, "/public/img/cars/fordMustang.jpg"],
    ["Malibu (2021)", "Chevrolet", "Midsize", "Comfortable daily driver.", 52.00, 5, "/public/img/cars/chevyMalibu.jpg"],
    ["Corvette (2020)", "Chevrolet", "Sport", "Iconic American sports car.", 149.00, 1, "/public/img/cars/chevyCorvette.jpg"],
    ["X5 (2021)", "BMW", "SUV", "Premium midsize SUV.", 129.00, 2, "/public/img/cars/bmwX5.jpg"],
    ["Sonata (2022)", "Hyundai", "Midsize", "Great value, roomy interior.", 49.00, 5, "/public/img/cars/hyundaiSonata.jpg"],
    ["Wrangler (2021)", "Jeep", "SUV", "Trail-ready 4x4.", 92.00, 2, "/public/img/cars/jeepWrangler.jpg"],
    ["Altima (2022)", "Nissan", "Midsize", "Comfortable and efficient.", 48.00, 5, "/public/img/cars/nissanAltima.jpg"],
    ["Model 3 (2023)", "Tesla", "EV", "All-electric with fast charging.", 89.00, 3, "/public/img/cars/teslaModel.jpg"]
  ];
  
  const stmt = db.prepare(`INSERT INTO products (name,brand,category,description,daily_rate,available,image_url) VALUES (?,?,?,?,?,?,?)`);
  const tx = db.transaction(rs => rs.forEach(r => stmt.run(...r)));
  tx(rows);
}

function getAllProducts() {
  return db.prepare('SELECT * FROM products ORDER BY brand, name').all();
}
function getProductById(id) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
}

module.exports = { getAllProducts, getProductById };
