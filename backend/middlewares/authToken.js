const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); 
    // return res.status(401).json({ message: 'Access token missing' });

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        // return res.status(403).json({ message: 'Token verification failed' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;