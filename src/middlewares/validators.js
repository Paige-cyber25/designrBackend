const {registerBodySchema, loginBodySchema} = require('../utils/validatorSchema');

const validateRegister = (req, res, next) => {
    const {error} = registerBodySchema(req.body);
    if(error) {
        return res.status(400).json({
            status:"error",
            message:error.details[0].message,
        })
    }
    return next();
}

const validateLogin = (req,res,next)=> {
    const {error} = loginBodySchema(req.body);
    if(error) {
        return res.status(400).json({
            status:'error',
            message:error.details[0].message
        })
    }
    return next;
}
module.exports= {validateRegister, validateLogin}