const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Load environment variables
require('dotenv').config();
const { MONGO_URI, SESSION_SECRET } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes
const portfolioRoutes = require('./routes/portfolio');
app.use('/api/portfolio', portfolioRoutes);

const experienceRoutes = require('./routes/experience');
app.use('/api/experience', experienceRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Route for serving index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML files (e.g., for admin, experience, contact, gallery)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/experience', (req, res) => {
    res.sendFile(path.join(__dirname, 'experience.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'gallery.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

// 404 Error Handling
app.use((req, res, next) => {
    console.log(`404 - ${req.method} ${req.originalUrl}`);
    res.status(404).send('Sorry, we cannot find that!');
});

// General Error Handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
