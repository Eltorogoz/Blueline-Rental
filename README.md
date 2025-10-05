BlueLine Auto Rental — Express + EJS + SQLite

A simple inventory & brochure site for an auto rental business. The app uses Express for routing, EJS for server-rendered views, 
and SQLite for persistence 

Why this design?
Two goals shaped the build:
1. Separation of concerns - keep data access, request/response logic, templates, and static assets in their own places so
They can evolve independently.
2. Clear routing- each top-level route (/products, /about, /contact) renders one page template, and the menu links point to those routes
We also send the currentPath variable so the menu can highlight the active tab

Database notes 

database.js creates the products table if it doesn't exist and seeds rows with your car images 
Product fields used by the product.ejs: ID, brand, name, category, daily_rate, available, image_url, and description
Images live in public/img/cars/
