import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.header.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userID = decoded._id;

            next();
        } catch (err) {
            return res.json({message: err})
        }
    } else {
        res.json({message: 'Can not access'})
    }
}