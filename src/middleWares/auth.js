import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const verifyJwtToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    };

    try {
        const decoded = jwt.verify(token, dotenv.config().parsed.SECRET_KEY)
        req.user = decoded;
    } catch (err) {
        console.log(err);
        return res.status(401).send('User unauthorized')
    }

    return next();
}