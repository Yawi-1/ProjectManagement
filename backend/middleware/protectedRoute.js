const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            req.user = decoded; // Attach user info to request object
            next(); // Move to the next middleware or route
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = protectedRoute;
