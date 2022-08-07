const { decode } = require("../auth/jwt");
const { compare } = require("../auth/password");
const repository = require("../repository/user.repository");

const auth = async (req, res, next) => {
   
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).json({
            message: 'You are not authorized'
        });
    }
    const token = authorization.split(' ')[1];
    try {
        const decoded = await decode(token);
        
        const user = await repository.find(decoded.id);
        if(!user) {
            return res.status(401).json({
                message: 'Token is invalid'
            });
        }
        req.user = decoded;
        next();
    }
    catch(err) {
        console.log(err);
        return res.status(401).json({
            message: 'You are not authorized'
        });
    }
}


module.exports = auth;