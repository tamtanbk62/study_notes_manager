const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: "No token founded"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch(err) {
        return res.status(401).json({message: "Invalid token"});
    }
}

module.exports = auth;