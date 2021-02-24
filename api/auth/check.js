const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headeers.authorization.split(" "[1]);

        const decode = jwt.verify(
            //req.body.token,
            token,
            process.env.JWT_TOKEN_KEY);
        req.userData =decode;
        next();
    }
    catch(error){
        return res.status(401).json({
            return:false,
            message:'Error: ' + error
        });
    }
   
};