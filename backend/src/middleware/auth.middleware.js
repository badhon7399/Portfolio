const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
}; 