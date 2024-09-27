const connection = require('../config/db');

exports.getUser = (req, res) => {
    const sql = 'SELECT id, name, email, status, last_login_time, registration_time FROM users';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching user data' });
        res.json(results);
    });
};