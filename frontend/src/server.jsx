const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for requests from your React app

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password', // Replace with your MySQL password
    database: 'your_database_name' // Replace with your database name
});

// Example API endpoint to fetch data
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

// Example API endpoint to add data
app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (err, result) => {
        if (err) {
            console.error('Error adding user:', err);
            res.status(500).send('Error adding user');
            return;
        }
        res.status(201).send('User added successfully');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});