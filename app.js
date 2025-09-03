/**
 * D STUDIOS Unified Server (Static + API + MySQL)
 * -----------------------------------------------
 * - Serves public site and root static assets
 * - Provides Product CRUD API backed by MySQL
 * - Handles digital asset downloads
 *
 * Single entry point (npm start -> node app.js)
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const { getConnection } = require('./db');
const fs = require('fs');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || '');
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve public assets
app.use(express.static(path.join(__dirname, 'public')));
// Serve root-level static files like styles.css, script.js, translations.js
app.use(express.static(__dirname));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Product Management Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const pool = await getConnection();
    const [products] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const pool = await getConnection();
    const [products] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: products[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
});

// Create new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, description, image_url, video_url, gumroad_url, developer_name } = req.body;
    const pool = await getConnection();

    const [result] = await pool.execute(
      'INSERT INTO products (name, category, price, description, image_url, video_url, gumroad_url, developer_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, price, description, image_url, video_url, gumroad_url, developer_name]
    );

    res.json({ success: true, message: 'Product created successfully', productId: result.insertId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, category, price, description, image_url, video_url, gumroad_url, developer_name } = req.body;
    const pool = await getConnection();

    await pool.execute(
      'UPDATE products SET name = ?, category = ?, price = ?, description = ?, image_url = ?, video_url = ?, gumroad_url = ?, developer_name = ? WHERE id = ?',
      [name, category, price, description, image_url, video_url, gumroad_url, developer_name, req.params.id]
    );

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const pool = await getConnection();
    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
});

// File serving routes
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'digital-assets', filename);

  // Check if file exists
  if (require('fs').existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Admin routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// Image upload route
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const publicPath = '/uploads/' + req.file.filename;
    res.json({ success: true, path: publicPath, url: publicPath });
  } catch (e) {
    console.error('Image upload error:', e);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// Video upload route
app.post('/api/upload/video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const publicPath = '/uploads/' + req.file.filename;
    res.json({ success: true, path: publicPath, url: publicPath });
  } catch (e) {
    console.error('Video upload error:', e);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'D STUDIOS server is running with MySQL database' });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 D STUDIOS server running on http://localhost:${port}`);
  console.log(`📊 Database: MySQL (${process.env.DB_NAME || 'dstudios_db'})`);
  console.log(`🏠 Main page: http://localhost:${port}/`);
  console.log(`🔧 Admin panel: http://localhost:${port}/admin`);
  console.log(`💚 Health check: http://localhost:${port}/health`);
});
