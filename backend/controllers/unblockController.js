const connection = require('../config/db');

exports.unblockUser = (req, res) => {
    const { ids } = req.body;

    const checkStatusSql = "SELECT id, status FROM users WHERE id IN (?)";
    connection.query(checkStatusSql, [ids], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error checking user status' });

        const alreadyActive = results.filter(user => user.status === 'active');
        
        if (alreadyActive.length > 0) {
            const activeIds = alreadyActive.map(user => user.id);
            return res.status(400).json({ message: `Selected User are already Unblocked` });
        }

        const unblockSql = "UPDATE users SET status = 'active' WHERE id IN (?)";
        connection.query(unblockSql, [ids], (err) => {
            if (err) return res.status(500).json({ message: 'Error unblocking users' });

            res.status(200).json({ message: 'Users Unblocked!' });
        });
    });
};