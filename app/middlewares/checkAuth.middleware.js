import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({message: 'Not authorized'})
    }


    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        res.status(403).json({message: 'Not authorized'})
    }
}