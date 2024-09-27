const connection = require('../config/db');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
   
    connection.query(registerSql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email already registered. Please use another email.'});
            }
            return res.status(500).json({ message: 'Error registering user'});
        }
        res.status(201).json({ message: 'Registration Successful! Please log in.'});
    });
};