const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded){
            // req.userID = decoded.userID;
            // req.email = decoded.email;
            next();
        } else {
            res.status(400).json({msg: "Invalid Token"});
        }
    } else {
        res.status(400).json({msg: "Authentication failed"});
    }
}

module.exports = {auth};