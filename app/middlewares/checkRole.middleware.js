import jwt from "jsonwebtoken";

export const checkRole = (roles) => {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({message: 'Not authorized'})
        }


        try {
            const {roles: userRoles} = jwt.verify(token, process.env.JWT_SECRET)
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return res.status(403).json({message: 'No access'})
            }

            next();
        } catch (err) {
            res.status(403).json({message: 'Not authorized'})
        }
    }
}