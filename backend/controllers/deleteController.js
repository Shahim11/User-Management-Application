const connection = require('../config/db');
 
exports.deleteUser = (req, res) => {
    const { ids } = req.body;
    const currentUserId = req.user.id; 

    const deleteSql = 'DELETE FROM users WHERE id IN (?)';
    connection.query(deleteSql, [ids], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting user'});
    
        if (ids.includes(currentUserId)) {
            return res.status(200).json({ message: 'Users Deleted!', currentUserDeleted: true });
        }

        res.status(200).json({ message: 'Users Deleted!', currentUserDeleted: false });
    });
};