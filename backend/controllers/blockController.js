const connection = require('../config/db');

exports.blockUser = (req, res) => {
    const { ids } = req.body;
    const currentUserId = req.user.id; 

    const statusCheckSql = "SELECT id, status FROM users WHERE id IN (?)";
    connection.query(statusCheckSql, [ids], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error checking user status' });

        const alreadyBlocked = results.filter(user => user.status === 'blocked');
        
        if (alreadyBlocked.length > 0) {
            const blockedIds = alreadyBlocked.map(user => user.id);
            return res.status(400).json({ message: `Selected User are already Blocked` });
        }

        const blockSql = "UPDATE users SET status = 'blocked' WHERE id IN (?)";
        connection.query(blockSql, [ids], (err) => {
            if (err) return res.status(500).json({ message: 'Error blocking User' });

            if (ids.includes(currentUserId)) {
                return res.status(200).json({ message: 'Users Blocked!', currentUserBlocked: true });
            }

            res.status(200).json({ message: 'Users Blocked!', currentUserBlocked: false });
        });
    });
};